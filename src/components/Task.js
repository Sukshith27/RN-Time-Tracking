import {useMutation} from '@apollo/client';
import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {updateTask} from '../network/mutations';
import {screenWidth} from '../utils';

import moment from 'moment';

const Tags = ({data = []}) => (
  <View style={{flexDirection: 'row', marginTop: 12, flexWrap: 'wrap'}}>
    {data.map((item) => (
      <Tag name={item.name} key={item.id} />
    ))}
  </View>
);

export const Tag = ({name = '', style = {}}) => (
  <View
    style={{
      backgroundColor: 'lightgrey',
      borderRadius: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 8,
      ...style,
    }}>
    <Text style={{fontSize: 12, color: 'black', alignSelf: 'center'}}>
      {name}
    </Text>
  </View>
);

export const Task = ({
  title = 'Default title',
  tags = ['def', 'tags'],
  startTime,
  endTime,
  id,
  toggleModal,
}) => {
  const [startTask, {loading: submittingStart}] = useMutation(
    updateTask('{start_time: $startTime}'),
  );
  const [endTask, {loading: submittingEnd}] = useMutation(
    updateTask('{end_time: $endTime}'),
  );

  const isStarted = !!startTime;
  const isComplete = !!startTime && !!endTime;

  const loading = submittingEnd || submittingStart;

  const getDuration = () =>
    moment.duration(moment().diff(moment(startTime))).humanize();

  const timeElapsed = isStarted ? getDuration() : '';

  const startTaskHandler = () => {
    startTask({variables: {id, startTime: new Date().toISOString()}});
  };

  const endTaskHandler = () => {
    endTask({variables: {id, endTime: new Date().toISOString()}});
  };

  const openUpdatePopup = () => {
    toggleModal({title, tags, id, isUpdate: true});
  };

  return (
    <TouchableOpacity
      onPress={openUpdatePopup}
      style={{
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        width: screenWidth - 32,
        marginBottom: 8,
        backgroundColor: isComplete
          ? 'white'
          : isStarted
          ? 'rgba(0, 255, 0, 0.2)'
          : 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>

          <Tags data={tags} />
        </View>
        {!isComplete && (
          <View style={{height: 80}}>
          <Button
            title={isStarted ? 'End Task' : 'Start Task'}
            onPress={isStarted ? endTaskHandler : startTaskHandler}
            disabled={loading}
          />
          </View>
        )}
      </View>
      {isComplete && (
        <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 8}}>
          Task Completed!
        </Text>
      )}
      {isStarted && (
        <Text style={{fontSize: 16, fontWeight: 'bold', marginVertical: 8}}>
          {timeElapsed}
        </Text>
      )}
    </TouchableOpacity>
  );
};
