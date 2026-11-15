# AcadaBee

A daily learning game made by kids, for kids. This folder is the website (GitHub Pages).

- `index.html`, `support.js`, `acadabee-lib.js`, `acadabee-data.js`: the app.
- `site.js`: family sign-in and the private "hive" (Supabase) that keeps everyone's progress in sync across devices.
- `config.js`: the Supabase project URL and the **publishable** key. Never put the secret key or any password here.
- `setup.sql`: run once in the Supabase SQL Editor. It creates the `hive` table with row-level security, so only the signed-in family account can read or change its rows.

No names or personal details are stored in this code. Players are `p1`, `p2` and `dad`; names are typed once after the first sign-in and live only in the family's private hive.

## Set-up (once)
1. Supabase: create a free project, run `setup.sql`, turn off "Allow new users to sign up" in the Authentication settings, and add one user for the family (with the email confirmed).
2. Put the project URL and publishable key in `config.js`.
3. GitHub: Settings → Pages → Deploy from a branch → `main` / root.
4. On each phone or laptop: open the site, sign in once, then Add to Home Screen.
