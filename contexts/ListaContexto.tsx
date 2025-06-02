import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Item {
    nome: string;
    quantidadeDespensa: number;
    quantidadeLista: number;
}

export interface ICategoria {
    nome: string;
    itens: Item[];
}

export interface IListaContexto {
    listaItens: ICategoria[];
    adicionaItem: (categoria: string, nomeItem: string) => void;
    removeItem: (categoria: string, indexItem: number) => void;
    somaItemDaDespensa: (indexCategoria: number, indexItem: number) => void;
    subtraiItemDaDespensa: (indexCategoria: number, indexItem: number) => void;
    somaItemDaLista: (indexCategoria: number, indexItem: number) => void;
    subtraiItemDaLista: (indexCategoria: number, indexItem: number) => void;
    removeCategoria: (index: number) => void;
}

interface ListaContextoProps {
    children: ReactNode;
}

export const ContextoListaItens = createContext<IListaContexto | undefined>(undefined);

export function ListaContexto({ children }: ListaContextoProps) {
    const mock = [{ 
        nome: "Categoria 1", 
        itens: [
            {
                nome: "Item 1",
                quantidadeDespensa: 6,
                quantidadeLista: 2
            },
            {
                nome: "Item 2",
                quantidadeDespensa: 3
            }
        ] 
    }];
    const [listaItens, setListaItens] = useState<ICategoria[]>([]);
    const STORAGE_KEY = '@app/Compras';

     useEffect(() => {
        const loadState = async () => {
            try {
                const estadoSalvo = await AsyncStorage.getItem(STORAGE_KEY);
                if (estadoSalvo) {
                    setListaItens(JSON.parse(estadoSalvo));
                }
            } catch (error) {
                console.error('Erro ao carregar estado:', error);
            }
        };
        loadState();
    }, []);

    useEffect(() => {
        const saveState = async () => {
            try {                
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaItens));
            } catch (error) {
                console.error('Erro ao salvar estado:', error);
            }
        };
        
        saveState();        
    }, [listaItens]);

    const removeCategoria = (index: number) => {
        setListaItens(listaItens.filter((c: ICategoria, i: number) => i !== index));
    }

    const adicionaItem = (categoria: string, nomeItem: string) => {
        const indexAEditar = listaItens.findIndex((c: ICategoria) => c.nome === categoria);
        const item: Item = {
            nome: nomeItem,
            quantidadeDespensa: 0,
            quantidadeLista: 0
        }

        if (indexAEditar >= 0) {
            let copialista = [...listaItens];
            copialista[indexAEditar].itens.push(item);
            setListaItens(copialista);
        } else {
            setListaItens([...listaItens, { nome: categoria, itens: [item] }]);
        };
    }

    const removeItem = (categoria: string, indexItem: number) => {
        const indexAEditar = listaItens.findIndex((c: ICategoria) => c.nome === categoria);
        let copiaLista = [...listaItens];
        copiaLista[indexAEditar].itens = copiaLista[indexAEditar].itens.filter((el: Item, i: number) => i !== indexItem);
        setListaItens(copiaLista);
    }

    const somaItemDaDespensa = (indexCategoria: number, indexItem: number) => {
        const indexAEditar = listaItens.findIndex((c: ICategoria, i: number) => i === indexCategoria);
        let copiaLista = [...listaItens];
        const quantidadeDespensa = copiaLista[indexAEditar].itens[indexItem].quantidadeDespensa;
        copiaLista[indexAEditar].itens[indexItem].quantidadeDespensa = quantidadeDespensa + 1;
        setListaItens(copiaLista);
    }

    const subtraiItemDaDespensa = (indexCategoria: number, indexItem: number) => {
        const indexAEditar = listaItens.findIndex((c: ICategoria, i: number) => i === indexCategoria);
        let copiaLista = [...listaItens];
        const quantidadeDespensa = copiaLista[indexAEditar].itens[indexItem].quantidadeDespensa;
        copiaLista[indexAEditar].itens[indexItem].quantidadeDespensa = quantidadeDespensa > 0 ? quantidadeDespensa - 1 : quantidadeDespensa;
        setListaItens(copiaLista);
    }

    const somaItemDaLista = (indexCategoria: number, indexItem: number) => {
        const indexAEditar = listaItens.findIndex((c: ICategoria, i: number) => i === indexCategoria);
        let copiaLista = [...listaItens];
        const quantidadeLista = copiaLista[indexAEditar].itens[indexItem].quantidadeLista;
        copiaLista[indexAEditar].itens[indexItem].quantidadeLista = quantidadeLista + 1;
        setListaItens(copiaLista);
    }

    const subtraiItemDaLista = (indexCategoria: number, indexItem: number) => {
        const indexAEditar = listaItens.findIndex((c: ICategoria, i: number) => i === indexCategoria);
        let copiaLista = [...listaItens];
        const quantidadeLista = copiaLista[indexAEditar].itens[indexItem].quantidadeLista;
        copiaLista[indexAEditar].itens[indexItem].quantidadeLista = quantidadeLista > 0 ? quantidadeLista - 1 : quantidadeLista;
        setListaItens(copiaLista);
    }

    return (
        <ContextoListaItens.Provider value={{ 
            listaItens, 
            removeCategoria, 
            adicionaItem, 
            removeItem, 
            somaItemDaDespensa, 
            subtraiItemDaDespensa, 
            somaItemDaLista, 
            subtraiItemDaLista 
        }}>
            {children}
        </ContextoListaItens.Provider>
    );
}