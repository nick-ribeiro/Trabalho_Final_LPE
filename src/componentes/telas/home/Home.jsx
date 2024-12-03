import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getJogosFirebase } from '../../servicos/GamesService';

function Home() {

    const [listaObjetos, setListaObjetos] = useState([]);

    useEffect(() => {
        getJogosFirebase(setListaObjetos);
    }, []);

    useEffect(() => {

    }, []);
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="div">
                Firebase com Firestore - Jogos - LPE
            </Typography>
            {listaObjetos.length === 0 && <Typography variant="h5" component="div">
                Nenhum registro encontrado
            </Typography>}

            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}

            <Grid container spacing={2}>
                {listaObjetos.length > 0 && (
                    listaObjetos.map(objeto => (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}
                            key={objeto.id}>
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {objeto.tipo}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {objeto.titulo}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {objeto.descricao}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {objeto.categoria}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {objeto.classificacao}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {objeto.ano}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {objeto.preco}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))

                )}
            </Grid>

        </div>
    )
}

export default Home;