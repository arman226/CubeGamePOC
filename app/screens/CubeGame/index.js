import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {getArraySum, getRandomInt} from 'utils/number.utils';
import PlaceBetsModal from './PlaceBetsModal';
import Button from 'components/Button';
import Coins from 'components/Coins';
import {
  BLUE,
  GREEN,
  INDIGO,
  PINK,
  RED,
  YELLOW,
} from 'constants/colors.constants';
import test from 'assets/color-roll.gif';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

const colors = [RED, PINK, YELLOW, GREEN, BLUE, INDIGO];
const TOTAL_NUMBER_OF_COLORS = 5;

const CubeGame = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [colorings, setColorings] = useState([0, 0, 0]);
  const [bets, setBets] = useState([0, 0, 0, 0, 0, 0]);
  const [totalBets, setTotalBets] = useState(0);
  const [shouldShowBetsModal, setShouldShowBetsModal] = useState(false);
  const [indexToUpdate, setIndexToUpdate] = useState(0);
  const [poinstEarned, setPointsEarned] = useState(0);
  const [confirm, setConfirm] = useState(null);
  const [otp, setOtp] = useState('');

  const change = async () => {
    setIsRolling(true);
    //assigning set of colors
    const numb1 = await getRandomInt(TOTAL_NUMBER_OF_COLORS);
    const numb2 = await getRandomInt(TOTAL_NUMBER_OF_COLORS);
    const numb3 = await getRandomInt(TOTAL_NUMBER_OF_COLORS);
    const result = [numb1, numb2, numb3];
    setColorings(result);

    await setTimeout(() => {
      setIsRolling(false);
    }, 1000);

    const totalEarnedPoints =
      bets[result[1]] + bets[result[2]] + bets[result[0]];
    await setPointsEarned(totalEarnedPoints);
    setBets([0, 0, 0, 0, 0, 0]);
    setTotalBets(0);
  };

  const onAddBet = (index, valueToAdd) => {
    let tempBets = bets;
    tempBets[index] = tempBets[index] + valueToAdd;
    setBets(tempBets);
    setTotalBets(getArraySum(bets));
    hideBetsModal();
  };

  const hideBetsModal = () => {
    setShouldShowBetsModal(false);
  };

  const onOptionSelected = index => () => {
    setShouldShowBetsModal(true);
    setIndexToUpdate(index);
  };

  const renderSetOfColorCubes = ({item}) => {
    return <View style={useStyle.colorItem(colors[item])}></View>;
  };

  const renderColorOptions = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={useStyle.colorItem(item)}
      activeOpacity={0.8}
      onPress={onOptionSelected(index)}>
      <Text style={useStyle.optionText}>
        {bets[index] !== 0 ? bets[index] : null}
      </Text>
    </TouchableOpacity>
  );

  const trySending = async () => {
    try {
      console.log('wait...');
      const confirmation = await auth().signInWithPhoneNumber('+639291960514');
      setConfirm(confirmation);
    } catch (e) {
      console.log(e);
    }
  };

  const tryConfirming = async () => {
    try {
      const response = await confirm.confirm(otp);
      alert(JSON.stringify(response));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // return () => {
    //   auth().onAuthStateChanged(user => {
    //     if (user) {
    //       console.log('user', user);
    //     } else {
    //       setConfirm(null);
    //       setOtp('');
    //     }
    //   });
    // };
  }, []);
  if (isRolling) {
    return (
      <Image
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height * 0.8,
          resizeMode: 'stretch',
        }}
        source={test}
      />
    );
  }

  return (
    <>
      <PlaceBetsModal
        shouldShowBetsModal={shouldShowBetsModal}
        onHide={hideBetsModal}
        indexToUpdate={indexToUpdate}
        onValueSelected={onAddBet}
      />

      <View style={{padding: 10, justifyContent: 'center'}}>
        <Coins totalBets={totalBets} />
        <TextInput
          placeholder="put it here"
          onChangeText={text => setOtp(text)}
          value={otp}
        />
        <Button title="sendOTP" onButtonPressed={trySending} />
        <Button title="confirm" onButtonPressed={tryConfirming} />

        {/* Set Of Colors */}
        <FlatList
          numColumns={3}
          data={colorings}
          contentContainerStyle={useStyle.colorsContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderSetOfColorCubes}
          extraData={colorings}
        />

        <Button title="ROLL" onButtonPressed={change} />

        {/* Options */}
        <FlatList
          numColumns={3}
          contentContainerStyle={useStyle.colorsContainer}
          extraData={totalBets}
          keyExtractor={(item, index) => index.toString()}
          data={colors}
          renderItem={renderColorOptions}
        />
      </View>
    </>
  );
};

const useStyle = StyleSheet.create({
  colorsContainer: {
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  colorItem: color => ({
    backgroundColor: color,
    padding: 10,
    marginHorizontal: 3,
    marginVertical: 3,
    width: 60,
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  }),
  optionText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CubeGame;
