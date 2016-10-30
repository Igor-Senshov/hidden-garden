# Hidden Garden

##Technologies used:
- Angular version 1.5.3
- Ionic version 1.3.1
- Cordova version 6.3.1
- Node.js version 4.6.1
- TypeScript version 2.0.3

##Installation.
First install Node, Cordova and Ionic http://ionicframework.com/getting-started/. Then download this repo and run this commands inside hidden-garden folder: `npm install`, `ionic serve`.

##Modify app.
If you want to modify app you can do it inside \www\ folder. Use app.ts file in \www\js\ folder, or app.js if you don't want to use TypeScript.

##Testing.
###For testing I've used:
-	Karma 1.3.0
-	Karma Jasmine 1.0.2
-	Angular mocks 1.5.3
-	Karma-Read-JSON 1.1.0

If you want to use tests you need to install karma-cli. To install karma-cli just run this command `npm install -g karma-cli`.
Tests can be run by `npm test` or from \tests\ folder by `karma start tests.conf.js` command.

If you want to add your own email addresses for testing do it in input-emails.json file which is located in \tests\ folder. **typoEmails should be the _same length and order_ as outputEmails in changed-output-emails.json.**

I've also tested with browsers launchers (Firefox, Chrome and Safari). You need those browsers installed and included in \tests\tests.conf as browsers values after PhantomJS if you want to test them.

**Note: karma-opera-launcher 1.0.0 not working properly in Windows 10. For Edge I didn't find any launcher at the moment, so Opera and Edge were tested manually.**
	
###For testing in Android and iOS (I've used simulators).
**For Android you will need:**
-	[Android Studio](http://developer.android.com/sdk/index.html)
-	Also [Java SE Development Kit](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (I've used 8u111 for Windows x64)
-	[And Genymotion](https://www.genymotion.com/)

Then start Genymotion and run `ionic build android` command from hidden-garden folder. After build is finished just drag and drop APK file from /platforms/android/build/outputs/apk/android-debug.apk to simulator.

**For iOS you will need:**
-	Mac and Xcode installed.
-	Inside hidden-garden folder run `ionic build ios` and `ionic emulate ios` commands. Then launch hiddengarden.xcodeproj inside /platforms/ios/ and use simulator.
	
Additional information about testing and how to test as a native app: https://ionicframework.com/docs/guide/testing.html

## Demo.
You can see app here https://hidden-garden-7914.herokuapp.com/ I'm using "Free" plan, so app "sleeps" after 30 min of inactivity and it will take a little more time to "wake up".