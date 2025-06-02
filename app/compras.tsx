import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { ContextoListaItens, ICategoria, IListaContexto, Item } from "@/contexts/ListaContexto";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Index() {
  const [listaCompras, setListaCompras] = useState<Item[]>([]);
  const contexto = useContext(ContextoListaItens);
  if (!contexto) {
    throw new Error("ContextoListaltens deve estar dentro do provider.");
  }
  const { listaItens } = contexto;

  useEffect(() => {
    setListaCompras([]);
    for (let categoria of listaItens) {
      for (let item of categoria.itens) {
        if (item.quantidadeLista < item.quantidadeDespensa) {
          setListaCompras([...listaCompras.filter(e => e.nome != item.nome), item]);
        }
      }
    }
  }, [listaItens]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={listaCompras}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
            <BouncyCheckbox
              size={25}
              fillColor="#006494"
              unFillColor="#ebf9ff"
              text={(item.quantidadeDespensa - item.quantidadeLista) + " " + item.nome}
              innerIconStyle={{ borderWidth: 2 }}
            />
          </View>
        )} />
    </View>
  );
}
