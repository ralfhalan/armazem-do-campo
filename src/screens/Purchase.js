import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, LogBox } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {getDatabase, ref, onValue, set} from 'firebase/database';
import {SpeedDial} from 'react-native-elements';

import {theme} from '../global/styles/theme';
import firebase from '../config/firebase';
import MySearchBar from '../components/MySearchBar';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';
import CategoryLabel from '../components/CategoryLabel';
import ProductCard from '../components/ProductCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import ProfilePhoto from '../components/ProfilePhoto';
import SmallButton from '../components/SmallButton';
import TextGray from '../components/GrayText';
import ButtonPurchase from '../components/ButtonPurchase'
import GrayText from '../components/GrayText';
import { useIsFocused } from '@react-navigation/native';
import ButtonPrimary from '../components/ButtonPrimary';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function Purchase({navigation, route}) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('todos');
  const [products, setProducts] = useState();
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [totalRequests,setTotalRequests] = useState(0)
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const isFocused = useIsFocused();
  const db = getDatabase();

  const searchUser = async () => {
    let data = {};
    const dbRef = ref(db, 'users/' + route.params.id);
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        const {photo, name, email, address, phone, presentation} = snapshot.val();
        data = {
          id: snapshot.key,
          photo: photo,
          name: name,
          email: email,
          address: address,
          phone: phone,
          presentation: presentation,
        };
        resolve();
        setUser(data);
      });
    });
  };

  const listCategories = async () => {
    const dbRef = ref(db, 'categories');
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

  const countRequestProdutcs = async () => {
  const dbRef = ref(db, 'purchase/' + route.params.id); 
  var counts = 0;
  await new Promise(resolve => {
  onValue(dbRef, (snapshot) => {
    snapshot.forEach(snap => {
      counts += snap.val().countRequest;
    });
    resolve()
  });
    setTotalRequests(counts)
});
}
  const listProducts = async () => {
    setLoading(true);
    setRefresh(true);
    setProducts();
    const dbRef = ref(db, 'products');
    await new Promise(resolve => {
      let dataArray = [];
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
        setProducts(dataArray);
      });
    });
    setLoading(false);  
  };
  
  useEffect(() => {
    listCategories();
    searchUser();
    listProducts(); 
    countRequestProdutcs()      
    setOpen(false)    
  }, [isFocused]);


   useEffect(()=>{
    countRequestProdutcs() 
   },[totalRequests])  
  return (
    <>
      <TopScreen>
        <View style={styles.welcomeContainer}>
          <View>
            <TitleScreen textAlign="center">Olá, {user.name}</TitleScreen>
            <View style={{marginTop: 8}}>
              <View style={styles.dateArea}>
                <Text style={styles.welcomeSubtitle}>
                  Fechamento da compra:
                </Text>
                <Text
                  style={[
                    styles.welcomeSubtitle,
                    {
                      fontFamily: 'Roboto-Bold',
                      color: theme.pallete.primary007,
                    },
                  ]}>
                  {' '}
                  18/12
                </Text>
              </View>
              <View style={styles.dateArea}>
                <Text style={styles.welcomeSubtitle}>Entrega:</Text>
                <Text
                  style={[
                    styles.welcomeSubtitle,
                    {
                      fontFamily: 'Roboto-Bold',
                      color: theme.pallete.primary007,
                    },
                  ]}>
                  {' '}
                  22/12
                </Text>
              </View>
            </View>
          </View>
          <ProfilePhoto photo={`data:image/gif;base64,${user.photo}`} 
            onPress={() => { navigation.navigate('EditUser', { id: route.params.id });}}/>
          </View>
        {/* <SmallButton name="ir para cesta"/> */}
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <HighlightedText>Categorias</HighlightedText>
        <View style={{marginBottom: 10}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            renderItem={({item}) => {
              return (
                <CategoryLabel
                  description={item.description}
                  onPress={() => {
                    setSelected(item.description.toLowerCase());
                  }}
                  color={
                    item.description === selected
                      ? theme.pallete.primary004
                      : theme.pallete.black
                  }
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
       {/*  <HighlightedText>Produtos: {"\n"} ({selected})</HighlightedText> */} 
        <View style={{flex: 1, alignItems: 'center',marginBottom:15}}>
          {!loading ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={products}
              extraData={products}
              keyExtractor={item => {
                return item.id;
              }}
              refreshing={true}
              renderItem={({item}) => {
                return (
                  <>
                    {selected === item.category || selected === 'todos' ? (
                      
                      <Text>
                        {' '}  
                        <ProductCard
                          name={item.name}
                          price={item.price}
                          image={item.mainImage}
                          description={item.description}
                          formOfSale={item.formsOfSale.toLowerCase()}
                          placeOfSale={item.placeOfSale}
                          amount={item.amount}
                          userId={route.params.id}
                          id={item.id}
                        />{' '}
                      </Text>
                      
                    ) : (
                      <GrayText>Não há produtos nessa categoria</GrayText>
                    )}
                  </>
                );
                
              }}
/*               keyExtractor={item  => {item.id}}  */
            />
          ) : (
            <ActivityIndicator size={48} />
          )}
          
        </View>
     
      <View style={styles.Final}>
         <ButtonPurchase onPress={()=> 
              navigation.navigate('Basket', {
               id: route.params.id,
             })}>
         <View style={styles.contentButton}>
         <Text style={styles.fontButton}>IR PARA A CESTA</Text>
        </View>
       </ButtonPurchase>
     </View>
      </WhiteAreaWithoutScrollView>
 
    </>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: theme.pallete.textTitleScreen,
    letterSpacing: 0.4,
    fontFamily: 'Roboto-Regular',
  },
  dateArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Final:{
   width:'100%',
  },
  contentButton:{
    display:'flex',flexDirection:'row',justifyContent:'space-between'
  },
  fontButton:{
    fontSize:18,
    color:theme.pallete.white,
    fontWeight:'bold',
    marginRight:10
  },
  icon:{
    marginRight:10
  },
  request:{
    fontSize:18,
    color:theme.pallete.white,
    fontWeight:'bold'
  }
});
