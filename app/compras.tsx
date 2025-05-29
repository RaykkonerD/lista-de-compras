import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { ContextoListaItens, ICategoria, IListaContexto, Item } from "@/contexts/ListaContexto";

export default function Index() {
  const [listaCompras, setListaCompras] = useState<Item[]>([]);
  const contexto = useContext(ContextoListaItens);
  if (!contexto) {
    throw new Error("ContextoListaltens deve estar dentro do provider.");
  }
  const { listaItens } = contexto;

  useEffect(() => {
    for(let categoria of listaItens){
      setListaCompras(listaCompras.concat(categoria.itens));
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
              <View style={styles.item}>
                <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                  <Text style={{ marginRight: 15, paddingHorizontal: 15, paddingVertical: 7, borderRadius: 50, backgroundColor: "#006494", color: "#c9f0ff" }}>
                    {item.quantidadeDespensa}
                  </Text>
                  <Text>{item.nome}</Text>
                </View>
              </View>
            )}>
    </View>
  );
}
