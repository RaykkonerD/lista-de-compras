import ModalDespensa from "@/components/ModalDespensa";
import { useContext, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ContextoListaltens, ICategoria, IListaContexto, Item } from "@/contexts/ListaContexto";

export default function Index() {
  const [modalVisivel, setModalVisivel] = useState<boolean>(false);
  const contexto = useContext(ContextoListaltens);
  if (!contexto) {
    throw new Error("ContextoListaltens deve estar dentro do provider.");
  }
  const { listaltens, adicionaItem, removeItem } = contexto;

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
        flex: 1,
        paddingTop: 10
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
      <ModalDespensa
        visivel={modalVisivel}
        setVisivel={setModalVisivel}
        listaltens={listaltens}
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
