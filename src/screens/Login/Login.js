import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet,TextInput} from 'react-native';
import { auth } from '../../firebase/config';

function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setlogin] = useState(false)
  const [loginError, setloginError] = useState ("")

useEffect(
    () => {
        auth.onAuthStateChanged(
          user => {
                if (user) {
                    props.navigation.navigate('HomeMenu')
      }
    })
  }, []
)

function onSubmit(email,password){
    if (!email.includes("@")){
      setloginError ("Email mal formateado")
      return
    }
      if (password.length < 6){
      setloginError("La password tiene que tener una longitud minima de 6 caracteres")
        return
      } 
    auth.signInWithEmailAndPassword(email,password)
    .then((response) => {
      setlogin(true)
      props.navigation.navigate('HomeMenu')
      })
    .catch (error =>{
      setloginError("Crendeniales invalidas")
      console.log(error);
    })
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.field}
                  keyboardType='email-address'
                  placeholder='email'
                  onChangeText = {text => setEmail(text)}
                  value={email}/>
            <TextInput style={styles.field}
                  keyboardType='default'
                  placeholder='password'
                  secureTextEntry= {true}
                  onChangeText = {text => setPassword(text)}
                  value={password}/>
      {loginError ? <Text>{loginError}</Text> : <Text></Text>}
      <Pressable style={styles.buttonOrange} onPress={() => {onSubmit(email,password)}}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
      <Pressable style={styles.buttonBlue} onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.buttonText}>No tengo cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  field: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  buttonBlue: {
    backgroundColor: '#4db8e8',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4db8e8',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonOrange: {
    backgroundColor: '#f5a623',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f5a623',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default Login