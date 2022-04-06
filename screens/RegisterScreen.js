import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput,TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import { auth ,db} from '../firebase'
import { createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth"
import { setDoc,doc } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/core'
import { async } from '@firebase/util';



const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [name, setName] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        navigation.replace("Home")
        // ...
      } else {
        // User is signed out
        // ...
      }
    });}
    , []);

  const handleSignUp =() => {
    if(password!=confirmpassword){
      alert("Wrong password!");
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db,"utilisateurs",user.uid), {
          description:null,
          moyenne: null,
          name:name,
          recettes:null 
        });
  
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
    }
    }

  return (
      <KeyboardAvoidingView
        style={styles.container}
      >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text =>setEmail(text)}
              style={styles.input}
            ></TextInput>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text =>setPassword(text)}
              style={styles.input}
              secureTextEntry
            ></TextInput>
            <TextInput
              placeholder="Confirm password"
              value={confirmpassword}
              onChangeText={text =>setConfirmpassword(text)}
              style={styles.input}
              secureTextEntry
            ></TextInput>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={text =>setName(text)}
              style={styles.input}
            ></TextInput>
          </View>
          <View
            style={styles.buttonContainer}
          >
              <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button,styles.buttonOutline]}
              >
                  <Text style={styles.buttonOutlineText}>Register</Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})