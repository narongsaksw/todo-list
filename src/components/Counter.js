import React from 'react';
import {View, Button, Text} from 'react-native';
//useSelector: select step, useDispatch select function
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment, incrementByAmount} from '../store/models/counter';
const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <View>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Text>{count}</Text>
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button
        title="IncrementBy4"
        onPress={() => dispatch(incrementByAmount(4))}
      />
    </View>
  );
};
export default Counter;
