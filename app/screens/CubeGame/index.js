import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getRandomInt} from 'utils/number.utils';
import PlaceBetsModal from './PlaceBetsModal';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'];

const CubeGame = () => {
  const [isRolling, setIsRolling] = useState(false);
  const totalNumber = 5;
  const [colorings, setColorings] = useState([0, 0, 0]);
  const [bets, setBets] = useState([0, 0, 0, 0, 0, 0]);
  const [totalBets, setTotalBets] = useState(0);
  const [shouldShowBetsModal, setShouldShowBetsModal] = useState(false);
  const [indexToUpdate, setIndexToUpdate] = useState(0);

  const change = async () => {
    setIsRolling(true);
    setColorings([
      getRandomInt(totalNumber),
      getRandomInt(totalNumber),
      getRandomInt(totalNumber),
    ]);

    await setTimeout(() => {
      setIsRolling(false);
    }, 1000);

    setBets([0, 0, 0, 0, 0, 0]);
  };

  const onAddBet = (index, valueToAdd) => {
    let tempBets = bets;
    tempBets[index] = tempBets[index] + valueToAdd;
    setBets(tempBets);
    setTotalBets(
      bets.reduce(function (a, b) {
        return a + b;
      }, 0),
    );

    hideBetsModal();
  };

  const hideBetsModal = () => {
    setShouldShowBetsModal(false);
  };

  if (isRolling) {
    return <Text>rolling...</Text>;
  }

  return (
    <>
      <PlaceBetsModal
        shouldShowBetsModal={shouldShowBetsModal}
        onHide={hideBetsModal}
        indexToUpdate={indexToUpdate}
        onValueSelected={onAddBet}
      />
      <View style={{padding: 10}}>
        <Text>{totalBets}</Text>
        <FlatList
          numColumns={3}
          data={colorings}
          contentContainerStyle={useStyle.colorsContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}, idx) => (
            <View style={useStyle.colorItem(colors[item])}></View>
          )}
          extraData={colorings}
        />
        <Button title="Roll" onPress={change} />

        {/* Options */}

        <FlatList
          numColumns={3}
          contentContainerStyle={useStyle.colorsContainer}
          extraData={totalBets}
          keyExtractor={(item, index) => index.toString()}
          data={colors}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={useStyle.colorItem(item)}
              activeOpacity={0.8}
              onPress={() => {
                setShouldShowBetsModal(true);
                setIndexToUpdate(index);
              }}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                {bets[index] !== 0 ? bets[index] : null}
              </Text>
            </TouchableOpacity>
          )}
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
    marginHorizontal: 10,
    marginVertical: 10,
    width: 60,
  }),
});

export default CubeGame;
