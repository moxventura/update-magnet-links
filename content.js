const trackerUrl = "https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_best_ip.txt";

/**
* Adds a string to all urls that start with 'magnet'
* @param {String} trackers - the string to append to the urls
*/
function addMagenetLinks(trackers) {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].href.startsWith('magnet')) {
      links[i].href += trackers;
    }
  }
}

/**
 * Encode a newline separated string of trackers into one url encoded line to be added to your magnet link
 * @param {String} trackers - the unencoded list of trackers
 * @returns {String} - one line of encoded trackers
 */
function encodeTrackers(trackers) {
  // Make a list of urls, remove empty and duplicate entries
  const urls = [...new Set(trackers.split(/\n+/).filter(str => str.trim() !== ''))];
  // URLEncode urls
  const encodedUrls = urls.map(url => encodeURIComponent(url));
  const trackerString = "&tr=" + encodedUrls.join('&tr=');
  return trackerString;
}

chrome.storage.sync.get(['customUrl', 'customTrackers']).then((settings) => {

  // If custom trackers are set, use these
  if (settings.customTrackers) {
    trackers = encodeTrackers(settings.customTrackers);
    addMagenetLinks(trackers);
    return;
  }

  // Check if we have a cached list, otherwise retreive the list from the given url
  chrome.storage.local.get(['trackers', 'timestamp']).then((result) => {
    const CACHE_TIME = 4 * 24 * 60 * 60 * 1000; // 4 Days
    const now = Date.now();
    if (result.trackers && result.timestamp && now - result.timestamp < CACHE_TIME) {
      addMagenetLinks(result.trackers);
    }
    else {
      fetch(settings.customUrl ? settings.customUrl : trackerUrl).then(response => {
        return response.text();
      }).then((links) => {
        trackers = encodeTrackers(links);
        chrome.storage.local.set({ trackers: trackers, timestamp: Date.now() });
        addMagenetLinks(trackers);
      })
    };
  });
})



