import React from 'react';
import {View, Text} from 'react-native';
import {screenWidth} from '../utils';

export default () => {
  return (
    <View
      style={{
        width: screenWidth,
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 12,
        paddingTop: 28,
      }}>
      <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
        Tasks
      </Text>
    </View>
  );
};
