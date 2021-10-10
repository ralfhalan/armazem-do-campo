import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { theme } from '../global/styles/theme';
import * as ImagePicker from 'react-native-image-picker';



const InputImage = props => {
  const [avatar, setAvatar] = useState();

  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }
    else if (data.errorCode) {
      return;
    }
    else if (data.errorMessage) {
      return;
    }
    else if (!data.uri) { 
      console.log('uri')
      return;
    }
    else if (data.assets) {
      return;
    }
    else{
    console.log('passou pela data')
    setAvatar(data);
    }
  }

  return (
    <View style={styles.container} >
      <TouchableOpacity
        {...props}
        style={[styles.button, props.style]}
        onPress={() => ImagePicker.launchImageLibrary({}, imagePickerCallback)}>
        <Text style={styles.buttonText}> Escolher imagem </Text>
      </TouchableOpacity>
      <View style={{ paddingLeft: 12 }} />
      <Image
        source={{
          uri: avatar 
          ? avatar.uri 
          :  "https://images-americanas.b2w.io/produtos/1368573253/imagens/super-caixa-12-pedras-de-protecao-e-purificacao/1368573309_1_large.jpg"     
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    borderColor: theme.pallete.primary,
    backgroundColor: theme.pallete.primary,
    borderWidth: 1,
    borderRadius: 8,
    width: '76%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 23,
    paddingVertical: 4,
    letterSpacing: 0.5,
    marginTop: 8,
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    color: theme.pallete.white,
    fontSize: 16
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginTop: 20,
  }

});

export default InputImage;
