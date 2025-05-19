import ModalDespensa from "@/components/ModalDespensa";
import { useContext, useState } from "react";
import {  Text,  TouchableOpacity,  View,  StyleSheet,  FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {  ContextoListaltens,  ICategoria,  IListaContexto } from "@/contexts/ListaContexto";

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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {listaltens.map(({ nome, itens }: ICategoria) => (
        <View>
          <Text>{nome}</Text>
          {itens.map((e) => (
            <Text>{e.nome} - {e.quantidadeDespensa}</Text>
          ))}
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
});
