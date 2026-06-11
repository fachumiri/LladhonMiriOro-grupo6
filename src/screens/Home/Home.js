import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";
import firebase from "firebase";

function Home({ navigation }) {
  const [posteos, setPosteos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const usuarioActual = auth.cwurrentUser;

  useEffect(() => {
    const cancelarSuscripcion = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const listaPosteos = [];
        snapshot.forEach((documento) => {
          listaPosteos.push({ id: documento.id, ...documento.data() });
        });
        setPosteos(listaPosteos);
        setCargando(false);
      });

    return () => cancelarSuscripcion();
  }, []);

  const manejarLike = (posteo) => {
    const yaLikeado = posteo.likes && posteo.likes.includes(usuarioActual.email);

    if (yaLikeado) {
      db.collection("posts").doc(posteo.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(usuarioActual.email),
      });
    } else {
      db.collection("posts").doc(posteo.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(usuarioActual.email),
      });
    }
  };

  const renderPosteo = ({ item }) => {
    const yaLikeado = item.likes && item.likes.includes(usuarioActual.email);
    const cantidadLikes = item.likes ? item.likes.length : 0;

    return (
      <View style={estilos.tarjetaPosteo}>
        <Text style={estilos.usuarioPosteo}>{item.username || item.email}</Text>

        {item.image ? (
          <Image source={{ uri: item.image }} style={estilos.imagenPosteo} />
        ) : null}

        <Text style={estilos.descripcionPosteo}>{item.description}</Text>

        <View style={estilos.filaAcciones}>
          <Pressable onPress={() => manejarLike(item)}>
            <Text style={yaLikeado ? estilos.textoLikeado : estilos.textoLike}>
              Me gusta ({cantidadLikes})
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate("Comentar posteo", { postId: item.id })
            }
          >
            <Text style={estilos.textocomentar}>Comentar</Text>
          </Pressable>
        </View>
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
      <FlatList
        data={posteos}
        keyExtractor={(item) => item.id}
        renderItem={renderPosteo}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>No hay posteos todavía.</Text>
        }
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centrado: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tarjetaPosteo: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  usuarioPosteo: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  imagenPosteo: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  descripcionPosteo: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  filaAcciones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textoLike: {
    color: "#555",
    fontSize: 14,
  },
  textoLikeado: {
    color: "#e53935",
    fontWeight: "bold",
    fontSize: 14,
  },
  textocomentar: {
    color: "#555",
    fontSize: 14,
  },
  textoVacio: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 15,
  },
});

export default Home;