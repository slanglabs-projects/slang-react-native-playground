import React, { Component } from 'react';
import Slang from 'react-native-slang';

import { StyleSheet,   ScrollView, } from 'react-native';
import { Icon,  Text,  Tab, Tabs, TabHeading,} from 'native-base';

import  Colors  from '../Colours';
import  Settings  from './settings';
import  IntentTest  from './intentTest';
import  FeaturesList  from './featureList';


  const styles = StyleSheet.create({
    head: {
        color: Colors.light,
        marginTop: 10,
        marginBottom: 20
      },
    text: {
        color: Colors.light,
        fontSize: 16
      },
    input: {
        color: Colors.light,
        marginBottom: 20,
        fontSize: 16
      },
    success: {
        color: 'green',
        fontSize: 14

      },
    fail: {
        color: 'red',
        fontSize: 14
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
})

class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buddyID: "", 
      APIKey: "",
      textToShow: 'Test your intent...',
      utterance: '',
      actionComplete: null,
      intent: null,
      intentName: null,
      utterance: null,
      entities: {},
      isInit: 'No'
    };
  }
 
    slangActionHandler =  (intent) => {
                  
                    const entities = intent.entities
                      ? intent.entities.map(entity => {
                          return {
                            ...entity,
                            listValues:
                              entity.isList && entity.isResolved
                                ? entity.listValues.map(e => e.value)
                                : []
                          };
                        })
                      : [];
        
                    this.setState({
                      intentName: intent.name,
                      utterance: intent.userUtterance,
                      entities
                    });

      }

       slangOnUtteranceDetected =   () => {
          Slang.setOnUtteranceDetected((utt) => this.setState({utterance: utt}))        
      }
      slangStartConversation = () => {
        Slang.startConversation("Hello and welcome to React Native Slang!")
      }
      slangShow = () => {
        Slang.ui.show();
      }
      slangHide = () => {
        Slang.ui.hide()
      }


      slangMute = () => {
        Slang.tts.mute()
      }

      slangUnmute = () => {
        Slang.tts.unmute()
      }
      intentActionHandler = () => {
        Slang.setIntentActionHandler((act) => this.setState({actionComplete: JSON.stringify(act, null, 4)}))
      }

      initialize = () => {
        const { buddyID , APIKey} = this.state
        if(buddyID && APIKey){
          Slang.initialize(
            buddyID, 
            APIKey, 
            { 
              "locale": "LOCALE_ENGLISH_IN", // Other possible values: LOCALE_HINDI_IN, LOCALE_ENGLISH_US
              "position": "CENTER_BOTTOM", // Other possible values: LEFT_TOP, CENTER_TOP, RIGHT_TOP, CENTER, LEFT_BOTTOM, RIGHT_BOTTOM etc. 
            }, 
            () => { 
              console.log("Slang initialized successfully");
              Slang.ui.show()
              Slang.setIntentActionHandler(this.slangActionHandler);
              this.setState({
                isInit: "Yes"
               })
           });
        } else {
          console.log( "Add your  buddy ID and API key in the app  menu settings" )
        }
      }
      componentDidMount(){
         
          //  this.initialize()
      }
      handleChangeBuddyID = (buddyID) => {
        this.setState({ buddyID })
      }
      handleChangeAPIKey = (APIKey) => {
        this.setState({ APIKey })
      }
      handleReInit = () => {
        this.initialize()
      }
      
    render() {
      const {
        isInit,
        entities,
        intentName,
        utterance,
        buddyID,
        APIKey,
        actionComplete
      } = this.state
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
        slangOnUtteranceDetected
      } = this
      const settingsState = {
        buddyID,
        APIKey
      }
      const settingsProps = {
        styles,
        handleChangeBuddyID,
        handleChangeAPIKey,
        handleReInit,
        state: settingsState
      }
      const testIntentState = {
        intentName,
        utterance,
        entities
      }
      const testIntentProps = {
        styles,
        state: testIntentState
      }
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
        slangOnUtteranceDetected
    } 

    return(
      <Tabs>
          <Tab  style={styles.body}  heading={ <TabHeading><Icon name="apps" /><Text>Features</Text></TabHeading>}>
          <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <FeaturesList {...featuresListProps} />
          </ScrollView>
          </Tab>
          <Tab  style={styles.body}  heading={ <TabHeading><Text>Intent Test</Text></TabHeading>}>
          <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
             <IntentTest {...testIntentProps} />
             </ScrollView>

          </Tab>
          <Tab style={styles.body} heading={ <TabHeading><Icon name="md-settings" /><Text>Settings</Text></TabHeading>}>
          <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Settings {...settingsProps} />
          </ScrollView>

          </Tab>
        </Tabs>
    )        
    }
}



export default Features