import { Text, TouchableOpacity, View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { useContext, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ContextoListaltens, ICategoria } from "@/contexts/ListaContexto";

export default function Index() {
  const contexto = useContext(ContextoListaltens);
  if (!contexto) {
    throw new Error("ContextoListaltens deve estar dentro do provider.");
  }
  const { listaltens } = contexto;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {listaltens.map(({ nome, itens }: ICategoria) => (
        <View style={styles.categoriaView}>
          <Text style={styles.categoriaNome}>{nome}</Text>
          <FlatList
            data={itens}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <TouchableOpacity style={{ marginRight: 15 }} onPress={() => removeItem(nome, index)}>
                    <Feather name="trash-2" size={24} color="black" />
                  </TouchableOpacity>
                  <Text>{item.nome}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity>
                    <AntDesign name="minuscircleo" size={24} color="black" />
                  </TouchableOpacity>
                  <Text>{item.quantidadeDespensa}</Text>
                  <TouchableOpacity>
                    <AntDesign name="pluscircleo" size={24} color="black" />
                  </TouchableOpacity>
                </View>

              </View>
            )} />
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  categoriaView: {
    marginBottom: 10
  },
  categoriaNome: {
    alignSelf: "stretch",
    padding: 5,
    backgroundColor: "#006494",
    color: "#c9f0ff",
  },
  item: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    marginTop: 10
  }
});
