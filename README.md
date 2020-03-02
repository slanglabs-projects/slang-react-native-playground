![react-native-slang](https://raw.githubusercontent.com/SlangLabs/react-native-slang-playground/master/js/assets/logo.png)

# React Native Slang Playground (Android)

This is a demo app to illustrate the feature of [react-native-slang](https://www.npmjs.com/package/react-native-slang)
in a react native app.

Its aimed to help developers understand how to integrate and
use Slang in their own apps by example.

#### Before you atart

You would need

- Basic understanding of React Native
- Understanding [Slang Buddy Concepts](https://docs.slanglabs.in/slang/digging-deeper/building-buddies)
- Existing [Slang Buddy](https://docs.slanglabs.in/slang/getting-started/building-your-first-buddy)
- Androind Studio (adb tools)
- An Android device with USB debugging enabled

### Getting Started

3 steps to get started with this project

#### Step 1: First download this code locally

`$ git clone https://github.com/SlangLabs/react-native-slang-playground.git`

`$ cd react-native-slang-playground/`

#### Step 2: Install dependencies and launch the app

`$ yarn`

OR

`$ npm install`

After successful installation of node packages attach your Android device and run

`$ adb devices`

To get your device ID example: ER45TBZM1D64Q.

Now run the following command to build and run on your device

`$ react-native run-android --deviceId=<your-device-ID>`

#### Step 3: Start developing

Once you successfully start the app on your device,
go to the settings tab
to add the Buddy ID and API key to load your [Slang Buddy](https://docs.slanglabs.in/slang/digging-deeper/building-buddies)

Or

In the code, the component that initialises slang is in [js/Features/index.js](https://github.com/SlangLabs/react-native-slang-playground/blob/master/js/Features/index.js)

Open it in your favourite text editor and make changes to load your buddy when the component mounts.

```
// Slang is initialised with the below function
// Add your buddy Id and API key to this function and run your app
      Slang.initialize(
        <buddyID>,
        <APIKey>,
        {
          "locale": "LOCALE_ENGLISH_IN", // Other possible values: LOCALE_HINDI_IN, LOCALE_ENGLISH_US
          "position": "CENTER_BOTTOM", // Other possible values: LEFT_TOP, CENTER_TOP, RIGHT_TOP, CENTER, LEFT_BOTTOM, RIGHT_BOTTOM etc.
        },
        // callback function once slang initialises successfully
        () => {
          console.log("Slang initialized successfully");
         // Do more things ...
       });

```

![Playground App Initialised](https://raw.githubusercontent.com/SlangLabs/react-native-slang-playground/master/js/assets/screenshot1.png)

### Release

Optinally you can run the app by downloading [this APK](https://github.com/SlangLabs/react-native-slang-playground/raw/master/Release/React-Native-Slang-Playground.apk) and installing it manually on your device

### Documentation

You can find our documentation [here](https://docs.slanglabs.in/slang/getting-started/react-native-quick-start) if you would like to run react-native-slang in your app.

##### Contact

For any queries contact us support@slanglabs.in
