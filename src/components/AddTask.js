import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {screenWidth} from '../utils';
import {Tag} from './Task';

import {useMutation} from '@apollo/client';
import {CREATE_TASK_ADD_TAGS, updateTask} from '../network/mutations';

const renderTags = (tags = []) =>
  tags.map((item) => (
    <Tag name={item} style={{marginRight: 8, marginLeft: 0}} />
  ));

export default ({closeModal = () => {}, popUpData = {}}) => {
  const [createTask, {loading}] = useMutation(CREATE_TASK_ADD_TAGS);
  const [updateTitle, {loading: updatingTitle}] = useMutation(
    updateTask('{title: $title}'),
  );

  const {isUpdate, title: titleUpdate, tags: tagsUpdate, id = 0} = popUpData;

  const [title, setTitle] = useState(isUpdate ? titleUpdate : '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(
    isUpdate ? tagsUpdate.map(({name}) => name) : [],
  );

  const submitHandler = () => {
    const _tags = tags.map((tag) => ({tag: {data: {name: tag}}}));
    createTask({variables: {title, tags: _tags}})
      .then(() => {
        closeModal({shouldRefetch: true});
        Alert.alert('Task created successfully');
      })
      .catch((e) => alert('Unable to create the task.(' + e + ')'));
  };

  const updateHandler = () => {
    updateTitle({variables: {title, id}});
  };

  const handleKeyPress = ({nativeEvent: {key}}) => {
    if (key === ' ' && tagInput === '') return;

    if (key === ' ') {
      setTags((prevVal = []) => [...prevVal, tagInput]);
      setTagInput('');
      return;
    }

    if (key === 'Backspace' && tagInput !== '')
      return setTagInput((prev) => prev.slice(0, -1));

    if (key === 'Backspace' && tags.length > 0) {
      setTags((prevVal) => {
        setTagInput(prevVal.pop());
        return [...prevVal];
      });
      return;
    }

    if (key !== 'Backspace') {
      setTagInput((prev) => prev + key);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={closeModal}
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        position: 'absolute',
      }}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'flex-end',
        }}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={-300}
            style={{
              width: screenWidth,
              alignSelf: 'flex-end',
              padding: 24,
              backgroundColor: 'white',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingBottom: 32,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {isUpdate ? 'Update Task' : 'Create a Task'}
            </Text>
            <TextInput
              style={{marginTop: 32}}
              value={title}
              onChangeText={setTitle}
              placeholder="Task title"
              multiline
            />
            <View
              style={{flexDirection: 'row', marginTop: 16, flexWrap: 'wrap'}}>
              {renderTags(tags)}
              <TextInput
                style={{width: screenWidth * 0.3}}
                placeholder="tags"
                value={tagInput}
                autoCompleteType="name"
                onKeyPress={handleKeyPress}
              />
            </View>
            <View style={{marginTop: 32, marginBottom: 16}}>
              {loading || updatingTitle ? (
                <ActivityIndicator />
              ) : (
                <Button
                  title={isUpdate ? 'Update Task' : 'Create Task'}
                  disabled={title === ''}
                  onPress={isUpdate ? updateHandler : submitHandler}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
