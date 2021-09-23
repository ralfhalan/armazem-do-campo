import React from 'react';
import {StyleSheet, Text, Touchable, TouchableOpacity} from 'react-native';
import {theme} from './../global/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonFacebookLogin = props => {
  return (
    <TouchableOpacity>
      <Icon.Button
        name="facebook"
        backgroundColor={theme.pallete.white}
        size={24}
        iconStyle={styles.InButton}
        borderRadius={8}
        style={styles.button}>
        <Text style={styles.textButton}>Facebook</Text>
      </Icon.Button>
    </TouchableOpacity>
  );
};

export default ButtonFacebookLogin;

const styles = StyleSheet.create({
  button: {
    borderColor: theme.pallete.blue,
    borderWidth: 1,
    marginTop: 8,
    marginHorizontal: 8,
    borderRadius: 7,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: theme.pallete.blue,
  },
  InButton: {
    color: theme.pallete.blue,
  },
});