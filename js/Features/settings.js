
import React  from 'react';
import {Content,  H3, Button,  Text, Form, Item, Input, Label} from 'native-base';

export default Settings = (props) => {
    const { styles, handleChangeBuddyID, handleChangeAPIKey, handleReInit, state } = props
    const { buddyID, APIKey } = state
    return (
      <Content>
          <H3 style={styles.head} > Settings </H3>
          <Form>
        <Item style={styles.input} stackedLabel >
        <Label style={styles.text} >Buddy ID</Label>

          <Input  onChangeText={handleChangeBuddyID} style={styles.text}  value={buddyID} />
        </Item>
        <Item style={styles.input} stackedLabel >
        <Label style={styles.text} >API Key</Label>

          <Input  style={styles.text} onChangeText={handleChangeAPIKey} value={APIKey} />
        </Item>
        <Button  onPress={handleReInit} full>
        <Text style={styles.text}>Load Buddy</Text>
      </Button>
      </Form>
      </Content>
     )
  }