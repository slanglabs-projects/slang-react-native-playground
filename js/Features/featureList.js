import React  from 'react';
import {Content, H3, Icon, Button, Right, Left, List, ListItem, Text, Body,} from 'native-base';

export default FeatureList = (props) => {

        const {
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
        } = props

        return (
        <Content style={{marginBottom: 50}}>
            <H3 style={styles.head} > Features List </H3>
            
            <List>
      <ListItem>
        <Left>
        <Text style={styles.text} >Initialised</Text>
        </Left>
        <Right>
      <H3 style={isInit === 'Yes' ? styles.success : styles.fail } >{isInit}</H3>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
        <Text style={styles.text} >Show</Text>
        </Left>
        <Right>
        <Button onPress={slangShow} rounded  transparent bordered  ><Icon style={styles.text}  name="md-checkmark" /></Button>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
        <Text style={styles.text} >Hide</Text>
        </Left>
        <Right>
        <Button onPress={slangHide} rounded  transparent bordered  ><Icon style={styles.text} name="md-close" /></Button>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
        <Text style={styles.text} >Mute</Text>
        </Left>
        <Right>
        <Button onPress={slangMute} rounded  transparent bordered  ><Icon style={styles.text}  name="md-volume-off" /></Button>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
        <Text style={styles.text} >Unmute</Text>
        </Left>
        <Right>
        <Button onPress={slangUnmute} rounded  transparent bordered  ><Icon style={styles.text} name="md-volume-high" /></Button>
        </Right>
      </ListItem>
      <ListItem>
        <Left>
        <Text style={styles.text} >Start Conversation</Text>
        </Left>
        <Right>
        <Button onPress={slangStartConversation} rounded  transparent   bordered ><Icon style={styles.text} name="md-mic" /></Button>
        </Right>
      </ListItem>
      <ListItem>
        <Body>
        <Text style={styles.text} >Set Utterance Detected</Text>
        <Text style={styles.success} note>{utterance}</Text>
        </Body>
        <Right>
        <Button onPress={slangOnUtteranceDetected} rounded  transparent   bordered ><Icon style={styles.text} name="ios-cafe" /></Button>
        </Right>
      </ListItem>
      <ListItem>
        <Body>
        <Text style={styles.text} >Action completed</Text>
        <Text style={styles.text} note>{actionComplete}</Text>
        </Body>
        <Right>
        <Button onPress={intentActionHandler} rounded  transparent   bordered ><Icon style={styles.text} name="md-code-working" /></Button>
        </Right>
      </ListItem>
    
      </List>
        </Content>
    )

    

}


