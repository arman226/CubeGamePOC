import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

/**
 *
 * @param {totalBets} num it should be subtracted to actual points
 */
const Coins = ({totalBets}) => {
  return (
    <View style={styles.container}>
      {/* coin */}
      <View style={styles.coin}>
        <Text style={styles.dollarSign}>$</Text>
      </View>
      <Text>{totalBets}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  coin: {
    backgroundColor: 'yellow',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 40,
    borderWidth: 1,
    marginRight: 10,
  },
  dollarSign: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Coins;
