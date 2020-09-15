import React, {useContext, useState} from 'react';
import {StatusBar, View} from 'react-native';

import {ApolloProvider} from '@apollo/client';

import {CreateTaskFab, NavBar, Tasks} from './components';
import {client} from './network';
import AddTask from './components/AddTask';

export default () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [popUpData, setPopupData] = useState({});

  const toggleModal = ({isUpdate = false, ...rest} = {}) => {
    if (isUpdate) setPopupData({isUpdate, ...rest});
    else setPopupData({});

    setAddTaskVisible((prevVal) => !prevVal);
  };

  return (
    <ApolloProvider client={client}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <StatusBar barStyle="light-content" />
        <NavBar />
        <Tasks toggleModal={toggleModal} />
        <CreateTaskFab onPress={toggleModal} />
        {addTaskVisible && (
          <AddTask closeModal={toggleModal} popUpData={popUpData} />
        )}
      </View>
    </ApolloProvider>
  );
};
