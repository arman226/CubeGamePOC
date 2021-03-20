import React from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const values = [0, 10, 20, 50, 100, 300, 500];

const PlaceBetsModal = ({
  shouldShowBetsModal = false,
  onHide,
  onValueSelected,
  indexToUpdate,
}) => {
  const placeBet = value => () => {
    onValueSelected(indexToUpdate, value);
  };
  return (
    <Modal
      animationType="fade"
      transparent
      visible={shouldShowBetsModal}
      onRequestClose={() => {}}>
      <TouchableOpacity style={styles.modalContainer} onPress={onHide}>
        <TouchableOpacity style={styles.optionsContainer} activeOpacity={1}>
          <FlatList
            data={values}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={4}
            contentContainerStyle={styles.optionslist}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.optionItem}
                activeOpacity={0.8}
                onPress={placeBet(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={onHide}>
            <Text>Hide</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFF',
    maxHeight: Dimensions.get('screen').height * 0.35,
    width: Dimensions.get('screen').width * 0.9,
    borderRadius: 20,
    padding: 20,
    borderColor: 'red',
    borderWidth: 1,
  },
  optionslist: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionItem: {
    backgroundColor: 'blue',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    margin: 10,
    height: 48,
    width: 48,
    borderWidth: 2,
  },
  itemText: {
    color: 'white',
    fontSize: 15,
  },
});

export default PlaceBetsModal;
