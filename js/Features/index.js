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

import Colors from '../Colours';
import Settings from './settings';
import IntentTest from './intentTest';
import FeaturesList from './featureList';

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buddyID: null, // Add your buddy ID
      APIKey: null, // and API key here to auto load your buddy when the app starts
      actionComplete: null,
      intent: null,
      intentName: null,
      utterance: null,
      entities: {},
      isInit: 'No',
    };
  }

  //Method to initialise slang in this component
  initialize = () => {
    const {buddyID, APIKey} = this.state;

    // check if buddy ID and API key is set before initialising
    if (buddyID && APIKey && buddyID !== '' && APIKey !== '') {
      // Slang's initialise funcion
      Slang.initialize(
        buddyID,
        APIKey,
        {
          locale: 'LOCALE_ENGLISH_IN', // Other possible values: LOCALE_HINDI_IN, LOCALE_ENGLISH_US
          position: 'CENTER_BOTTOM', // Other possible values: LEFT_TOP, CENTER_TOP, RIGHT_TOP, CENTER, LEFT_BOTTOM, RIGHT_BOTTOM etc.
        },
        // Callback when slang is initialised successfully
        () => {
          console.log('Slang initialized successfully');
          // show slang if hidden before
          Slang.ui.show();
          // set the action handler
          Slang.setIntentActionHandler(this.slangActionHandler);
          // set isInit to Yes, this is displayed in the feature list on the app
          this.setState({
            isInit: 'Yes',
          });
        },
      );
    } else {
      console.log('Add your  buddy ID and API key in the app  menu settings');
    }
  };
  componentDidMount() {
    // call the initialise method when this component mounts,
    // this is recommended when initialising slang in your own app
    this.initialize();
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
    console.log('Set your custom action handler here');
    // You can set you custom Intent Action handler here example:
    // Slang.setIntentActionHandler((intent) => this.setState({actionComplete: JSON.stringify(intent, null, 4)}))
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
    this.initialize();
  };

  render() {
    const {
      isInit,
      entities,
      intentName,
      utterance,
      buddyID,
      APIKey,
      actionComplete,
    } = this.state;
    const {
      handleChangeBuddyID,
      handleChangeAPIKey,
      handleReInit,
      slangShow,
      slangHide,
      slangMute,
      slangUnmute,
      slangStartConversation,
      intentActionHandler,
      slangOnUtteranceDetected,
    } = this;
    const settingsState = {
      buddyID,
      APIKey,
    };
    const settingsProps = {
      styles,
      handleChangeBuddyID,
      handleChangeAPIKey,
      handleReInit,
      state: settingsState,
    };
    const testIntentState = {
      intentName,
      utterance,
      entities,
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
    };

    return (
      <Tabs>
        <Tab
          style={styles.body}
          heading={
            <TabHeading>
              <Text>Intent Test</Text>
            </TabHeading>
          }>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {/* Intent Test Tab UI component */}
            <IntentTest {...testIntentProps} />
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
