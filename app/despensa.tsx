import ModalDespensa from "@/components/ModalDespensa";
import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ContextoListaItens, ICategoria, IListaContexto, Item } from "@/contexts/ListaContexto";

export default function Index() {
  const [modalVisivel, setModalVisivel] = useState<boolean>(false);
  const contexto = useContext(ContextoListaItens);
  if (!contexto) {
    throw new Error("ContextoListaltens deve estar dentro do provider.");
  }
  const { listaItens, removeCategoria, adicionaItem, removeItem, somaItemDaDespensa, subtraiItemDaDespensa } = contexto;

  const FAB = () => {
    return (
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisivel(true)}
      >
        <AntDesign name="plus" size={24} color="#c9f0ff" />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1
      }}
    >
      {listaItens.map(({ nome, itens }: ICategoria, indexCategoria: number) => (
        <View style={styles.categoriaView} key={indexCategoria}>
          <View style={styles.categoriaBarra}>
            <Text style={styles.categoriaNome}>{nome}</Text>
            <TouchableOpacity onPress={() => removeCategoria(indexCategoria)}>
              <Feather name="x" size={24} color="#c9f0ff" />
            </TouchableOpacity>
          </View>
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
                  <TouchableOpacity onPress={() => subtraiItemDaDespensa(indexCategoria, index)}>
                    <AntDesign name="minuscircleo" size={24} color="black" />
                  </TouchableOpacity>
                  <Text>{item.quantidadeDespensa}</Text>
                  <TouchableOpacity onPress={() => somaItemDaDespensa(indexCategoria, index)}>
                    <AntDesign name="pluscircleo" size={24} color="black" />
                  </TouchableOpacity>
                </View>

              </View>
            )} />
        </View>
      ))}
      <ModalDespensa
        visivel={modalVisivel}
        setVisivel={setModalVisivel}
        listaItens={listaItens}
        adicionaItem={adicionaItem}
        removeItem={removeItem}
      />
      <FAB />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    borderRadius: 100,
    padding: 25,
    backgroundColor: "#006494",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  categoriaView: {
    marginBottom: 35
  },
  categoriaBarra: {
    alignSelf: "stretch",
    padding: 5,
    backgroundColor: "#006494",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  categoriaNome: {
    color: "#c9f0ff",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  }
});
