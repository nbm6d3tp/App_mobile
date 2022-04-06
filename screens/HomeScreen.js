import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect}  from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Image,ScrollView} from 'react-native'
import { auth,db } from '../firebase'
import { doc,getDoc,getDocs,collection } from "firebase/firestore";
import { signOut } from "firebase/auth"
import { Ionicons } from '@expo/vector-icons';

 
const HomeScreen = () => {
  const [dataUser, setDataUser] = useState([])
  const [dataAnnonce, setDataAnnonce] = useState([])


  useEffect(() => {
  async function anyNameFunction() {
    const id = auth.currentUser?.uid
    const docRef = doc(db, "utilisateurs", id);
    const docSnap = await getDoc(docRef);    
    setDataUser(docSnap.data())

    const querySnapshot = await getDocs(collection(db, "annonces"));
    let tmp=[];
    querySnapshot.forEach((item,index)=>{
      tmp.push(item.data())
    })
    setDataAnnonce(tmp)
  }
  // Execute the created function directly
  anyNameFunction();
}, []);

  const navigation = useNavigation()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((error) => {
      alert(error.message)
        });
  }
  let itemList=[];
  dataAnnonce.forEach((item,index)=>{
    itemList.push(<Annonce key={index} name={item.name} prix={item.prix} points={item.points} description={item.description} />)
  })

  return (
    <ScrollView>
      <View style={styles.services}>
        <TouchableOpacity
          onPress={() =>{
            navigation.navigate("Profile")
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    <Text style={styles.hello}>Hello {dataUser['name']}!</Text>
     <View style={styles.annonces}>
      {itemList}
    </View> 
    
    </ScrollView>
  )
}

const Annonce = (props) => {
  return (
    <View style={styles.annoncecontainer}>
      <View style={styles.imageinfocontainer}>
      <Image style={styles.image} source={require('../assets/Jordan.jpg')} /> 
        <View style={styles.infos}>
          <Text style={styles.prix}>{props.prix}$</Text>
          <View style={styles.points}>
            <Ionicons name="star" size={20} color="white" /*border-color="black" border-width="3px"*/ />
            <Text>{props.points}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={()=>{
          alert("Added in your favorite list")
       }}>
        <Text style={styles.name}>{props.name}</Text>
      </TouchableOpacity>
        <Text style={styles.description}>{props.description}</Text>
      </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  services: {
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:60
  },
  hello:{
    fontSize:25,
    fontWeight:"bold",
    paddingTop:30,
    paddingBottom:30
  },
   button: {
    backgroundColor: '#0782F9',
    width: '40%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  annonces:{
    
  },
  annoncecontainer:{
    
  },
  imageinfocontainer:{
    flexDirection:"row",
  },
  image:{
    width:250, 
    height:200,
  },
  infos:{
    paddingLeft:15,
    justifyContent:"space-around"
  },
  name:{
    fontSize:18,
    fontWeight:"bold"
  },
  prix:{
    fontSize:30
  },
  points:{
    width: 60,
        height:23,
        backgroundColor: "#d5c700",
        borderRadius: 20 / 3,
        flexDirection:"row"
  },
  description:{
    fontStyle:"italic" 
  },
})