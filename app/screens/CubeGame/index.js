import React, {useState} from 'react';
import {Text, View, Button, FlatList, Dimensions} from 'react-native';
import {getRandomInt} from 'utils/number.utils';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'];

const CubeGame = () => {
  const [color1, setColor1] = useState(0);
  const [color2, setColor2] = useState(0);
  const [color3, setColor3] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const totalNumber = 5;
  const [colorings, setColorings] = useState([0, 0, 0]);

  const change = () => {
    console.log('hel');
    setIsRolling(true);
    setColor1(getRandomInt(totalNumber));
    setColor2(getRandomInt(totalNumber));
    setColor3(getRandomInt(totalNumber));

    setColorings([
      getRandomInt(totalNumber),
      getRandomInt(totalNumber),
      getRandomInt(totalNumber),
    ]);

    setIsRolling(false);
  };
  return (
    <View>
      <FlatList
        numColumns={3}
        data={colorings}
        contentContainerStyle={{
          justifyContent: 'center',
          width: Dimensions.get('screen').width,
          alignItems: 'center',
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: colors[item],
              padding: 10,
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          />
        )}
        extraData={colorings}
      />
      <Button title="Test" onPress={change} />
    </View>
  );
};

export default CubeGame;
