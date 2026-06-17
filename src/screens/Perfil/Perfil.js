import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";

function Perfil(props) {
  const [misPosteos, setMisPosteos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let posteos = [];

        docs.forEach((doc) => {
          posteos.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setMisPosteos(posteos);
        setCargando(false);
      });
  }, []);

  const manejarCerrarSesion = () => {
    auth
      .signOut()
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderPosteo = ({ item }) => {
    return (
      <View style={estilos.tarjetaPosteo}>
        <Text style={estilos.descripcionPosteo}>
          {item.data.description}
        </Text>
      </View>
    );
  };

  if (cargando) {
    return (
      <View style={estilos.centrado}>
        <ActivityIndicator size="large" color="#444" />
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.encabezadoPerfil}>
        <Text style={estilos.nombreUsuario}>
          {auth.currentUser.displayName ? auth.currentUser.displayName : "Usuario"}
        </Text>

        <Text style={estilos.email}>
          {auth.currentUser.email}
        </Text>
      </View>

      <Text style={estilos.tituloSeccion}>Mis posteos</Text>

      <FlatList
        data={misPosteos}
        keyExtractor={(item) => item.id}
        renderItem={renderPosteo}
      />

      <Pressable
        style={estilos.botonCerrarSesion}
        onPress={() => manejarCerrarSesion()}
      >
        <Text style={estilos.textoCerrarSesion}>
          Cerrar sesión
        </Text>
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
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  encabezadoPerfil: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  nombreUsuario: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#777",
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },
  tarjetaPosteo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  descripcionPosteo: {
    fontSize: 14,
    color: "#444",
  },
  botonCerrarSesion: {
    backgroundColor: "#e53935",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginVertical: 20,
  },
  textoCerrarSesion: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Perfil;