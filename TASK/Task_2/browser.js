function ShowBrowserDetails() {
    var BrowserName = navigator.appName;
    var appVersion = navigator.appVersion.substring(0,4);
    alert("Browser Name:"+BrowserName+", Browser version:"+appVersion)
}
ShowBrowserDetails() 