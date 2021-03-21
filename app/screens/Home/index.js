import Button from 'components/Button';
import {BLUE} from 'constants/colors.constants';
import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

const Home = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const {confirmation} = route.params;

  useEffect(() => {}, []);
  const tryConfirming = async () => {
    try {
      const response = await confirmation.confirm(otp);
      alert(JSON.stringify(response));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="put it here"
        placeholderTextColor={BLUE}
        style={{color: BLUE}}
        onChangeText={text => setOtp(text)}
        value={otp}
      />
      <Button title="send" onButtonPressed={tryConfirming} />
    </View>
  );
};

export default Home;
