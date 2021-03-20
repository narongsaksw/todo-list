import React from 'react';
import {View, Text} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {useDispatch} from 'react-redux';
import {setIsAuth} from '../store/models/user';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
      <LoginButton
        onLoginFinished={(error, result) => {
          console.log('result', result);
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
              dispatch(setIsAuth(true));
            });
          }
        }}
        onLogoutFinished={() => {
          console.log('logout.');
          dispatch(setIsAuth(true));
        }}
      />
    </View>
  );
};

export default Home;
