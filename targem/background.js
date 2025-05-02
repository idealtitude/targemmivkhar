function createContextMenus() {
	chrome.contextMenus.removeAll(() => {
		chrome.storage.sync.get(["targetLanguages"], (result) => {
			const langs = result.targetLanguages || [];

			if (langs.length === 0) {
				chrome.contextMenus.create({
				id: "translate-default",
				title: "Translate with Google Translate",
				contexts: ["selection"]
			});
			}
			else {
				chrome.contextMenus.create({
					id: "translate-parent",
					title: "Translate with Google Translate",
					contexts: ["selection"]
				});

				langs.forEach(lang => {
					chrome.contextMenus.create({
						id: `translate-${lang}`,
						parentId: "translate-parent",
						title: `→ ${lang}`,
						contexts: ["selection"]
					});
				});
			}
		});
	});
}

chrome.runtime.onInstalled.addListener(() => {
	createContextMenus();
});

chrome.runtime.onStartup.addListener(() => {
	createContextMenus();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
if (areaName === 'sync' && changes.targetLanguages) {
	createContextMenus();
}
});

chrome.contextMenus.onClicked.addListener((info) => {
	let targetLang;

	if (info.menuItemId === "translate-default") {
		targetLang = "en";
	}
	else if (info.menuItemId.startsWith("translate-")) {
		targetLang = info.menuItemId.replace("translate-", "");
	}

	if (targetLang && info.selectionText) {
		const encodedText = encodeURIComponent(info.selectionText);
		const url = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodedText}&op=translate`;
		chrome.tabs.create({ url });
	}
});
