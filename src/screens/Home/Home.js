import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { db, auth } from "../../firebase/config";
import firebase from "firebase";

function Home(props) {
  const [posteos, setPosteos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let listaPosteos = [];

        docs.forEach((doc) => {
          listaPosteos.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setPosteos(listaPosteos);
        setCargando(false);
      });
  }, []);

  const manejarLike = (posteo) => {
    const yaLikeado =
      posteo.data.likes &&
      posteo.data.likes.filter(like => like === auth.currentUser.email).length > 0;

    if (yaLikeado) {
      db.collection("posts")
        .doc(posteo.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(
            auth.currentUser.email
          ),
        });
    } else {
      db.collection("posts")
        .doc(posteo.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(
            auth.currentUser.email
          ),
        });
    }
  };

  const renderPosteo = ({ item }) => {
    const yaLikeado =
      item.data.likes && item.data.likes.filter(like => like === auth.currentUser.email).length > 0;

    const cantidadLikes = item.data.likes ? item.data.likes.length: 0;

    return (
      <View style={estilos.tarjetaPosteo}>
        <Text style={estilos.usuarioPosteo}>
          {item.data.owner}
        </Text>

        {item.data.image ? (
          <Image
            source={{ uri: item.data.image }}
            style={estilos.imagenPosteo}
          />
        ) : null}

        <Text style={estilos.descripcionPosteo}>
          {item.data.description}
        </Text>

        <View style={estilos.filaAcciones}>
          <Pressable onPress={() => manejarLike(item)}>
            <Text
              style={
                yaLikeado
                  ? estilos.textoLikeado
                  : estilos.textoLike
              }
            >
              Me gusta ({cantidadLikes})
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              props.navigation.navigate(
                "Comentar posteo",
                { postId: item.id }
              )
            }
          >
            <Text style={estilos.textocomentar}>
              Comentar
            </Text>
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
});

export default Home;