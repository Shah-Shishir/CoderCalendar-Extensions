// converts the input time(which is Indian Standard Time) to
// the browser timezone.
const convertToBrowzerTimezone = function (date) {
  const d = new Date(date);
  const offset = -(d.getTimezoneOffset());
  const newDate = new Date(d.getTime() + offset * 60000 - 19800000);
  return newDate;
};

const getVersion = function () {
  const details = chrome.app.getDetails();
  return details.version;
};

// Checks if the app version has changed
// Opens settings page on first run after install/upgrade
const checkIfFirstRun = function () {
  const currVersion = getVersion();
  const prevVersion = localStorage.version;

  if (prevVersion == undefined) {
    chrome.tabs.create({ url: 'http://nishanthvijayan.github.io/CoderCalendar' });
  } else if (currVersion != prevVersion) {
    const opt = {
      type: 'basic',
      title: "Coder's Calendar Updated",
      message: 'Desktop notifications is now free!\n',
      iconUrl: '../img/icon32.png',
    };
    chrome.notifications.create(opt, () => {});
  }
  localStorage.version = currVersion;
};

const icon_path = function (platform) {
  switch (platform) {
    case 'CODECHEF':
      return 'img/codechef.jpg';
    case 'HACKEREARTH':
      return 'img/hackerearth.png';
    case 'CODEFORCES':
      return 'img/codeforces.png';
    case 'TOPCODER':
      return 'img/topcoder.gif';
    case 'HACKERRANK':
      return 'img/hackerrank.png';
    case 'GOOGLE':
      return 'img/google.png';
    default:
      return 'img/other.png';
  }
};


module.exports = {
  convertToBrowzerTimezone,
  checkIfFirstRun,
  icon_path,
};
