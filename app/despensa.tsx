import ModalDespensa from "@/components/ModalDespensa";
import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function Index() {
  const [modalVisivel, setModalVisivel] = useState<boolean>(false);

  const FAB = () => {
    return (
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisivel(true)}>
        <AntDesign name="plus" size={24} color="#c9f0ff" />
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Despensa.</Text>
      <ModalDespensa visivel={modalVisivel} setVisivel={setModalVisivel} />
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
    right: 30
  }
});