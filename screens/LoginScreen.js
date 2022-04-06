import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput,TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged ,signInWithEmailAndPassword } from "firebase/auth"
import { useNavigation } from '@react-navigation/core'



const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("Home")
        // ...
      }
    });}
    , []);
    
    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
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
          </View>
          <View
            style={styles.buttonContainer}
          >
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
              >
                  <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>{
                  navigation.navigate("Register")
                }}
                style={[styles.button,styles.buttonOutline]}
              >
                  <Text style={styles.buttonOutlineText}>Register</Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
  )
}

export default LoginScreen

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