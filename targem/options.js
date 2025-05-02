const input = document.getElementById('languageInput');
const addButton = document.getElementById('addButton');
const addPresetButton = document.getElementById('addPresetButton');
const languageList = document.getElementById('languageList');
const langList = document.getElementById('langList');
const status = document.getElementById('dtatus');

function loadLanguages() {
	chrome.storage.sync.get(['targetLanguages'], (result) => {
		const langs = result.targetLanguages || [];
		languageList.innerHTML = '';

		langs.forEach(lang => {
			const li = document.createElement('li');
			li.textContent = lang;

			const removeBtn = document.createElement('button');
			removeBtn.textContent = 'Delete';
			removeBtn.style.marginLeft = '1em';
			removeBtn.addEventListener('click', () => {
			const updated = langs.filter(l => l !== lang);
				chrome.storage.sync.set({ targetLanguages: updated }, loadLanguages);
			});

			li.appendChild(removeBtn);
			languageList.appendChild(li);
		});
	});
}

addButton.addEventListener('click', () => {
	const newLang = input.value.trim().toLowerCase();
	if (!newLang.match(/^[a-z]{2}$/)) {
		alert("Please enter a valid code (2 letters)");
		return;
	}

	chrome.storage.sync.get(['targetLanguages'], (result) => {
		const langs = result.targetLanguages || [];
		if (!langs.includes(newLang)) {
			langs.push(newLang);
			chrome.storage.sync.set({ targetLanguages: langs }, () => {
				input.value = '';
				loadLanguages();
			});
		}
		else {
			alert("language already added.");
		}
	});
});

document.addEventListener('DOMContentLoaded', loadLanguages);
