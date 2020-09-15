import React from 'react';
import {FlatList, View} from 'react-native';

import {useQuery} from '@apollo/client';
import {FETCH_ALL_TASKS} from '../network/queries';

import {Error, Loading} from '.';
import {screenWidth} from '../utils';
import {Task} from './Task';

const TasksWrapper = ({loading, error, children}) => {
  return (
    <View
      style={{
        flex: 1,
        width: screenWidth,
        backgroundColor: 'white',
        padding: 16,
      }}>
      {loading ? <Loading /> : error ? <Error error={error} /> : children}
    </View>
  );
};

export default ({toggleModal = () => {}}) => {
  const {loading, error, data: {tasks = []} = {}, refetch} = useQuery(
    FETCH_ALL_TASKS,
  );

  const renderTask = ({item: {title, tags, id, end_time, start_time}}) => (
    <Task
      title={title}
      tags={tags}
      key={id}
      id={id}
      startTime={start_time}
      endTime={end_time}
      toggleModal={toggleModal}
    />
  );

  return (
    <TasksWrapper loading={loading} error={error}>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={({id}) => String(id)}
      />
    </TasksWrapper>
  );
};
