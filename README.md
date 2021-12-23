# Chrome flags

## What is this?

This is a list of CLI flags available to Google Chrome.

You can find the list directly in [source code](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/chrome/common/chrome_switches.cc). But I was looking for a more readable way, so I wrote parser and generator of this list.

## Flags

Last updated: 12/23/2021, 11:33:01 AM

### allow-cross-origin-auth-prompt

Allows third-party content included on a page to prompt for a HTTP basic auth username/password pair.

### allow-http-screen-capture

Allow non-secure origins to use the screen capture API and the desktopCapture extension API.

### allow-profiles-outside-user-dir

Allows profiles to be created outside of the user data dir. TODO(https://crbug.com/1060366): Various places in Chrome assume that all profiles are within the user data dir. Some tests need to violate that assumption. The switch should be removed after this workaround is no longer needed.

### allow-running-insecure-content

By default, an https page cannot run JavaScript, CSS or plugins from http URLs. This provides an override to get the old insecure behavior.

### allow-silent-push

Allows Web Push notifications that do not show a notification.

### app

Specifies that the associated value should be launched in "application" mode.

### app-id

Specifies that the extension-app with the specified id should be launched according to its configuration.

### app-launch-url-for-shortcuts-menu-item

Overrides the launch url of an app with the specified url. This is used along with kAppId to launch a given app with the url corresponding to an item in the app's shortcuts menu.

### app-mode-auth-code

Value of GAIA auth code for --force-app-mode.

### app-mode-oauth-token

Value of OAuth2 refresh token for --force-app-mode.

### app-run-on-os-login-mode

This is used along with kAppId to indicate an app was launched during OS login, and which mode the app was launched in.

### apps-gallery-download-url

The URL that the webstore APIs download extensions from. Note: the URL must contain one '%s' for the extension ID.

### apps-gallery-update-url

The update url used by gallery/webstore extensions.

### apps-gallery-url

The URL to use for the gallery link in the app launcher.

### auth-server-whitelist

Allowlist for Negotiate Auth servers

### auto-open-devtools-for-tabs

This flag makes Chrome auto-open DevTools window for each tab. It is intended to be used by developers and automation to not require user interaction for opening DevTools.

### auto-select-desktop-capture-source

This flag makes Chrome auto-select the provided choice when an extension asks permission to start desktop capture. Should only be used for tests. For instance, --auto-select-desktop-capture-source="Entire screen" will automatically select sharing the entire screen in English locales. The switch value only needs to be substring of the capture source name, i.e. "display" would match "Built-in display" and "External display", whichever comes first.

### auto-select-tab-capture-source-by-title

This flag makes Chrome auto-select a tab with the provided title when the media-picker should otherwise be displayed to the user. This switch is very similar to kAutoSelectDesktopCaptureSource, but limits selection to tabs. This solves the issue of kAutoSelectDesktopCaptureSource being liable to accidentally capturing the Chromium window instead of the tab, as both have the same title if the tab is focused.

### check-for-update-interval

How often (in seconds) to check for updates. Should only be used for testing purposes.

### cipher-suite-blacklist

Comma-separated list of SSL cipher suites to disable.

### cloud-print-file

Tells chrome to display the cloud print dialog and upload the specified file for printing.

### cloud-print-file-type

Specifies the mime type to be used when uploading data from the file referenced by cloud-print-file. Defaults to "application/pdf" if unspecified.

### cloud-print-job-title

Used with kCloudPrintFile to specify a title for the resulting print job.

### cloud-print-print-ticket

Used with kCloudPrintFile to specify a JSON print ticket for the resulting print job. Defaults to null if unspecified.

### service

The process type value which causes a process to run as a cloud print service process. DO NOT CHANGE THIS VALUE. Cloud printing relies on an external binary launching Chrome with this process type.

### cloud-print-setup-proxy

Setup cloud print proxy for provided printers. This does not start service or register proxy for autostart.

### crash-on-hang-threads

Comma-separated list of BrowserThreads that cause browser process to crash if the given browser thread is not responsive. UI/IO are the BrowserThreads that are supported. For example: --crash-on-hang-threads=UI:18,IO:18 --> Crash the browser if UI or IO is not responsive for 18 seconds while the other browser thread is responsive.

### create-browser-on-startup-for-tests

Some platforms like ChromeOS default to empty desktop. Browser tests may need to add this switch so that at least one browser instance is created on startup. TODO(nkostylev): Investigate if this switch could be removed. (http://crbug.com/148675)

### custom-devtools-frontend

Specifies the http:// endpoint which will be used to serve devtools://devtools/custom/<path> Or a file:// URL to specify a custom file path to load from for devtools://devtools/bundled/<path>

### debug-enable-frame-toggle

Enables a frame context menu item that toggles the frame in and out of glass mode (Windows Vista and up only).

### debug-packed-apps

Adds debugging entries such as Inspect Element to context menus of packed apps.

### devtools-flags

Passes command line parameters to the DevTools front-end.

### diagnostics

Triggers a plethora of diagnostic modes.

### diagnostics-format

Sets the output format for diagnostic modes enabled by diagnostics flag.

### diagnostics-recovery

Tells the diagnostics mode to do the requested recovery step(s).

### disable-background-networking

Disable several subsystems which run network requests in the background. This is for use when doing network performance testing to avoid noise in the measurements.

### disable-client-side-phishing-detection

Disables the client-side phishing detection feature. Note that even if client-side phishing detection is enabled, it will only be active if the user has opted in to UMA stats and SafeBrowsing is enabled in the preferences.

### disable-component-extensions-with-background-pages

Disable default component extensions with background pages - useful for performance tests where these pages may interfere with perf results.

### disable-component-update

### disable-default-apps

Disables installation of default apps on first run. This is used during automated testing.

### disable-domain-reliability

Disables Domain Reliability Monitoring.

### disable-extensions

Disable extensions.

### disable-extensions-except

Disable extensions except those specified in a comma-separated list.

### disable-extensions-file-access-check

Disable checking for user opt-in for extensions that want to inject script into file URLs (ie, always allow it). This is used during automated testing.

### disable-print-preview

Disables print preview (For testing, and for users who don't like us. :[ )

### disable-prompt-on-repost

Normally when the user attempts to navigate to a page that was the result of a post we prompt to make sure they want to. This switch may be used to disable that check. This switch is used during automated testing.

### disable-stack-profiler

Disable stack profiling. Stack profiling may change performance. Disabling stack profiling is beneficial when comparing performance metrics with a build that has it disabled by default.

### disable-zero-browsers-open-for-tests

Some tests seem to require the application to close when the last browser window is closed. Thus, we need a switch to force this behavior for ChromeOS Aura, disable "zero window mode". TODO(pkotwicz): Investigate if this bug can be removed. (http://crbug.com/119175)

### disk-cache-dir

Use a specific disk cache location, rather than one derived from the UserDatadir.

### disk-cache-size

Forces the maximum disk space to be used by the disk cache, in bytes.

### dump-browser-histograms

Requests that a running browser process dump its collected histograms to a given file. The file is overwritten if it exists.

### enable-audio-debug-recordings-from-extension

If the WebRTC logging private API is active, enables audio debug recordings.

### enable-bookmark-undo

Enables the multi-level undo system for bookmarks.

### enable-cloud-print-proxy

This applies only when the process type is "service". Enables the Cloud Print Proxy component within the service process.

### enable-critical-persisted-tab-data

Enables CriticalPersistedTabData - redesign/replacement for TabState

### enable-domain-reliability

Enables Domain Reliability Monitoring.

### enable-extension-activity-logging

Enables logging for extension activity.

### enable-extension-activity-log-testing

### enable-nacl

Runs the Native Client inside the renderer process and enables GPU plugin (internally adds lEnableGpuPlugin to the command line).

### enable-net-benchmarking

Enables the network-related benchmarking extensions.

### enable-potentially-annoying-security-features

Enables a number of potentially annoying security features (strict mixed content mode, powerful feature restrictions, etc.)

### explicitly-allowed-ports

Allows overriding the list of restricted ports by passing a comma-separated list of port numbers.

### extension-content-verification

Name of the command line flag to force content verification to be on in one of various modes.

### bootstrap

Values for the kExtensionContentVerification flag. See ContentVerifierDelegate::Mode for more explanation.

### enforce

### enforce_strict

### extensions-install-verification

Turns on extension install verification if it would not otherwise have been turned on.

### extensions-not-webstore

Specifies a comma-separated list of extension ids that should be forced to be treated as not from the webstore when doing install verification.

### force-app-mode

Forces application mode. This hides certain system UI elements and forces the app to be installed if it hasn't been already.

### force-first-run

Displays the First Run experience when the browser is started, regardless of whether or not it's actually the First Run (this overrides kNoFirstRun).

### hide-crash-restore-bubble

Does not show the crash restore bubble when the browser is started during the system startup phase in ChromeOS, if the ChromeOS full restore feature is enabled, because the ChromeOS full restore notification is shown for the user to select restore or not.

### homepage

Specifies which page will be displayed in newly-opened tabs. We need this for testing purposes so that the UI tests don't depend on what comes up for http://google.com.

### incognito

Causes the browser to launch directly in incognito mode.

### install-autogenerated-theme

Installs an autogenerated theme based on the given RGB value. The format is "r,g,b", where r, g, b are a numeric values from 0 to 255.

### install-chrome-app

Causes Chrome to initiate an installation flow for the given app.

### instant-process

Marks a renderer as an Instant process.

### keep-alive-for-test

Used for testing - keeps browser alive after last browser window closes.

### kiosk

Enable kiosk mode. Please note this is not Chrome OS kiosk mode.

### kiosk-printing

Enable automatically pressing the print button in print preview.

### make-default-browser

Makes Chrome default browser

### monitoring-destination-id

Allows setting a different destination ID for connection-monitoring GCM messages. Useful when running against a non-prod management server.

### native-messaging-connect-host

Requests a native messaging connection be established between the native messaging host named by this switch and the extension with ID specified by kNativeMessagingConnectExtension.

### native-messaging-connect-extension

Requests a native messaging connection be established between the extension with ID specified by this switch and the native messaging host named by the kNativeMessagingConnectHost switch.

### native-messaging-connect-id

If set when kNativeMessagingConnectHost and kNativeMessagingConnectExtension are specified, is reflected to the native messaging host as a command line parameter.

### no-default-browser-check

Disables the default browser check. Useful for UI/browser tests where we want to avoid having the default browser info-bar displayed.

### no-experiments

Disables all experiments set on about:flags. Does not disable about:flags itself. Useful if an experiment makes chrome crash at startup: One can start chrome with --no-experiments, disable the problematic lab at about:flags and then restart chrome without this switch again.

### no-first-run

Skip First Run tasks, whether or not it's actually the First Run. Overridden by kForceFirstRun. This does not drop the First Run sentinel and thus doesn't prevent first run from occuring the next time chrome is launched without this flag.

### no-pings

Don't send hyperlink auditing pings

### no-proxy-server

Don't use a proxy server, always make direct connections. Overrides any other proxy server flags that are passed.

### no-service-autorun

Disables the service process from adding itself as an autorun process. This does not delete existing autorun registrations, it just prevents the service from registering a new one.

### no-startup-window

Does not automatically open a browser window on startup (used when launching Chrome for the purpose of hosting background apps).

### on-the-fly-mhtml-hash-computation

Calculate the hash of an MHTML file as it is being saved. The browser process will write the serialized MHTML contents to a file and calculate its hash as it is streamed back from the renderer via a Mojo data pipe.

### new-window

Launches URL in new browser window.

### pack-extension

Packages an extension to a .crx installable file from a given directory.

### pack-extension-key

Optional PEM private key to use in signing packaged .crx.

### prediction-service-mock-likelihood

Used to mock the response received from the Web Permission Prediction Service. Used for testing.

### preinstalled-web-apps-dir

A directory where Chrome looks for json files describing default/preinstalled web apps. This overrides any default directory to load preinstalled web apps from.

### privet-ipv6-only

Use IPv6 only for privet HTTP.

### product-version

Outputs the product version information and quit. Used as an internal api to detect the installed version of Chrome on Linux.

### profile-directory

Selects directory of profile to associate with the first browser launched.

### profile-email

Like kProfileDirectory, but selects the profile by email address. If the email is not found in any existing profile, this switch has no effect. If both kProfileDirectory and kProfileUserName are specified, kProfileDirectory takes priority.

### proxy-auto-detect

Forces proxy auto-detection.

### proxy-bypass-list

Specifies a list of hosts for whom we bypass proxy settings and use direct connections. Ignored if --proxy-auto-detect or --no-proxy-server are also specified. This is a comma-separated list of bypass rules. See: "net/proxy_resolution/proxy_bypass_rules.h" for the format of these rules.

### proxy-pac-url

Uses the pac script at the given URL

### remote-debugging-targets

Porvides a list of addresses to discover DevTools remote debugging targets. The format is <host>:<port>,...,<host>:port.

### restore-last-session

Indicates the last session should be restored on startup. This overrides the preferences value. Note that this does not force automatic session restore following a crash, so as to prevent a crash loop. This switch is used to implement support for OS-specific "continue where you left off" functionality on OS X and Windows.

### save-page-as-mhtml

Disable saving pages as HTML-only, disable saving pages as HTML Complete (with a directory of sub-resources). Enable only saving pages as MHTML. See http://crbug.com/120416 for how to remove this switch.

### silent-debugger-extension-api

Does not show an infobar when an extension attaches to a page using chrome.debugger page. Required to attach to extension background pages.

### silent-launch

Causes Chrome to launch without opening any windows by default. Useful if one wishes to use Chrome as an ash server.

### simulate-critical-update

Simulates a critical update being available.

### simulate-elevated-recovery

Simulates that elevation is needed to recover upgrade channel.

### simulate-outdated

Simulates that current version is outdated.

### simulate-outdated-no-au

Simulates that current version is outdated and auto-update is off.

### simulate-upgrade

Simulates an update being available.

### ssl-version-max

Specifies the maximum SSL/TLS version ("tls1.2" or "tls1.3").

### ssl-version-min

Specifies the minimum SSL/TLS version ("tls1.2" or "tls1.3").

### tls1.2

TLS 1.2 mode for |kSSLVersionMax| and |kSSLVersionMin| switches.

### tls1.3

TLS 1.3 mode for |kSSLVersionMax| and |kSSLVersionMin| switches.

### start-maximized

Starts the browser maximized, regardless of any previous settings.

### start-stack-profiler

Starts the stack sampling profiler in the child process.

### browser-test

Browser test mode for the |kStartStackProfiler| switch. Limits the profile durations to be significantly less than the test timeout.

### storage-pressure-notification-interval

Interval, in minutes, used for storage pressure notification throttling. Useful for developers testing applications that might use non-trivial amounts of disk space.

### managed-user-id

Sets the supervised user ID for any loaded or newly created profile to the given value. Pass an empty string to mark the profile as non-supervised. Used for testing.

### system-log-upload-frequency

Frequency in Milliseconds for system log uploads. Should only be used for testing purposes.

### auto-accept-this-tab-capture

This flag makes Chrome auto-accept/reject requests to capture the current tab. It should only be used for tests.

### auto-reject-this-tab-capture

### test-name

Passes the name of the current running automated test to Chrome.

### trusted-download-sources

Identifies a list of download sources as trusted, but only if proper group policy is set.

### try-chrome-again

Experimental. Shows a dialog asking the user to try chrome. This flag is to be used only by the upgrade process.

### unlimited-storage

Overrides per-origin quota settings to unlimited storage for any apps/origins.  This should be used only for testing purpose.

### user-data-dir

Specifies the user data directory, which is where the browser will look for all of its state.

### use-system-proxy-resolver

Uses WinHttp to resolve proxies instead of using Chromium's normal proxy resolution logic. This is only supported in Windows. TODO(https://crbug.com/1032820): Only use WinHttp whenever Chrome is exclusively using system proxy configs.

### validate-crx

Examines a .crx for validity and prints the result.

### version

Prints version information and quits.

### webrtc-event-log-proactive-pruning-delta

Sets the delay (in seconds) between proactive prunings of remote-bound WebRTC event logs which are pending upload. All positive values are legal. All negative values are illegal, and ignored. If set to 0, the meaning is "no proactive pruning".

### webrtc-event-log-upload-delay-ms

WebRTC event logs will only be uploaded if the conditions hold for this many milliseconds.

### webrtc-event-log-upload-no-suppression

Normally, remote-bound WebRTC event logs are uploaded only when no peer connections are active. With this flag, the upload is never suppressed.

### window-position

Specify the initial window position: --window-position=x,y

### window-size

Specify the initial window size: --window-size=w,h

### window-workspace

Specify the initial window workspace: --window-workspace=id

### winhttp-proxy-resolver

Uses WinHTTP to fetch and evaluate PAC scripts. Otherwise the default is to use Chromium's network stack to fetch, and V8 to evaluate.

### win-jumplist-action

Specifies which category option was clicked in the Windows Jumplist that resulted in a browser startup.

### auth-spnego-account-type

CONDITION: `defined(OS_ANDROID)`

Android authentication account type for SPNEGO authentication

### enable-accessibility-tab-switcher

CONDITION: `defined(OS_ANDROID)`

Enable the accessibility tab switcher.

### enable-hung-renderer-infobar

CONDITION: `defined(OS_ANDROID)`

Enables a hung renderer InfoBar allowing the user to close or wait on unresponsive web content.

### force-device-ownership

CONDITION: `defined(OS_ANDROID)`

Forces the device to report being owned by an enterprise. This mimics the presence of an app signaling device ownerhsip.

### force-enable-night-mode

CONDITION: `defined(OS_ANDROID)`

Forces the night mode to be enabled.

### force-show-update-menu-badge

CONDITION: `defined(OS_ANDROID)`

Forces the update menu badge to show.

### force-enable-signin-fre

CONDITION: `defined(OS_ANDROID)`

Forces signin FRE flow.

### force-disable-signin-fre

CONDITION: `defined(OS_ANDROID)`

Forces the FRE to go through the legacy sync consent flow for testing.

### force-update-menu-type

CONDITION: `defined(OS_ANDROID)`

Forces the update menu type to a specific type.

### custom_summary

CONDITION: `defined(OS_ANDROID)`

Forces a custom summary to be displayed below the update menu item.

### market-url-for-testing

CONDITION: `defined(OS_ANDROID)`

Sets the market URL for Chrome for use in testing.

### crosh-command

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH)`

Custom crosh command.

### disable-logging-redirect

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH)`

Disables logging redirect for testing.

### disable-login-screen-apps

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH)`

Disables apps on the login screen. By default, they are allowed and can be installed through policy.

### short-merge-session-timeout-for-test

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH)`

Use a short (1 second) timeout for merge session loader throttle testing.

### scheduler-configuration

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH)`

Selects the scheduler configuration specified in the parameter.

### conservative

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH)`

### performance

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH)`

### scheduler-configuration-default

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH)`

Specifies what the default scheduler configuration value is if the user does not set one.

### help

CONDITION: `defined(OS_POSIX) && !defined(OS_MAC) && !BUILDFLAG(IS_CHROMEOS_ASH)`

These flags show the man page on Linux. They are equivalent to each other.

### h

CONDITION: `defined(OS_POSIX) && !defined(OS_MAC) && !BUILDFLAG(IS_CHROMEOS_ASH)`

### password-store

CONDITION: `defined(OS_POSIX) && !defined(OS_MAC) && !BUILDFLAG(IS_CHROMEOS_ASH)`

Specifies which encryption storage backend to use. Possible values are kwallet, kwallet5, gnome, gnome-keyring, gnome-libsecret, basic. Any other value will lead to Chrome detecting the best backend automatically. TODO(crbug.com/571003): Once PasswordStore no longer uses the Keyring or KWallet for storing passwords, rename this flag to stop referencing passwords. Do not rename it sooner, though; developers and testers might rely on it keeping large amounts of testing passwords out of their Keyrings or KWallets.

### enable-encryption-selection

CONDITION: `defined(OS_POSIX) && !defined(OS_MAC) && !BUILDFLAG(IS_CHROMEOS_ASH)`

Enables the feature of allowing the user to disable the backend via a setting.

### class

CONDITION: `defined(OS_POSIX) && !defined(OS_MAC) && !BUILDFLAG(IS_CHROMEOS_ASH)`

The same as the --class argument in X applications.  Overrides the WM_CLASS window property with the given value.

### apps-keep-chrome-alive-in-tests

CONDITION: `defined(OS_MAC)`

Prevents Chrome from quitting when Chrome Apps are open.

### enable-user-metrics

CONDITION: `defined(OS_MAC)`

Enable user metrics from within the installer.

### metrics-client-id

CONDITION: `defined(OS_MAC)`

This is how the metrics client ID is passed from the browser process to its children. With Crashpad, the metrics client ID is distinct from the crash client ID.

### relauncher

CONDITION: `defined(OS_MAC)`

A process type (switches::kProcessType) that relaunches the browser. See chrome/browser/mac/relauncher.h.

### dmg-device

CONDITION: `defined(OS_MAC)`

When switches::kProcessType is switches::kRelauncherProcess, if this switch is also present, the relauncher process will unmount and eject a mounted disk image and move its disk image file to the trash.  The argument's value must be a BSD device name of the form "diskN" or "diskNsM".

### make-chrome-default

CONDITION: `defined(OS_MAC)`

Indicates whether Chrome should be set as the default browser during installation.

### disable-windows10-custom-titlebar

CONDITION: `defined(OS_WIN)`

Disables custom-drawing the window titlebar on Windows 10.

### enable-profile-shortcut-manager

CONDITION: `defined(OS_WIN)`

Force-enables the profile shortcut manager. This is needed for tests since they use a custom-user-data-dir which disables this.

### hide-icons

CONDITION: `defined(OS_WIN)`

Makes Windows happy by allowing it to show "Enable access to this program" checkbox in Add/Remove Programs->Set Program Access and Defaults. This only shows an error box because the only way to hide Chrome is by uninstalling it.

### no-network-profile-warning

CONDITION: `defined(OS_WIN)`

Whether or not the browser should warn if the profile is on a network share. This flag is only relevant for Windows currently.

### notification-inline-reply

CONDITION: `defined(OS_WIN)`

Used in combination with kNotificationLaunchId to specify the inline reply entered in the toast in the Windows Action Center.

### notification-launch-id

CONDITION: `defined(OS_WIN)`

Used for launching Chrome when a toast displayed in the Windows Action Center has been activated. Should contain the launch ID encoded by Chrome.

### /prefetch:5

CONDITION: `defined(OS_WIN)`

/prefetch:# arguments for the browser process launched in background mode and for the watcher process. Use profiles 5, 6 and 7 as documented on kPrefetchArgument* in content_switches.cc.

NOTE: /prefetch:6 was formerly used by the watcher but is no longer used. /prefetch:7 is used by crashpad, which can't depend on constants defined here. See crashpad_win.cc for more details.

### show-icons

CONDITION: `defined(OS_WIN)`

See kHideIcons.

### uninstall

CONDITION: `defined(OS_WIN)`

Runs un-installation steps that were done by chrome first-run.

### uninstall-app-id

CONDITION: `defined(OS_WIN)`

Specifies that the WebApp with the specified id should be uninstalled.

### pwa-launcher-version

CONDITION: `defined(OS_WIN)`

Specifies the version of the Progressive-Web-App launcher that launched Chrome, used to determine whether to update all launchers. NOTE: changing this switch requires adding legacy handling for the previous method, as older PWA launchers still using this switch will rely on Chrome to update them to use the new method.

### debug-print

CONDITION: `BUILDFLAG(ENABLE_PRINT_PREVIEW) && !defined(OFFICIAL_BUILD)`

Enables support to debug printing subsystem.

### allow-nacl-crxfs-api

CONDITION: `BUILDFLAG(ENABLE_PLUGINS)`

Specifies comma-separated list of extension ids or hosts to grant access to CRX file system APIs.

### allow-nacl-file-handle-api

CONDITION: `BUILDFLAG(ENABLE_PLUGINS)`

Specifies comma-separated list of extension ids or hosts to grant access to file handle APIs.

### allow-nacl-socket-api

CONDITION: `BUILDFLAG(ENABLE_PLUGINS)`

Specifies comma-separated list of extension ids or hosts to grant access to TCP/UDP socket APIs.

### enable-new-app-menu-icon

CONDITION: `defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || \`

### guest

CONDITION: `defined(OS_LINUX) || defined(OS_CHROMEOS) || defined(OS_MAC) || \`

Causes the browser to launch directly in guest mode.

### list-apps

CONDITION: `defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN)`

Writes open and installed web apps for each profile to the specified file without launching a new browser window or tab. Pass a absolute file path to specify where to output the information. Can be used together with optional --profile-base-name switch to only write information for a given profile.

### profile-base-name

CONDITION: `defined(OS_LINUX) || defined(OS_MAC) || defined(OS_WIN)`

Pass the basename of the profile directory to specify which profile to get information. Only relevant when used with --list-apps switch.

### webapk-server-url

CONDITION: `BUILDFLAG(IS_CHROMEOS_ASH) || defined(OS_ANDROID)`

Custom WebAPK server URL for the sake of testing.

### use-system-default-printer

CONDITION: `!BUILDFLAG(IS_CHROMEOS_ASH) && !defined(OS_ANDROID)`

Uses the system default printer as the initially selected destination in print preview, instead of the most recently used destination.

### user-data-migrated

CONDITION: `BUILDFLAG(ENABLE_DOWNGRADE_PROCESSING)`

Indicates that this process is the product of a relaunch following migration of User Data.
