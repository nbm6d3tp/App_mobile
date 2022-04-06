import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth,db } from '../firebase'
import { doc,getDoc } from "firebase/firestore";

const ProfileScreen = () => {

    const [dataUser, setDataUser] = useState([])
  
    useEffect(() => {
    async function anyNameFunction() {
      const id = auth.currentUser?.uid
      const docRef = doc(db, "utilisateurs", id);
      const docSnap = await getDoc(docRef);    
      setDataUser(docSnap.data())
    }
    // Execute the created function directly
    anyNameFunction();
  }, []);

    return(
        <View style={styles.container}>
            <View style={styles.infocontainer}>
                <View style={styles.nameavacontainer}>
                    <Image style={styles.avatar} source={require('../assets/profile.jpg')} /> 
                    <Text style={styles.name}>{dataUser.name}</Text>
                </View>
                <View style={styles.publieecontainer}>
                    <Text style={styles.nbpubliee}>{dataUser.recettes}</Text>
                    <Text>Recettes publiées</Text>
                </View>
                <View style={styles.moyennecontainer}>
                    <View style={styles.points}>
                        <Ionicons name="star" size={20} color="white" /*border-color="black" border-width="3px"*/ />
                        <Text>{dataUser.moyenne}</Text>
                    </View>
                    <Text>Moyenne générale</Text>
                </View>
            </View>
            <View style={styles.descriptcontainer}>
                <Text>{dataUser.description}</Text>
            </View>
        </View>
    );

}

export default ProfileScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    infocontainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding: 10,
        paddingTop:50,
    },
    nameavacontainer:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"center",
    },
    name:{
        fontWeight:"bold",
        fontSize:20,
    },
    avatar:{
        width:130, 
        height:130,
        borderRadius: 500 / 2,
        borderWidth: 4,
        borderColor: "#55ecc8",
    },
    publieecontainer:{
        flex:1,
        justifyContent:"center",
        left:40
    },
    nbpubliee:{
        fontSize: 30
    },
    moyennecontainer:{
        flex:1,
        justifyContent:"center",
        left: 30
    },
    points:{
        width: 60,
        height:23,
        backgroundColor: "#d5c700",
        borderRadius: 20 / 3,
        flexDirection:"row"
    },
    descriptcontainer:{
        paddingLeft:15,
        paddingTop:15,

    },
});