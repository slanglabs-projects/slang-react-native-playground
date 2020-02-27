
import React  from 'react';
import { Content,  H3,   Text } from 'native-base';

export default IntentTest = (props) => {

    const { styles , state} = props
    const { intentName, utterance, entities } = state

    return (
      <Content>
          <H3 style={styles.head} > Intent Test </H3>
          {intentName ? <>
          <Text style={styles.text} >Intent Name: {intentName}</Text>
          <Text style={styles.text} >User Utterance: {utterance}</Text>
          {entities.length > 0 ? (
        
          <>
            <Text style={styles.text} >Entities</Text>
            <Text > </Text>
            {entities.map((entity, index) => {
              if (entity.isResolved) {
                return (
                  <Text style={styles.text} key={index}>
                    {!entity.isList ? (
                      <Text style={styles.text} >{entity.name}: {entity.value} </Text>
                    ) : (
                      <Text style={styles.text} > {entity.name}:
                        { entity.listValues.map((value, index) => value + " , " )}
                      </Text>
                    )}
                  </Text>
                );
              }

              return (
                <Text style={styles.fail} key={index}>
                 {entity.name}: unrecognised 
                </Text>
              );
            })}
          </>
      ) : null}
      </> : <Text  style={styles.text} > Test your buddy, tap on the mic below.</Text> }
          
      </Content>
  )
  }