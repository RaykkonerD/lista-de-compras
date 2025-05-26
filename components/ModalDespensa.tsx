import { Dispatch, SetStateAction, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { ICategoria, IListaContexto } from '@/contexts/ListaContexto';
import { AutocompleteDropdownContextProvider, AutocompleteDropdown, AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';

interface Iitem {
  id: number;
  title: string;
}

interface IModalDespensa extends IListaContexto {
  visivel: boolean;
  setVisivel: Dispatch<SetStateAction<boolean>>;
}

export default function ModalDespensa({ visivel, setVisivel, listaltens, adicionaItem }: IModalDespensa) {
  const [categoria, setCategoria] = useState("");
  const [item, setItem] = useState("");
  const [naoPreenchido, setNaoPreenchido] = useState(false);

  const handleAdd = () => {
    if (categoria == "" || item == "") {
      setNaoPreenchido(true);
    } else {
      setNaoPreenchido(false);
      adicionaItem(categoria, item);
      setVisivel(false);
    }
  }

  const handleSelect = (item: string) => {
    setCategoria(item);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visivel}
    >
      <AutocompleteDropdownContextProvider>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.labelInputView}>
              <Text style={styles.label}>Categoria</Text>
              <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}
                onChangeText={handleSelect}
                onClear={() => handleSelect("")}
                textInputProps={{ style: { minWidth: 150 } }}
                containerStyle={{ width: 175 }}
                emptyResultText="Nada encontrado ainda."
                dataSet={listaltens.map((item: ICategoria, indx: number) => {
                  return {
                    id: indx.toString(),
                    title: item.nome
                  }
                })}
              />
            </View>
            <View style={styles.labelInputView}>
              <Text style={styles.label}>Item</Text>
              <TextInput style={styles.input} value={item} onChangeText={setItem} />
            </View>
            {naoPreenchido &&
              <View style={styles.avisoView}>
                <Text style={styles.aviso}>Preencha todos os campos</Text>
              </View>}
            <TouchableOpacity
              style={styles.button}
              onPress={handleAdd}
            >
              <Text style={styles.textStyle}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </AutocompleteDropdownContextProvider>
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
  labelInputView: {
    alignItems: "flex-start"
  },
  input: {
    backgroundColor: "#d3e1e8",
    minWidth: 175,
    borderRadius: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#006494',
    marginTop: 30
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    marginBottom: 15,
    textAlign: 'center',
    color: "#006494"
  },
  avisoView: {
    width: 175,
    padding: 10,
    borderWidth: 1,
    borderColor: "#aab312",
    marginTop: 30
  },
  aviso: {
    color: "#aab312",
    textAlign: "center"
  }
});