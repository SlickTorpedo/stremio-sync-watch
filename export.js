// Stremio Watch History Export
// Run this in your browser console at https://app.strem.io
// while logged into the account you want to export FROM.

(function() {
    const library = localStorage.getItem("library_recent");
    if (!library) {
        console.error("No library_recent found. Are you logged in?");
        return;
    }

    const data = JSON.parse(library);
    const count = Object.keys(data.items || {}).length;

    // Copy to clipboard
    navigator.clipboard.writeText(library).then(() => {
        console.log(`Copied ${count} library items to clipboard.`);
        console.log("Paste into a file called library_recent.json, then use import.js on your new account.");
    }).catch(() => {
        // Fallback: trigger a download
        const blob = new Blob([library], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "library_recent.json";
        a.click();
        URL.revokeObjectURL(url);
        console.log(`Downloaded ${count} library items as library_recent.json`);
    });
})();
