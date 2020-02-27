import React  from 'react';
import { Header, Left, Body, Right, Title, Subtitle } from 'native-base';

export default HeaderView = () => {

    return (
        <Header hasTabs noLeft noShadow>
          <Left />
          <Body>
            <Title>Slang Playground</Title>
            <Subtitle>React Native</Subtitle>
          </Body>
          <Right>
          </Right>
        </Header>
    );
  }