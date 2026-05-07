// Stremio Watch History Import
// Run this in your browser console at https://app.strem.io
// while logged into the account you want to import INTO.
//
// Usage: paste your exported JSON where indicated below, then run the script.

(function() {
    // ============================================================
    // Paste your exported library_recent JSON between the backticks
    // ============================================================
    const importedJson = `PASTE_YOUR_EXPORTED_JSON_HERE`;
    // ============================================================

    let importedData;
    try {
        importedData = JSON.parse(importedJson);
    } catch(e) {
        console.error("Invalid JSON. Make sure you pasted the full export between the backticks.");
        return;
    }

    const importedItems = importedData.items || {};
    const importCount = Object.keys(importedItems).length;

    if (importCount === 0) {
        console.error("No items found in the imported data.");
        return;
    }

    // Check for existing library data and merge if present
    const existing = localStorage.getItem("library_recent");
    let mergedItems = {};

    if (existing) {
        try {
            const existingData = JSON.parse(existing);
            mergedItems = existingData.items || {};
            const existingCount = Object.keys(mergedItems).length;

            if (existingCount > 0) {
                console.log(`Found ${existingCount} existing items. Merging with ${importCount} imported items.`);
            }
        } catch(e) {
            console.warn("Could not parse existing library. Overwriting.");
        }
    }

    // Merge: imported items overwrite existing ones with the same ID
    mergedItems = { ...mergedItems, ...importedItems };

    // Use the current account's UID
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    const uid = profile?.auth?.user?._id || profile?.auth?.user?.id || "unknown";

    const finalData = { uid: uid, items: mergedItems };
    localStorage.setItem("library_recent", JSON.stringify(finalData));

    const totalCount = Object.keys(mergedItems).length;
    console.log(`Done! ${totalCount} total library items (${importCount} imported).`);
    console.log("Reload the page to see your watch history.");
})();
