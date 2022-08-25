var toggle = document.getElementById('toggle'),
	currentTab = false;

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	currentTab = tabs[0];
});

toggle.addEventListener('click', function (e) {
	chrome.runtime.sendMessage({
		command: "toggle_extension",
		tabId: currentTab.id
	}, function (message) {
		chrome.tabs.reload(currentTab.id)
	});
});
