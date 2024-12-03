import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import JogosContext from "./JogosContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(JogosContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtTitulo" label="Título"
                    tipo="text" name="titulo" value={objeto.titulo}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Título OK"
                    msginvalido="Informe o Título do Jogo" />
                <CampoEntrada id="txtDescricao" label="Descrição"
                    tipo="text" name="descricao" value={objeto.descricao}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Descrição OK"
                    msginvalido="Informe a Descrição do Jogo" />
                <CampoEntrada id="txtCategoria" label="Categoria"
                    tipo="text" name="categoria" value={objeto.categoria}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Categoria OK"
                    msginvalido="Informe a Categoria do Jogo" />
                <CampoEntrada id="txtClassificacao" label="Classificação"
                    tipo="text" name="classificacao" value={objeto.classificacao}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Classificação OK"
                    msginvalido="Informe a Classificação do Jogo" />
                <CampoEntrada id="txtAno" label="Ano"
                    tipo="text" name="ano"
                    value={objeto.ano}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={4}
                    msgvalido="Ano OK"
                    msginvalido="Informe o Ano" />
                <CampoEntrada id="txtPreco" label="Preço (R$)"
                    tipo="text" name="preco" value={objeto.preco}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Preço (R$) OK"
                    msginvalido="Informe o Preço (R$) do Jogo" />
            </Dialogo>
        </>
    )

}

export default Form;