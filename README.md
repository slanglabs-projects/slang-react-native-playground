# React Native Slang Playground (Android)


This is a demo app to illustrate the feature of [react-native-slang](https://www.npmjs.com/package/react-native-slang) 
in a react native app. 

Its aimed to help developers understand how to integrate and 
use Slang in their own apps by example.

#### Before you atart

You would need

- Basic understanding of React Native 
- Existing [Slang Buddy](https://docs.slanglabs.in/slang/getting-started/building-your-first-buddy) 
- Androind Studio (adb tools)
- An Android device with USB debugging enabled

### Getting Started

3 steps to get started with this project

#### Step 1: First download this code locally

` $ git clone git@github.com:SlangLabs/react-native-slang-playground.git`

` $ cd react-native-slang-playground/`

#### Step 2: Install dependencies and launch the app

` $ yarn` 

OR

` $ npm install`

After successful installation of node packages attach your Android device and run  

` $ adb devices`

To get your device ID example: ER45TBZM1D64Q. 

Now run the following command to build and run on your device

` $ react-native run-android --deviceId=<your-device-ID> `

#### Step 3: Start developing 

Once you successfully start the app on your device, 
go to the settings tab
to add the Buddy ID and API key to load your [Slang Buddy](https://docs.slanglabs.in/slang/digging-deeper/building-buddies)

The component that initialises slang is in  `js/Features/index.js`

Open it in your favourite text editor and make changes.



##### Contact 

For any queries contact us support@slanglabs.in 


