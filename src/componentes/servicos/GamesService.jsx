import { auth, db } from '../../firebaseConfig';
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where
} from "firebase/firestore";

export const getJogosFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'jogos'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                descricao: doc.data().descricao,
                categoria: doc.data().categoria,
                classificacao: doc.data().classificacao,
                ano: doc.data().ano,
                preco: doc.data().preco
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getJogosUIDFirebase = async (setListaObjetos) => {
    try {
        const colRef = collection(db, "jogos");
        const q = query(colRef)
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                titulo: doc.data().titulo,
                descricao: doc.data().descricao,
                categoria: doc.data().categoria,
                classificacao: doc.data().classificacao,
                ano: doc.data().ano,
                preco: doc.data().preco
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteJogoFirebase = async objeto => {
    try {
        const jogoDocRef = doc(db, 'jogos', objeto.id)
        await deleteDoc(jogoDocRef);
    } catch (err) {
        throw err;
    }
}

export const addJogoFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'jogos'),
            {
                titulo: objeto.titulo,
                descricao: objeto.descricao,
                categoria: objeto.categoria,
                classificacao: objeto.classificacao,
                ano: objeto.ano,
                preco: objeto.preco
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updateJogoFirebase = async objeto => {
    try {
        const jogoDocRef = doc(db, 'jogos', objeto.id)
        await updateDoc(jogoDocRef, {
            titulo: objeto.titulo,
                descricao: objeto.descricao,
                categoria: objeto.categoria,
                classificacao: objeto.classificacao,
                ano: objeto.ano,
                preco: objeto.preco
        })
    } catch (err) {
        throw err;
    }
}