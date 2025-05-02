const input = document.getElementById('languageInput');
const addButton = document.getElementById('addButton');
const addPresetButton = document.getElementById('addPresetButton');
const languageList = document.getElementById('languageList');
const langList = document.getElementById('langList');
const status = document.getElementById('status');

function loadLanguages() {
	chrome.storage.sync.get(['targetLanguages'], (result) => {
		const langs = result.targetLanguages || [];
		langList.innerHTML = '';

		// Debug: log the languages to console
		console.log('Current stored languages:', langs);

		langs.forEach(lang => {
			const li = document.createElement('li');
			li.textContent = lang;

			const removeBtn = document.createElement('button');
			removeBtn.textContent = 'Delete';
			removeBtn.addEventListener('click', () => {
				const updated = langs.filter(l => l !== lang);
				chrome.storage.sync.set({ targetLanguages: updated }, loadLanguages);
			});

			li.appendChild(removeBtn);
			langList.appendChild(li);
		});
	});
}

// Handle adding preset languages from the dropdown
addPresetButton.addEventListener('click', () => {
	const selectedLang = languageList.value;
	if (!selectedLang) {
		alert("Please select a language from the dropdown");
		return;
	}

	chrome.storage.sync.get(['targetLanguages'], (result) => {
		const langs = result.targetLanguages || [];
		if (!langs.includes(selectedLang)) {
			langs.push(selectedLang);
			chrome.storage.sync.set({ targetLanguages: langs }, () => {
				languageList.value = ''; // Reset dropdown
				loadLanguages();
				updateStatus("Language added successfully!");
			});
		}
		else {
			alert("Language already added.");
		}
	});
});

// Handle adding custom language codes
addButton.addEventListener('click', () => {
	const newLang = input.value.trim().toLowerCase();
	if (!newLang.match(/^[a-z]{2}(-[a-z]{2})?$/i)) {
		alert("Please enter a valid language code (e.g., 'en' or 'zh-CN')");
		return;
	}

	chrome.storage.sync.get(['targetLanguages'], (result) => {
		const langs = result.targetLanguages || [];
		if (!langs.includes(newLang)) {
			langs.push(newLang);
			chrome.storage.sync.set({ targetLanguages: langs }, () => {
				input.value = '';
				loadLanguages();
				updateStatus("Language added successfully!");
			});
		}
		else {
			alert("Language already added.");
		}
	});
});

function updateStatus(message) {
	status.textContent = message;
	setTimeout(() => {
		status.textContent = '';
	}, 3000);
}

// Debug button to view storage contents
function addDebugButton() {
	const debugContainer = document.createElement('div');
	debugContainer.className = 'debug-container';

	const debugTitle = document.createElement('h3');
	debugTitle.textContent = 'Storage Debug';

	const debugButton = document.createElement('button');
	debugButton.textContent = 'View Storage Contents';
	debugButton.addEventListener('click', () => {
		chrome.storage.sync.get(null, (items) => {
			console.log('All storage items:', items);
			const debugOutput = document.getElementById('debugOutput');
			debugOutput.textContent = JSON.stringify(items, null, 2);
		});
	});

	const debugOutput = document.createElement('pre');
	debugOutput.id = 'debugOutput';
	debugOutput.className = 'debug-output';

	debugContainer.appendChild(debugTitle);
	debugContainer.appendChild(debugButton);
	debugContainer.appendChild(debugOutput);

	document.getElementById('global').appendChild(debugContainer);
}

document.addEventListener('DOMContentLoaded', () => {
	loadLanguages();
	addDebugButton(); // Add the debug button when page loads
});
