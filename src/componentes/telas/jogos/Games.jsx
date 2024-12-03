import { useState, useEffect } from "react";
import JogosContext from "./JogosContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from '../../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteJogoFirebase, addJogoFirebase, updateJogoFirebase, getJogosUIDFirebase } from '../../servicos/GamesService';

function Jogos() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "", titulo: "", descricao: "", categoria: "", classificacao: "", ano: "", preco: ""
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: "", titulo: "", descricao: "", categoria: "", classificacao: "", ano: "", preco: ""
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                await updateJogoFirebase(objeto);
                setAlerta({ status: "success", message: "Jogo atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o Jogo:" + err });
            }
        } else {
            try {
                setObjeto(await addJogoFirebase(objeto));
                setEditar(true);
                setAlerta({ status: "success", message: "Jogo criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o Jogo:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deleteJogoFirebase(objeto);
                setAlerta({ status: "success", message: "Jogo removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao remover: " + err });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        getJogosUIDFirebase(setListaObjetos);
        setCarregando(false);
    });

    return (
        <JogosContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            remover,
            objeto, setObjeto,
            editarObjeto, novoObjeto, acaoCadastrar,
            handleChange, abreDialogo, setAbreDialogo
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </JogosContext.Provider>
    )

}

export default Jogos;