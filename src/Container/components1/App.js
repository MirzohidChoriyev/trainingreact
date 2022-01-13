import React, { useState } from 'react'
import {Card, CardContent, Grid, Container, makeStyles, TextField, AppBar, Typography, Button} from '@material-ui/core'
import { ClassNames } from '@emotion/react'
import QRCode from 'qrcode';

const useStyles = makeStyles({
    appbar:{
        position: 'static'
    },
    padding:{
        paddingLeft: '30px'
    },
    margin: {
        marginTop: '10px',
        background: 'crimson'
    }
})

function App() {
    const [text, setText] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const classes = useStyles();

    const generateQrCode = async () =>{
        try {
            const responce = await QRCode.toDataURL("test qrcode generation");
            setImgUrl(responce);
            console.log(responce);
            console.log(text);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='app'>
            <Container>
                <Card>
                    <AppBar className={classes.appbar}>
                        <Typography className={classes.padding}>
                        <h2>Qr code download the react js</h2>
                        </Typography>
                    </AppBar>
                    <CardContent>
                        <Grid container spacing= {2}>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField label = "Enter text here" onChange = {(e)=> setText(e.target.value)} />
                                <Button variant='contained' className={classes.margin} color="secondary" onClick={() => generateQrCode()}>Generate</Button>
                                <br />
                                <br />
                                <br />
                                <br />
                                {imgUrl ? <a href={imgUrl} download><img src = {imgUrl} alt = "img" /></a> : null}
                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>

                            </Grid>
                            <Grid item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

export default App
