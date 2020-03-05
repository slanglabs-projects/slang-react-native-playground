/***
 * This file showcases all of react-native-slang features.
 * We use native-base for our UI components
 *
 * Copyright (c) 2017-2019 Slang Labs Private Limited. All rights reserved.
 ***/

import React, {Component} from 'react';
import Slang from 'react-native-slang';

import {StyleSheet, ScrollView} from 'react-native';
import {Icon, Text, Tab, Tabs, TabHeading} from 'native-base';
import {storeData, getData} from '../Storage';

import Colors from '../Colours';
import Settings from './settings';
import BuddyTest from './BuddyTest';
import FeaturesList from './featureList';

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buddyName: null,
      buddyID: null, // Add your buddy ID
      APIKey: null, // and API key here to auto load your buddy when the app starts
      actionComplete: null,
      intent: null,
      intentName: null,
      utterance: null,
      entities: {},
      isInit: false,
    };
  }

  //Method to initialise slang in this component
  initialize = () => {
    const {buddyID, APIKey, isInit} = this.state;

    // check if buddy ID and API key is set before initialising
    // if (buddyID && APIKey && buddyID !== '' && APIKey !== '') {
    // Slang's initialise funcion
    Slang.initialize(
      buddyID,
      APIKey,
      {
        locale: 'LOCALE_HINDI_IN', // Other possible values: LOCALE_HINDI_IN, LOCALE_ENGLISH_US
        position: 'CENTER', // Other possible values: LEFT_TOP, CENTER_TOP, RIGHT_TOP, CENTER, LEFT_BOTTOM, RIGHT_BOTTOM etc.
      },
      // Callback when slang is initialised successfully
      () => {
        console.log('Slang initialized successfully');
        // show slang if hidden before
        Slang.ui.show();
        // set isInit to Yes, this is displayed in the feature list on the app
        this.setState({
          isInit: true,
        });
      },
    );
    // } else {
    //   console.log('Add your  buddy ID and API key in the app  menu settings');
    // }
  };
  async componentDidMount() {
    this.setState({
      buddyName: await getData('buddyName'), // Add your buddy ID
      buddyID: await getData('buddyID'), // Add your buddy ID
      APIKey: await getData('APIKey'), // and API key here to auto load your buddy when the app starts
    });

    // check if slang is initialised
    const isInit = await Slang.isInitialized();
    // if(!isInit) {
    // call the initialise method when this component mounts,
    // this is recommended when initialising slang in your own app
    this.initialize();
    // }
    // set the state of is slang initialised
    this.setState({
      isInit,
    });

    // set the action handler, can be called before initialised
    Slang.setIntentActionHandler(this.slangActionHandler);
  }

  /* The Action handler is where you can perform function in your app based on what utterance the user spoke.
   * For a better understanding goto: https://docs.slanglabs.in/slang/getting-started/react-native-quick-start#step-4-write-action-handlers
   * The method below recieves the intent object and displays
   * the intent name, entities resolved and utterance the user spoke in the intent test tab
   */

  slangActionHandler = intent => {
    const entities = intent.entities
      ? intent.entities.map(entity => {
          return {
            ...entity,
            listValues:
              entity.isList && entity.isResolved
                ? entity.listValues.map(e => e.value)
                : [],
          };
        })
      : [];

    this.setState({
      intentName: intent.name,
      utterance: intent.userUtterance,
      actionComplete: JSON.stringify(intent, null, 4),
      entities,
    });
  };

  slangOnUtteranceDetected = () => {
    // set the latest utterance detect by slang
    Slang.setOnUtteranceDetected(utt => this.setState({utterance: utt}));
  };

  slangStartConversation = () => {
    // You can trigger slang to speak wo the user with or without an action from the user with startConversation
    // this would be useful as a greeing message or when you want to grab the attention of the user for a particular action
    Slang.startConversation('Hello and welcome to React Native Slang!');
  };

  slangCancel = () => {
    // Cancel slang and reset to trigger state
    Slang.ui.cancel();
  };

  slangShow = () => {
    // Show the slang UI
    Slang.ui.show();
  };

  slangHide = () => {
    // Hide the slang UI
    Slang.ui.hide();
  };

  slangMute = () => {
    // Mute the TTS
    Slang.tts.mute();
  };

  slangUnmute = () => {
    // Unmute the TTS
    Slang.tts.unmute();
  };
  intentActionHandler = () => {
    const {actionComplete} = this.state;
    // outputs the slang intent object (set in the action handler above ) to the console.log
    console.log('Intent Object: ', actionComplete);
  };

  handleChangeBuddyName = buddyName => {
    // sets the user input Buddy Name
    this.setState({buddyName});
  };

  handleChangeBuddyID = buddyID => {
    // sets the user input buddy ID
    this.setState({buddyID});
  };
  handleChangeAPIKey = APIKey => {
    // sets the user input API Key
    this.setState({APIKey});
  };

  // re-initialise when setting a new API key / Buddy ID
  handleReInit = () => {
    const {buddyName, buddyID, APIKey} = this.state;
    storeData('APIKey', APIKey);
    storeData('buddyID', buddyID);
    storeData('buddyName', buddyName);
    this.initialize();
  };

  render() {
    const {
      isInit,
      entities,
      intentName,
      utterance,
      buddyID,
      buddyName,
      APIKey,
      actionComplete,
    } = this.state;
    const {
      handleChangeBuddyID,
      handleChangeBuddyName,
      handleChangeAPIKey,
      handleReInit,
      slangShow,
      slangHide,
      slangMute,
      slangUnmute,
      slangStartConversation,
      intentActionHandler,
      slangOnUtteranceDetected,
      slangCancel,
    } = this;
    const settingsState = {
      buddyName,
      buddyID,
      APIKey,
    };
    const settingsProps = {
      styles,
      handleChangeBuddyName,
      handleChangeBuddyID,
      handleChangeAPIKey,
      handleReInit,
      state: settingsState,
    };
    const testIntentState = {
      intentName,
      utterance,
      entities,
      isInit,
    };
    const testIntentProps = {
      styles,
      state: testIntentState,
    };
    const featuresListProps = {
      utterance,
      actionComplete,
      styles,
      isInit,
      slangShow,
      slangHide,
      slangMute,
      slangUnmute,
      slangStartConversation,
      intentActionHandler,
      slangOnUtteranceDetected,
      slangCancel,
    };

    return (
      <Tabs>
        <Tab
          style={styles.body}
          heading={
            <TabHeading>
              <Text>Buddy Test</Text>
            </TabHeading>
          }>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {/* Intent Test Tab UI component */}
            <BuddyTest {...testIntentProps} />
          </ScrollView>
        </Tab>
        <Tab
          style={styles.body}
          heading={
            <TabHeading>
              <Icon name="apps" />
              <Text>Features</Text>
            </TabHeading>
          }>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {/* Feature List Tab UI component  */}
            <FeaturesList {...featuresListProps} />
          </ScrollView>
        </Tab>
        <Tab
          style={styles.body}
          heading={
            <TabHeading>
              <Icon name="md-settings" />
              <Text>Settings</Text>
            </TabHeading>
          }>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {/* Settings Tab UI component  */}
            <Settings {...settingsProps} />
          </ScrollView>
        </Tab>
      </Tabs>
    );
  }
}

// Styles for all the parent and child components in the tree
const styles = StyleSheet.create({
  head: {
    color: Colors.light,
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    color: Colors.light,
    fontSize: 16,
  },
  input: {
    color: Colors.light,
    marginBottom: 20,
    fontSize: 16,
  },
  success: {
    color: 'green',
    fontSize: 14,
  },
  successLight: {
    color: '#139a7a',
    fontSize: 16,
  },
  warn: {
    color: '#f0851a',
    fontSize: 14,
  },
  fail: {
    color: 'red',
    fontSize: 14,
  },
  body: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 20,
    backgroundColor: Colors.dark,
  },
  scrollView: {
    backgroundColor: Colors.dark,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 14,
    paddingRight: 20,
  },
});

export default Features;
