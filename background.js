let whitelist = [];
let blacklist = [];

chrome.tabs.onCreated.addListener((tab) => {
    chrome.storage.local.get(["whitelist", "blacklist"], (data) => {
        whitelist = data.whitelist || [];
        blacklist = data.blacklist || [];

        let url = new URL(tab.pendingUrl || tab.url);
        let domain = url.hostname;

        if (blacklist.includes(domain)) {
            chrome.tabs.remove(tab.id);
            showToast("Blocked: " + domain);
        } else if (!whitelist.includes(domain)) {
            let userChoice = confirm(`A new tab was opened from ${domain}. Allow?`);
            if (!userChoice) {
                chrome.tabs.remove(tab.id);
                showToast("Blocked: " + domain);
                blacklist.push(domain);
                chrome.storage.local.set({ blacklist });
            } else {
                whitelist.push(domain);
                chrome.storage.local.set({ whitelist });
            }
        }
    });
});

function showToast(message) {
    let toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "black";
    toast.style.color = "white";
    toast.style.padding = "10px";
    toast.style.borderRadius = "5px";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
