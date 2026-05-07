# Stremio Watch History Migration

Transfer your Stremio watch history between accounts using browser localStorage.

Useful when you can't log into your old account on new devices (e.g. Apple removed Stremio from the App Store and Sign in with Apple won't work for new installs).

## How it works

Stremio's web app (`app.strem.io`) stores your watch history in `localStorage` under the key `library_recent`. These scripts export that data from one account and import it into another.

## Usage

### 1. Export from old account

1. Go to [app.strem.io](https://app.strem.io) and log into your **old** account
2. Open browser console (`Cmd+Option+J` on Mac, `F12` on Windows/Linux)
3. Paste the contents of `export.js` and run it
4. Your library data will be copied to clipboard (or downloaded as `library_recent.json`)

### 2. Import into new account

1. Go to [app.strem.io](https://app.strem.io) and log into your **new** account
2. Open browser console
3. Open `import.js` and paste your exported JSON where indicated
4. Paste the modified script into the console and run it
5. Reload the page

Your watch history, progress, and library should now appear on the new account.

## What gets transferred

- Watch history (which movies/shows you've watched)
- Watch progress (where you left off in each title)
- Library items (your saved titles)

## What doesn't get transferred

- Addon configurations (use Stremio's addon sharing for this or you can use https://stremio-account-addon-cloner.vercel.app ⚠️ I just found this online, this site is completely use at your own risk ⚠️)
- Account settings
- Stremio server settings

## Notes

- The import script merges with any existing library data on the new account — it won't overwrite things you've already watched on the new account.
- If your old account used Sign in with Apple and you can still access it in a browser, you can get your auth key via `JSON.parse(localStorage.getItem("profile")).auth.key` — though you don't actually need it for this localStorage-based migration.

Made with ❤️ by Me and mostly Claude haha.
