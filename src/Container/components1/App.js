import React, { useState, useRef } from 'react'
import {Card, CardContent, Grid, Container, makeStyles, TextField, AppBar, Typography, Button} from '@material-ui/core'
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader'
import "./App.css"

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
    },
    border:{
        border: '1px dashed gray',
        margin: '0px 0px'
    },
    qr: {
        marginTop: '15px',
        background: 'rgb(195, 231, 240)'
    }
})

function App() {
    const [text, setText] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [scanResultFile, setResultFile] = useState("");
    const classes = useStyles();
    const qrRef = useRef(null);
    const [resultWebCam, setResultWebCam] = useState("");

    const generateQrCode = async () =>{
        try {
            const responce = await QRCode.toDataURL(text);
            setImgUrl(responce);
            console.log(responce);
            console.log(text);
        } catch (error) {
            console.log(error);
        }
    }

    const errorFile = (error) =>{
        console.log(error);
    }
    const scanFile = (result) =>{
if(result){
    console.log(result);
    setResultFile(result);
}
    }

    const qrScanCode = () =>{
        qrRef.current.openImageDialog();
    }

    const scanWebCam = (result) =>{
       if(result){
        setResultWebCam(result);
       }
    }

    const errorWebCam = (error) =>{
        console.log(error);
    }

    const downloadFile = () =>{
        window.print();
    }

    return (
        <div className='app'>
                <Card>
                    <AppBar className={classes.appbar}>
                        <Typography className={classes.padding}>
                            <Button variant = "contained" size = "small" onClick = {()=>downloadFile()} color = "secondary">Page download<i className='fa fa-download'></i></Button>
                        <h2>Qr code download the react js</h2>
                        </Typography>
                    </AppBar>
                    <div className='card-content'>
                    <CardContent>
                        <Grid container spacing= {2}>
                            <Grid className = {classes.border} item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <TextField label = "Enter text here" onChange = {(e)=> setText(e.target.value)} />
                                <Button size = "small" variant='contained' className={classes.margin} color="secondary" onClick={() => generateQrCode()}>Generate</Button>
        <div className = "image-qr">
            <div className='image-qr-padding'>
            {imgUrl ? <a href={imgUrl} style = {{textDecoration: 'none'}} download><div className = "qr-style">
                <span className='qr-code-text'>{text}</span>
            <img className="imgSize" src = {imgUrl} alt = "img" />
                </div></a> : "Qr code text generation"}
            </div>
        </div>
                            </Grid>
                            <Grid className = {classes.border} item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <Button size = "small" className = {classes.margin} variant='contained' color = "secondary" onClick = {qrScanCode}>Scan Qr code</Button>
                                <div className = "qr-style">
                                <span className='qr-code-text'>{scanResultFile}</span>
                                <QrReader 
                                className=""
                                ref = {qrRef}
                                delay = {300}
                                onScan={scanFile}
                                onError={errorFile}
                                style = {{width: '100%'}}
                                legacyMode
                                />
                                </div>
                                <h3>Scan result file: <a href={scanResultFile}>{scanResultFile}</a></h3>
                            </Grid>
                            <Grid className = {classes.border} item xl = {4} lg = {4} md = {6} sm = {12} xs = {12}>
                                <h3>Qr code scan by web cam</h3>
                            <QrReader 
                                delay = {300}
                                onScan={scanWebCam}
                                onError={errorWebCam}
                                style = {{width: '100%'}}
                                />
                                <h3>Scan qr code web cam: <a href={resultWebCam}>{resultWebCam}</a></h3>
                            </Grid>
                        </Grid>
                    </CardContent>
                    </div>
                </Card>
        
        </div>
    )
}

export default App
