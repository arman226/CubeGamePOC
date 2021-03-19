import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const Button = ({
  title,
  onButtonPressed,
  color = 'orange',
  textColor = 'white',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onButtonPressed}
      style={styles.button(color)}>
      <Text style={{color: textColor, fontWeight: 'bold'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: color => ({
    backgroundColor: color,
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    width: Dimensions.get('screen').width * 0.3,
    marginVertical: 20,
    borderColor: 'black',
    borderWidth: 2,
  }),
});

export default Button;
