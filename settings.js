document.addEventListener("DOMContentLoaded", function () {
  const customUrlInput = document.getElementById("customUrl");
  const customTrackersInput = document.getElementById("customTrackers");
  const saveButton = document.getElementById("saveButton");
  const clearButton = document.getElementById("clearButton");

  chrome.storage.sync.get(['customUrl'], function (result) {
    if (result.customUrl) {
      customUrlInput.value = result.customUrl;
    }
  });

  chrome.storage.sync.get(['customTrackers'], function (result) {
    if (result.customTrackers) {
      customTrackersInput.value = result.customTrackers;
    }
  });

  saveButton.addEventListener("click", function () {
    const customUrl = customUrlInput.value;
    fetch(customUrl).then((response) => {
      if (!response.ok) {
        customUrlInput.classList.add('error-border');
      }
      else {
        customUrlInput.classList.remove('error-border');
        chrome.storage.sync.set({ customUrl: customUrl });    
      }
    }).catch(error => {
      customUrlInput.classList.add('error-border');
    })
    chrome.storage.sync.set({ customTrackers: customTrackersInput.value });
  });
  
  clearButton.addEventListener("click", function () {
    chrome.storage.local.clear();
  });
});