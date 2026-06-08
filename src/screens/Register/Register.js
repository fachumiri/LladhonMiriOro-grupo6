import React from 'react';
import { useState} from 'react';
import { View, Text, Pressable, StyleSheet, TextInput} from 'react-native';
import { auth, db } from '../../firebase/config';
//falta agregar el remember me 
function Register(props) {
  const [email, setEmail] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [registro, setregistro] = useState(false)
  const [registroError, setregistroError] = useState ("")

function onSubmit(email,username,password){
  if (!email.includes("@")){
      setregistroError("Email mal formateado")
      return
    }
  if (password.length < 6){
      setregistroError("La contraseña debe tener al menos 6 caracteres")
      return
    }
    auth.createUserWithEmailAndPassword(email,password)
    .then(response => {
       db.collection("users").add({
      email: auth.currentUser.email,
      username: username,
      createdAt: Date.now()
    })
      .then(() => {
      setregistro(true)
    })
      .catch(e => console.log(e))
    })
    .catch(error => {
      setregistroError ("Fallo en el registro")
      console.log(error);
      if (error.message == 'The email address is already in use by another account.'){
        setregistroError("El usuario ya existe")
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.field}
            keyboardType='email-adress'
            placeholder='email'
            onChangeText = {text => setEmail(text)}
            value={email}/>
      <TextInput style={styles.field}
            keyboardType='default'
            placeholder='username'
            onChangeText = {text => setUserName(text)}
            value={username}/>
      <TextInput style={styles.field}
            keyboardType='default'
            placeholder='password'
            secureTextEntry= {true}
            onChangeText = {text => setPassword(text)}
            value={password}/>
            {registroError ? <Text>{registroError}</Text> : <Text></Text>}
      <Pressable style={styles.buttonBlue} onPress={() => {onSubmit(email,username,password);}}>
        <Text style={styles.buttonText}>Registrate</Text>
      </Pressable>
      <Pressable style={styles.buttonBlue} onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Ya tengo cuenta</Text>
      </Pressable>
    </View>
  );
   
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 10, marginTop: 20,},
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center"},
  field: {height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  buttonBlue: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745',
  },
  buttonText: {color: '#fff'},
});

export default Register