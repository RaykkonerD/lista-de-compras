import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { IListaContexto } from '@/contexts/ListaContexto';

interface IModalDespensa extends IListaContexto {
  visivel: boolean;
  setVisivel: Dispatch<SetStateAction<boolean>>;
}

export default function ModalDespensa({ visivel, setVisivel, listaltens, adicionaItem, removeItem }: IModalDespensa) {
  const [categoria, setCategoria] = useState("");
  const [item, setItem] = useState("");

  const handleAdd = () => {
    adicionaItem(categoria, item);
    setVisivel(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visivel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <TextInput value={categoria} onChangeText={setCategoria} />
          <TextInput value={item} onChangeText={setItem} />
          <TouchableOpacity
            style={styles.button}
            onPress={handleAdd}
          >
            <Text style={styles.textStyle}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#006494',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});