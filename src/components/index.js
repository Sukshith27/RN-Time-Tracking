import React from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';

import NavBar from './NavBar';
import Tasks from './Tasks';

const Loading = () => (
  <View style={{flex: 1, alignSelf: 'center'}}>
    <ActivityIndicator animating />
  </View>
);

const Error = ({error}) => (
  <View style={{flex: 1, alignSelf: 'center'}}>
    <Text style={{color: 'lightGrey'}}>
      Unable to load your data.(Error: {error})
    </Text>
  </View>
);

const SIZE = 70;
const CreateTaskFab = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: 'absolute',
      backgroundColor: 'black',
      width: SIZE,
      height: SIZE,
      borderRadius: SIZE / 2,
      bottom: 24,
      right: 24,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{color: 'white', fontSize: 28}}>+</Text>
  </TouchableOpacity>
);

export {NavBar, Tasks, Loading, Error, CreateTaskFab};
