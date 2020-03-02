import React from 'react';
import {Linking} from 'react-native';

import {Content, H3, Text} from 'native-base';

export default BuddyTest = props => {
  const {styles, state} = props;
  const {intentName, utterance, entities, isInit} = state;

  return (
    <Content>
      <H3 style={styles.head}>Buddy Test </H3>
      {intentName ? (
        <>
          <Text style={styles.text}>
            {' '}
            Intent Name: <Text style={styles.successLight}>{intentName}</Text>
          </Text>
          <Text> </Text>
          <Text style={styles.text}>
            {' '}
            User Utterance:<Text style={styles.successLight}> {utterance}</Text>
          </Text>
          <Text> </Text>
          {entities.length > 0 ? (
            <>
              <Text style={styles.text}> Entities:</Text>
              {entities.map((entity, index) => {
                if (entity.isResolved) {
                  return (
                    <Text style={styles.text} key={index}>
                      {!entity.isList ? (
                        <Text style={styles.text}>
                          {' '}
                          {entity.name}:{' '}
                          <Text style={styles.successLight}>
                            {' '}
                            {entity.value}{' '}
                          </Text>
                        </Text>
                      ) : (
                        <Text style={styles.text}>
                          {' '}
                          {entity.name}:
                          {entity.listValues.map(
                            (value, index) => value + ' , ',
                          )}
                        </Text>
                      )}
                    </Text>
                  );
                }

                return (
                  <Text style={styles.text} key={index}>
                    {' '}
                    {entity.name}: <Text style={styles.warn}>unrecognised</Text>{' '}
                  </Text>
                );
              })}
            </>
          ) : null}
        </>
      ) : (
        <>
          {isInit ? (
            <Text style={styles.text}>
              {' '}
              Test your buddy, tap on the mic button.
            </Text>
          ) : (
            <Text style={styles.text}>
              {' '}
              Add your Slang Buddy ID and API key in the settings tab
            </Text>
          )}
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text
            style={styles.successLight}
            onPress={() => {
              //on clicking we are going to open the URL using Linking
              Linking.openURL(
                'https://docs.slanglabs.in/slang/digging-deeper/building-buddies',
              );
            }}>
            {' '}
            Learn more about Slang Buddies
          </Text>
        </>
      )}
    </Content>
  );
};
