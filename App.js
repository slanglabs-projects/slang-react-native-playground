import React  from 'react';

import {
  SafeAreaView,
} from 'react-native';

import Features from "./js/Features"
import Header from "./js/Header"


 const App = () => {
   return (
    <>
        <Header />
        <SafeAreaView style={{flex: 1}}>
        <Features />
      </SafeAreaView>
    </>
  );
}




export default App;
