import { useState } from "react";
import { Pressable, TextInput, View, Text, StyleSheet } from "react-native";
import { auth, db } from "../../firebase/config";

export default function CrearPosteo({ navigation }) {
  const [description, setDescription] = useState("");

  function onSubmit() {
    db.collection("posts")
      .add({
        description: description,
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        likes: [],
      })
      .then(() => {
        setDescription("");
        navigation.navigate("Home");
      })
      .catch((e) => console.log(e));
  }

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.tituloSeccion}>Crear Posteo</Text>

      <TextInput
        style={estilos.input}
        placeholder="Escribí tu posteo..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Pressable style={estilos.boton} onPress={onSubmit}>
        <Text style={estilos.textoBoton}>Publicar</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: "#444",
    textAlignVertical: "top",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  boton: {
    backgroundColor: "#444",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});