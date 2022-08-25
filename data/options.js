function save_options()
{
	var whitelist = document.getElementById('whitelist').value.split("\n"),
		whitelisted_domains = {};
	
	whitelist.forEach(function(line){
		line = line.trim().replace(/^\w*\:?\/+/i, '').replace(/^w{2,3}\d*\./i, '').split('/')[0].split(':')[0];
		
		if (line.length > 0 && line.length < 100)
			whitelisted_domains[line] = true;
	});
	
	chrome.storage.local.set({whitelisted_domains:whitelisted_domains}, function(){
		document.getElementById('status_saved').style.display = 'inline';
		
		setTimeout(function() {
			document.getElementById('status_saved').style.display = 'none';
		}, 2000);
		
		chrome.runtime.sendMessage('update_whitelist');
  });
}

function restore_options() {
  chrome.storage.local.get({
	whitelisted_domains: {}
  }, function(items) {
	document.getElementById('whitelist').value = Object.keys(items.whitelisted_domains).sort().join("\n");
  });
}

document.title = document.getElementById('title').textContent = "Settings" + ' - ' + "Xrch Privacy";
document.getElementById('whitelist_label').textContent = "List of all whitelisted websites, one website per line:";
document.getElementById('save').setAttribute('value', "Save settings");
document.getElementById('status_saved').textContent = "Options successfully saved.";

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);