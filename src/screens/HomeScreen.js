import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import analytics from '@react-native-firebase/analytics';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const taskCollection = firestore().collection('Tasks');
const Home = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  useEffect(() => {
    const subscriber = taskCollection.onSnapshot(querySnapshot => {
      const tempList = [];
      querySnapshot.forEach(documentSnapshot => {
        tempList.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setList(tempList);
    });
    return () => subscriber();
  }, []);
  const addTask = () => {
    taskCollection.add({
      title: input,
      isCompleted: false,
    });
    setInput('');
  };

  const updateTask = payload => {
    taskCollection.doc(payload.id).update({
      isCompleted: !payload.isCompleted,
    });
  };

  const completedTasks = list.filter(item => item.isCompleted);
  const incompletedTasks = list.filter(item => !item.isCompleted);

  const history = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button
        title="Go to Detail"
        onPress={async () => {
          history.navigate('Detail');
          await analytics().logEvent('toDetail');
        }}
      />
      <Text>Todo List</Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        style={{borderColor: '#d0d0d0', borderWidth: 1, marginBottom: 10}}
      />
      <Button title="Add" onPress={addTask} />
      <Text>All</Text>
      <View>
        {list.map(item => (
          <View key={item.id}>
            <Text>{item.title}</Text>
          </View>
        ))}
      </View>
      <Text>Completed: {completedTasks.length}</Text>
      {completedTasks.map(item => (
        <TouchableOpacity onPress={() => updateTask(item)}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      ))}
      <Text>InCompleted: {incompletedTasks.length}</Text>
      {incompletedTasks.map(item => (
        <TouchableOpacity onPress={() => updateTask(item)}>
          <Text>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Home;
