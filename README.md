# Update magnet links

This browser extension will add extra trackers to your magnet links for faster torrent downloads.

## Installation

1. Go to the download page: https://github.com/moxventura/update-magnet-links
2. Click the green 'Code' button
3. Click Download ZIP
4. Extract somewhere
5. In your browser, open the extensions setttings (e.g. chrome://extensions/)
6. Enable 'developer mode'
7. Click on 'Load unpacked extension...'
8. Choose the folder where you extracted the zipfile

Now the plugin is activated and will add more trackers to all magnet links.

## Configuration

When you click the plugin icon or go to the settings page you are able to add your own trackers or url.
If you want to revert to the default behaviour, clear all fields and press 'Save'.

### Clear cache
The clear cache button will remove the cached trackerlist and re-download them next time a page opens.

### Custom tracker URL
Adding an URL here will use this url to check and update the trackerlist. There need to be only trackers on this url separated by newlines. Anything else might cause your magnet links to break.

### Custom tracker list
If you add custom trackers here, only these trackers will be added to magnet links. This needs to be a newline separated list of trackers.