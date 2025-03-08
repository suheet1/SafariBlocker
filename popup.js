document.addEventListener("DOMContentLoaded", function () {
    let blacklistList = document.getElementById("blacklist");

    chrome.storage.local.get(["blacklist"], (data) => {
        let blacklist = data.blacklist || [];
        blacklist.forEach((domain) => {
            let li = document.createElement("li");
            li.textContent = domain;
            blacklistList.appendChild(li);
        });
    });
});

function clearBlacklist() {
    chrome.storage.local.set({ blacklist: [] }, () => {
        location.reload();
    });
}
