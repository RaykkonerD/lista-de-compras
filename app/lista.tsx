import { Text, TouchableOpacity, View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { useContext, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ContextoListaItens, ICategoria } from "@/contexts/ListaContexto";

export default function Index() {
  const contexto = useContext(ContextoListaItens);
  if (!contexto) {
    throw new Error("ContextoListaltens deve estar dentro do provider.");
  }
  const { listaItens, somaItemDaLista, subtraiItemDaLista } = contexto;

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {listaItens.map(({ nome, itens }: ICategoria, indexCategoria: number) => (
        <View style={styles.categoriaView} key={indexCategoria}>
          <Text style={styles.categoriaNome}>{nome}</Text>
          <FlatList
            data={itens}
            renderItem={({ item, index }) => (
              <View style={item.quantidadeLista < item.quantidadeDespensa ? styles.item : styles.itemCompleto}>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <Text style={{ marginRight: 15, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 50, backgroundColor: "#006494", color: "#c9f0ff" }}>
                    {item.quantidadeDespensa}
                  </Text>
                  <Text>{item.nome}</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity onPress={() => subtraiItemDaLista(indexCategoria, index)}>
                    <AntDesign name="minuscircleo" size={24} color="black" />
                  </TouchableOpacity>
                  <Text>{item.quantidadeLista}</Text>
                  <TouchableOpacity onPress={() => somaItemDaLista(indexCategoria, index)}>
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
    marginBottom: 35
  },
  categoriaNome: {
    alignSelf: "stretch",
    padding: 5,
    backgroundColor: "#006494",
    color: "#c9f0ff",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemCompleto : {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#c9f0ff",
    alignItems: "center",
  }
});
