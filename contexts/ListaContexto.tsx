import { createContext, useState, ReactNode } from "react";

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
    listaltens: ICategoria[];
    adicionaItem: (categoria: string, nomeItem: string) => void;
    removeItem: (categoria: string, indexItem: number) => void;
}

interface ListaContextoProps {
    children: ReactNode;
}

export const ContextoListaltens = createContext<IListaContexto | undefined>(undefined);

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
    const [listaltens, setListaltens] = useState<ICategoria[]>([]);

    const adicionaItem = (categoria: string, nomeItem: string) => {
        const indexAEditar = listaltens.findIndex((c: ICategoria) => c.nome === categoria);
        const item: Item = {
            nome: nomeItem,
            quantidadeDespensa: 0,
            quantidadeLista: 0
        }

        if (indexAEditar >= 0) {
            let copialista = [...listaltens];
            copialista[indexAEditar].itens.push(item);
            setListaltens(copialista);
        } else {
            setListaltens([...listaltens, { nome: categoria, itens: [item] }]);
        };
    }

    const removeItem = (categoria: string, indexItem: number) => {
        const indexAEditar = listaltens.findIndex((c: ICategoria) => c.nome === categoria);
        let copiaLista = [...listaltens];
        copiaLista[indexAEditar].itens.filter((el: Item, i: number) => i != indexItem);
        setListaltens(copiaLista);
        console.log(listaltens, indexItem)
    }

    return (
        <ContextoListaltens.Provider value={{ listaltens, adicionaItem, removeItem }}>
            {children}
        </ContextoListaltens.Provider>
    );
}