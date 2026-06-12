import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";

function ComentarPosteo({ route }) {
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState("");
  const [cargando, setCargando] = useState(true);

  const { postId } = route.params;
  const usuarioActual = auth.currentUser;

  useEffect(() => {
    const cancelarSuscripcion = db
      .collection("posts")
      .doc(postId)
      .collection("comentarios")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const listaComentarios = [];
        snapshot.forEach((documento) => {
          listaComentarios.push({ id: documento.id, ...documento.data() });
        });
        setComentarios(listaComentarios);
        setCargando(false);
      });

    return () => cancelarSuscripcion();
  }, []);

  function onSubmit() {
    if (!comentario.trim()) return;

    db.collection("posts")
      .doc(postId)
      .collection("comentarios")
      .add({
        owner: usuarioActual.email,
        comment: comentario,
        createdAt: Date.now(),
      })
      .then(() => {
        setComentario("");
      })
      .catch((e) => console.log(e));
  }

  const renderComentario = ({ item }) => {
    return (
      <View style={estilos.tarjetaComentario}>
        <Text style={estilos.ownerComentario}>{item.owner}</Text>
        <Text style={estilos.textoComentario}>{item.comment}</Text>
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
      <Text style={estilos.tituloSeccion}>Comentarios</Text>

      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id}
        renderItem={renderComentario}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>Todavía no hay comentarios.</Text>
        }
      />

      <View style={estilos.filaInput}>
        <TextInput
          style={estilos.input}
          placeholder="Escribí un comentario..."
          value={comentario}
          onChangeText={setComentario}
        />
        <Pressable style={estilos.boton} onPress={onSubmit}>
          <Text style={estilos.textoBoton}>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: "#f5f5f5", paddingHorizontal: 16, paddingTop: 20 },
  centrado: { flex: 1, justifyContent: "center", alignItems: "center" },
  tituloSeccion: { fontSize: 16, fontWeight: "bold", color: "#444", marginBottom: 10 },
  tarjetaComentario: { backgroundColor: "#fff", borderRadius: 10, padding: 14, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
  ownerComentario: { fontWeight: "bold", fontSize: 13, color: "#333", marginBottom: 4 },
  textoComentario: { fontSize: 14, color: "#444" },
  textoVacio: { textAlign: "center", marginTop: 20, color: "#999", fontSize: 14 },
  filaInput: { flexDirection: "row", alignItems: "center", marginVertical: 16, gap: 10 },
  input: { flex: 1, backgroundColor: "#fff", borderRadius: 10, padding: 12, fontSize: 14, color: "#444", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
  boton: { backgroundColor: "#444", padding: 12, borderRadius: 8, alignItems: "center" },
  textoBoton: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});

export default ComentarPosteo;