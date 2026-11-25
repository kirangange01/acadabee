/* AcadaBee website layer: family sign-in, the private "hive" (Supabase) and names.
   Names are never in the public code: the players are p1 / p2 / dad, and the family's
   names live only in the family's own hive row "family/profile". */
(function () {
  "use strict";
  var CFG = window.ACADABEE_CONFIG || {};
  var configured = !!(CFG.supabaseUrl && CFG.supabaseKey && window.supabase && window.supabase.createClient);
  var base = new URL(".", document.currentScript.src).href;
  var client = null, session = null, names = null, mods = null, dbResolve, family = null, role = null;
  var USER_DOMAIN = "@acadabee.com"; /* a username like "sam" signs in as sam@acadabee.com */
  function toEmail(u) { u = String(u || "").trim().toLowerCase(); return u.indexOf("@") >= 0 ? u : (u ? u + USER_DOMAIN : ""); }
  var dbReady = new Promise(function (r) { dbResolve = r; });
  window.claude = { use: function (k) { return k === "db" ? dbReady : Promise.resolve(null); } };

  /* ---------- small UI (overlay above the app until we're ready) ---------- */
  var css = "#abGate{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:22px;background:linear-gradient(180deg,#0B1E3A 0%,#10637A 55%,#2FC2D9 100%);font-family:Nunito,system-ui,sans-serif;color:#fff}" +
    "#abGate .bx{width:100%;max-width:400px;padding:24px 22px;border-radius:26px;background:linear-gradient(160deg,#1E4F7A,#0E2C4F);box-shadow:inset 0 3px 0 rgba(255,255,255,.14),inset 0 -8px 0 rgba(0,0,0,.35),0 18px 30px -12px rgba(0,0,0,.6);display:flex;flex-direction:column;gap:12px}" +
    "#abGate h1{margin:0;font:700 28px/1.1 Fredoka,Nunito,sans-serif}#abGate p{margin:0;font:700 14px/1.45 Nunito,sans-serif;color:#C9F3FF}" +
    "#abGate label{font:800 11px/1 Nunito,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8FD9E8}" +
    "#abGate input{width:100%;box-sizing:border-box;border:0;padding:13px 14px;border-radius:14px;background:rgba(0,0,0,.28);color:#fff;font:700 16px/1.2 Nunito,sans-serif}" +
    "#abGate button{border:0;cursor:pointer;padding:15px;border-radius:18px;background:linear-gradient(180deg,#FFE680,#FFC61A);color:#3A2600;font:700 18px/1 Fredoka,Nunito,sans-serif;box-shadow:inset 0 3px 0 rgba(255,255,255,.6),inset 0 -6px 0 rgba(160,100,0,.35)}" +
    "#abGate .err{color:#FFB5A8;font-weight:800}#abGate .row{display:flex;flex-direction:column;gap:6px}#abGate .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
    "#abOut{position:fixed;right:12px;bottom:12px;z-index:150;border:0;cursor:pointer;padding:8px 12px;border-radius:999px;background:rgba(0,0,0,.35);color:#fff;font:800 12px/1 Nunito,sans-serif;display:none}";
  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }
  function gate(html) {
    var g = document.getElementById("abGate");
    if (!g) { var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); g = el('<div id="abGate" role="dialog" aria-modal="true"></div>'); document.body.appendChild(g); }
    g.innerHTML = '<div class="bx">' + html + "</div>"; g.style.display = "flex"; return g;
  }
  function ungate() { var g = document.getElementById("abGate"); if (g) g.remove(); }
  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- names: tokens {Z} {R} {ZH} {RH} → the family's names ---------- */
  function loadMods() {
    if (!mods) mods = Promise.all([import(base + "acadabee-data.js"), import(base + "acadabee-lib.js")]).then(function (m) {
      m[1].prepPools(m[0].LESSONS, m[0].BANK); /* question ids come from the tokenised text, so they never depend on names */
      return { D: m[0], L: m[1] };
    });
    return mods;
  }
  function applyNames(n) {
    return loadMods().then(function (M) {
      var p1 = (n && n.p1) || "Player 1", p2 = (n && n.p2) || "Player 2";
      var map = { "{Z}": p1, "{R}": p2, "{ZH}": (n && n.p1h) || p1, "{RH}": (n && n.p2h) || p2 };
      M.L.NAMES.p1 = p1; M.L.NAMES.p2 = p2;
      var fix = function (s) { return s.replace(/\{(?:ZH|RH|Z|R)\}/g, function (t) { return map[t]; }); };
      var seen = new Set();
      (function walk(o) {
        if (!o || typeof o !== "object" || seen.has(o)) return; seen.add(o);
        Object.keys(o).forEach(function (k) { var v = o[k]; if (typeof v === "string") { if (v.indexOf("{") >= 0) o[k] = fix(v); } else walk(v); });
      })([M.D.LESSONS, M.D.BANK, M.D.CHAPTERS, M.D.LEARN, M.L.BEES, M.L.BADGES, M.L.ROLE, M.L.WORLD]);
      document.title = "AcadaBee";
      return M;
    });
  }

  /* ---------- the hive (Supabase) behind the app's db interface ---------- */
  function shimDb() {
    var owner = family || session.user.id;
    return {
      doc: function (path) {
        return { set: function (obj) {
          return client.from("hive").upsert({ owner: owner, k: path, v: obj, updated_at: new Date().toISOString() }, { onConflict: "owner,k" })
            .then(function (r) { if (r.error) throw r.error; return true; });
        } };
      },
      rw: function () { /* v2.0: reward points as the hive credits them, plus the hive's clock */
        return client.rpc("rw_summary").then(function (r) { if (r.error) throw r.error; return r.data; });
      },
      collection: function (name) {
        return { get: function () {
          return client.from("hive").select("k,v").like("k", name + "/%").then(function (r) {
            if (r.error) throw r.error; var rows = r.data || [];
            return { forEach: function (fn) { rows.forEach(function (x) { fn({ id: x.k.slice(name.length + 1), data: function () { return x.v; } }); }); }, size: rows.length };
          });
        } };
      }
    };
  }
  /* app activity (v1.92): sign-ins and sign-outs, shown in Dad's corner */
  function devId() { var d = lsGet("ab_dev"); if (!d) { d = Math.random().toString(36).slice(2, 8); lsSet("ab_dev", d); } return d; }
  function devType() { var u = navigator.userAgent || ""; return /iPad|Tablet/i.test(u) ? "tablet" : (/Mobi|Android|iPhone/i.test(u) ? "phone" : "computer"); }
  function logAuth(ev) {
    if (!session || !client) return Promise.resolve();
    var t = Date.now(), who = role || "family";
    return shimDb().doc("activity/" + who + "/" + t.toString(36) + "-" + ev).set({ ev: ev, t: t, role: role || null, dev: devType(), did: devId() }).then(function () {}, function () {});
  }
  function lsGet(k) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  /* merge the hive into this device before the app reads it: newer season state wins, progress is merged */
  function hydrate() {
    return Promise.all([loadMods(), client.from("hive").select("k,v").not("k", "like", "activity/%")]).then(function (res) {
      var L = res[0].L, r = res[1]; if (r.error) throw r.error;
      (r.data || []).forEach(function (row) {
        var i = row.k.indexOf("/"), col = row.k.slice(0, i), id = row.k.slice(i + 1), v = row.v;
        if (!v) return;
        if (col === "players") {
          var loc = lsGet("ab_" + id);
          if (v.season && (!loc || loc.season !== v.season || (v.updatedAt || 0) > (loc.updatedAt || 0))) {
            var c = Object.assign({}, v); delete c.p; delete c.name; delete c.av; lsSet("ab_" + id, c);
          }
          if (v.av) { var la = lsGet("ab_av_" + id); if (!la || (v.av.t || 0) > (la.t || 0)) lsSet("ab_av_" + id, v.av); }
        } else if (col === "progress" && v.prog && v.prog.isl) {
          var lp = lsGet("ab_prog_" + id); lsSet("ab_prog_" + id, (lp && lp.isl) ? L.mergeProg(lp, v.prog) : v.prog);
        } else if (col === "family" && id === "profile") { names = v; lsSet("ab_family", v); }
      });
    });
  }
  function ready(db) {
    return applyNames(names).then(function () {
      ungate(); dbResolve(db);
      window.dispatchEvent(new Event("ab-hydrated"));
      showSignOut();
    });
  }
  function showSignOut() {
    if (!session) return; var b = document.getElementById("abOut");
    if (!b) { b = el('<button id="abOut" type="button">Sign out</button>'); document.body.appendChild(b);
      b.onclick = function () { if (confirm("Sign this device out of the family hive?")) Promise.race([logAuth("out"), new Promise(function (r) { setTimeout(r, 1500); })]).then(function () { return client.auth.signOut(); }).then(function () { location.reload(); }); }; }
    var tick = function () { b.style.display = document.querySelector('[data-screen-label="Who\'s playing"]') ? "block" : "none"; };
    new MutationObserver(tick).observe(document.body, { childList: true, subtree: true }); tick();
  }

  /* ---------- screens ---------- */
  function signInScreen(msg) {
    var g = gate('<h1>🐝 AcadaBee</h1><p>Sign in once on this device with your AcadaBee username. Dad has them.</p>' +
      '<div class="row"><label for="siEmail">Username</label><input id="siEmail" type="text" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" placeholder="your username"></div>' +
      '<div class="row"><label for="siPass">Password</label><input id="siPass" type="password" autocomplete="current-password"></div>' +
      (msg ? '<p class="err" id="siErr">' + esc(msg) + "</p>" : "") + '<button id="siGo" type="button">Sign in</button>');
    var go = function () {
      var e = toEmail(g.querySelector("#siEmail").value), p = g.querySelector("#siPass").value;
      if (!e || !p) return signInScreen("Type your username and password.");
      g.querySelector("#siGo").textContent = "Signing in…";
      client.auth.signInWithPassword({ email: e, password: p }).then(function (r) {
        if (r.error || !r.data || !r.data.session) return signInScreen("That didn't work. Check your username and password.");
        session = r.data.session; afterSignIn(true);
      });
    };
    g.querySelector("#siGo").onclick = go;
    g.querySelector("#siPass").onkeydown = function (ev) { if (ev.key === "Enter") go(); };
  }
  function familyScreen(msg) {
    var g = gate('<h1>Who\'s in the family?</h1><p>Type the two founders\' names once: Founder 1 is the Chief Design Officer, Founder 2 the Chief Research Officer. They stay in your private hive, never in the app\'s public code.</p>' +
      '<div class="two"><div class="row"><label for="fmP1">Founder 1</label><input id="fmP1" placeholder="name"></div><div class="row"><label for="fmP1h">in Hindi</label><input id="fmP1h" placeholder="हिंदी में"></div></div>' +
      '<div class="two"><div class="row"><label for="fmP2">Founder 2</label><input id="fmP2" placeholder="name"></div><div class="row"><label for="fmP2h">in Hindi</label><input id="fmP2h" placeholder="हिंदी में"></div></div>' +
      (msg ? '<p class="err">' + esc(msg) + "</p>" : "") + '<button id="fmGo" type="button">Save</button>');
    g.querySelector("#fmGo").onclick = function () {
      var v = { p1: g.querySelector("#fmP1").value.trim(), p1h: g.querySelector("#fmP1h").value.trim(), p2: g.querySelector("#fmP2").value.trim(), p2h: g.querySelector("#fmP2h").value.trim() };
      if (!v.p1 || !v.p2) return familyScreen("Type both names.");
      shimDb().doc("family/profile").set(v).then(function () { names = v; lsSet("ab_family", v); ready(shimDb()); }, function () { familyScreen("Couldn't save. Check the internet and try again."); });
    };
  }
  function whoAmI() {
    return Promise.all([client.rpc("my_family"), client.rpc("my_role")]).then(function (r) {
      family = (r[0] && !r[0].error && r[0].data) || session.user.id; role = (r[1] && !r[1].error && r[1].data) || null;
    }, function () { family = session.user.id; role = null; }).then(function () { window.ACADABEE_ROLE = role; });
  }
  function afterSignIn(fresh) {
    gate("<h1>🐝 AcadaBee</h1><p>Opening the hive…</p>");
    whoAmI().then(function () { if (fresh) logAuth("in"); }).then(hydrate).then(function () { if (!names || !names.p1) return familyScreen(); return ready(shimDb()); },
      function () { /* offline or blocked: play on this device, sync later */ names = names || lsGet("ab_family"); ready(shimDb()); });
  }
  function start() {
    if (!configured) { /* not connected yet: everything stays on this device */ applyNames(null).then(function () { dbResolve(null); window.dispatchEvent(new Event("ab-hydrated")); }); return; }
    client = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true } });
    gate("<h1>🐝 AcadaBee</h1><p>Loading…</p>");
    client.auth.getSession().then(function (r) { session = r.data && r.data.session; if (session) afterSignIn(); else signInScreen(); }, function () { signInScreen(); });
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && session) hydrate().then(function () { window.dispatchEvent(new Event("ab-hydrated")); }, function () {});
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
