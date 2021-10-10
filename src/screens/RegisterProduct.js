import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../global/styles/theme';
import WhiteArea from '../components/WhiteArea';
import Input from '../components/Input';
import InputImage from '../components/InputImage';
import Picker from 'react-native-universal-picker';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

export default function RegisterProduct({ navigation }) {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [placeOfSale, setPlaceOfSale] = useState();
  const [description, setDescription] = useState();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const db = getDatabase();
  const dbRef = ref(db, 'categories');

  const [formsOfSale, setFormsOfSale] = useState([]);
  const [selectedFormOfSale, setSelectedFormOfSale] = useState();
  const dbRefForm = ref(db, 'formsOfSale');

  const [deliveryDay, setDeliveryDay] = useState([]);
  const [selectedDeliveryDay, setSelectedDeliveryDay] = useState();
  const dbRefDay = ref(db, 'deliveryDay');

  const listCategories = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    });
    setCategories(dataArray);
  };

  const listDeliveryDay = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRefDay, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    });
    setDeliveryDay(dataArray);
  };

  const listFormsOfSale = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRefForm, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    });
    setFormsOfSale(dataArray);
  };

  useEffect(() => {
    listCategories();
    listDeliveryDay();
    listFormsOfSale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const writeProductData = () => {
    const db = getDatabase();
    const productRef = ref(db, 'products');
    const newProductRef = push(productRef);
    set(newProductRef, {
      name: productName,
      price: price,
      placeOfSale: placeOfSale,
      description: description,
      category: selectedCategory,
      formOfSale: selectedFormOfSale,
      deliveryDay: selectedDeliveryDay,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Icon
          name="plus-circle"
          size={26}
          color={theme.pallete.textTitleScreen}
        />
        <Text style={styles.addProduct}>Cadastrar produto</Text>
      </View>
      <WhiteArea>
        <InputImage
          style={{ marginTop: 44 }}
        />
        
        <Input
          placeholder="Nome do produto"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setProductName(text)}
          value={productName}
          keyboardType="default"
          style={{ marginTop: 12 }}
        />
        <Input
          placeholder="Preço"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPrice(text)}
          value={price}
          keyboardType="numeric"
          style={{ marginTop: 16 }}
        />
        <Input
          placeholder="Local de venda"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPlaceOfSale(text)}
          value={placeOfSale}
          keyboardType="default"
          style={{ marginTop: 16 }}
        />
        <Input
          placeholder="Descrição"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setDescription(text)}
          value={description}
          keyboardType="default"
          style={styles.inputDescription}
        />

        <Text style={styles.titlePicker}>Categoria</Text>
        <View style={styles.select}>
          <Picker
            style={styles.txtPicker}
            selectedValue={selectedCategory}
            onValueChange={(itemValue, item) => setSelectedCategory(itemValue)}>
            {categories.map(category => {
              return (
                <Picker.Item
                  label={category.description.toLowerCase()}
                  value={category.description}
                />
              );
            })}
          </Picker>
        </View>

        <Text style={styles.titlePicker}>Forma de venda</Text>
        <View style={styles.select}>
          <Picker
            style={styles.txtPicker}
            selectedValue={selectedFormOfSale}
            onValueChange={(itemValue, item) => setSelectedFormOfSale(itemValue)
            }>
            {formsOfSale.map(forms => {
              return (
                <Picker.Item
                  label={forms.description.toLowerCase()}
                  value={forms.description}
                />
              );
            })}
          </Picker>
        </View>

        <Text style={styles.titlePicker}>Dia de entrega</Text>
        <View style={styles.select}>
          <Picker
            style={styles.txtPicker}
            selectedValue={selectedDeliveryDay}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDeliveryDay(itemValue)
            }>
            {deliveryDay.map(delivery => {
              return (
                <Picker.Item
                  label={delivery.description.toLowerCase()}
                  value={delivery.description}
                />
              );
            })}
          </Picker>
        </View>

        <View style={{ marginTop: 24 }} />
        <ButtonPrimary onPress={() => writeProductData()}>
          CADASTRAR
        </ButtonPrimary>
        <ButtonSecondary onPress={() => {}}>CANCELAR</ButtonSecondary>
      </WhiteArea>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addProduct: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    color: theme.pallete.white,
    marginVertical: 24,
    paddingHorizontal: 10,
  },
  inputDescription: {
    paddingVertical: 36,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  titlePicker: {
    marginTop: 5,
    marginBottom: 2,
    color: theme.pallete.primary,
    fontSize: 16,
  },
  select: {
    borderColor: theme.pallete.primary,
    borderWidth: 1,
    borderRadius: 8,
    height: 32,
    width: '100%',
    paddingHorizontal: 12,
  },
  txtPicker: {
    borderEndColor: theme.pallete.primary,
    height: '100%',
    width: '100%',
    color: theme.pallete.black,
  },
});
