import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";

function Perfil({ navigation }) {
  const [misPosteos, setMisPosteos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const usuarioActual = auth.currentUser;

  useEffect(() => {
    const cancelarSuscripcion = db
      .collection("posts")
      .where("email", "==", usuarioActual.email)
      .onSnapshot((snapshot) => {
        const listaPosteos = [];
        snapshot.forEach((documento) => {
          listaPosteos.push({ id: documento.id, ...documento.data() });
        });
        setMisPosteos(listaPosteos);
        setCargando(false);
      });

    return () => cancelarSuscripcion();
  }, []);

  const manejarCerrarSesion = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderPosteo = ({ item }) => {
    return (
      <View style={estilos.tarjetaPosteo}>
        <Text style={estilos.descripcionPosteo}>{item.description}</Text>
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
          {usuarioActual.displayName || "Usuario"}
        </Text>
        <Text style={estilos.email}>{usuarioActual.email}</Text>
      </View>

      <Text style={estilos.tituloSeccion}>Mis posteos</Text>

      <FlatList
        data={misPosteos}
        keyExtractor={(item) => item.id}
        renderItem={renderPosteo}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>Todavía no publicaste nada.</Text>
        }
      />

      <Pressable style={estilos.botonCerrarSesion} onPress={manejarCerrarSesion}>
        <Text style={estilos.textoCerrarSesion}>Cerrar sesión</Text>
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
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
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
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  descripcionPosteo: {
    fontSize: 14,
    color: "#444",
  },
  textoVacio: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
    fontSize: 14,
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