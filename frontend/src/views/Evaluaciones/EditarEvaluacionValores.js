import React, {useState, useEffect } from 'react'
import { CssBaseline, Typography, makeStyles, CircularProgress, Divider, FormControl, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core'
import http from '../../http-common';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const useStyle = makeStyles(theme => ({
    root:{
        display: 'block'
    }, 
    form: {
        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left'
    },
    centerItem: {
        textAlign: 'center',
    },
    divider: {
        marginTop: '10px',
        marginBottom: '20px',
    },
    back : {
        marginRight: '10px'
    },
    form: {
        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left'
    },
    formItems: {
        textAlign: 'center'
    },
}))


function EditarEvaluacionValores(props) {
    const { history } = props;
    const classes = useStyle();
    const [opciones, setOpciones] = useState([])
    const [valoresInicio, setValoresInicio] = useState([]);
    const [valoresFin, setValoresFin] = useState([]);
    const [idEvaluacion] = useState(window.location.pathname.split("/").pop() === 'editarEvaluacionInicio' ? 1 : 2);
    const [disabled, setDisabled] = useState(false);

    const handleChange = (event) => {
        const idRespuesta = event.target.parentElement.parentElement.parentElement.parentElement.id; 
        if(idEvaluacion == 1) {
            setValoresInicio({
                ...valoresInicio,
                [idRespuesta]: event.target.value
            })
        }
        else {
            setValoresFin({
                ...valoresFin,
                [idRespuesta]: event.target.value
            })
        }
        
    };

    useEffect (() => {
        if(!Cookies.get("roles").includes("Administrador") && !Cookies.get("roles").includes("Social"))
        {
            props.history.goBack();
        }

        if(idEvaluacion == 1) {
            http.get('/detallesEvaluacionesInicio/'+ props.idBeneficiario)
            .then(res => { 
                setOpciones(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
        } else {
            http.get('/detallesEvaluacionesFin/'+ props.idBeneficiario)
            .then(res => { 
                setOpciones(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
        }
        

    }, []);

    const handleSubmit = (event) => {
        setDisabled(true);
        setValoresInicio({
            ...valoresInicio
        })
        setValoresFin({
            ...valoresFin
        })
        let valueRespuesta = {};
        let arrayForm = [];
        let respuestaFinal = opciones.map((r) => (r.respuestasPosibles))
        let idEvaluacionRespuesta = opciones.map((id) => (id.idEvaluacionRespuesta))
        let i = idEvaluacion == 1 ? 1 : 10 // Decidir en donde empieza el contador del ciclo for
        /* 
            Todos los operadores ternarios aquí los utilicé para no hacer dos ciclos for.
            El que está dentro de la declaración del ciclo delimita si termina en 10 o 19
            El que está en el valor de respuestasPosibles agrega el valor sacado del arreglo correspondiente (valueInicio/valueFin)
        */
        for (i; i < (idEvaluacion == 1 ? 10 : 19); i++) {
            valueRespuesta = {
                idOpcionEvaluacion: i,
                idBeneficiario: props.match.params.idBeneficiario,
                otraRespuesta: null,
                respuestasPosibles: (idEvaluacion == 1 ? (valoresInicio[i] != undefined ? valoresInicio[i] : respuestaFinal[i-1]) : (valoresFin[i] != undefined ? valoresFin[i] : respuestaFinal[i-10])),
                idEvaluacionRespuesta: (idEvaluacion == 1 ? idEvaluacionRespuesta[i-1] : idEvaluacionRespuesta[i-10])
            }
            if(idEvaluacion == 1) arrayForm[i] = valueRespuesta;
            else arrayForm[i-9] = valueRespuesta;
        }

         for (let i = 1; i < 10; i++) {
            http.put('/evaluacion/'+props.idBeneficiario, arrayForm[i])
                .then(res => {
                    props.history.push("/beneficiarios/"+props.idBeneficiario+"?agregarEvaluacion=1");

                })
                .catch(err => {
                    console.log(err)
                    props.history.push("/beneficiarios/"+props.idBeneficiario+"?agregarEvaluacion=0");
                });
        } 
        
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            
            <Typography variant="h4" className={classes.centerItem}>Editar Formulario de Evaluación</Typography>
            {
                // Definir Título de formulario
                idEvaluacion == 1 ? 
                <div className={classes.centerItem}>
                    <Typography variant="overline" >Inicial</Typography><br />
                </div> :  

                <div className={classes.centerItem}>
                    <Typography variant="overline">Final</Typography><br />
                </div>
            }
            <Divider className={classes.divider}/>
            <form className={classes.form}>
                {
                        opciones.map((valor) => (
                                <FormControl component="fieldset" style={{display: 'block'}}>
                                    {   
                                        // Numerar preguntas
                                        valor.idOpcionEvaluacion == 1 || valor.idOpcionEvaluacion == 10 ?
                                            <Typography variant="h5">Área médica</Typography>:
                                            <></>
                                    }
                                    {   
                                        // Numerar preguntas
                                        valor.idOpcionEvaluacion == 4  || valor.idOpcionEvaluacion == 13 ?
                                            <Typography variant="h5">Área de nutriología</Typography>:
                                            <></>
                                    }
                                    {   
                                        // Numerar preguntas
                                        valor.idOpcionEvaluacion == 7 || valor.idOpcionEvaluacion == 16 ?
                                            <Typography variant="h5">Área de psicología</Typography>:
                                            <></>
                                    }
                                    {
                                        idEvaluacion == 1 ? 
                                        <Typography>{valor.idOpcionEvaluacion}.- {valor.evaluacionPregunta}</Typography>:
                                        <Typography>{valor.idOpcionEvaluacion-9}.- {valor.evaluacionPregunta}</Typography>

                                    }

                                    <RadioGroup 
                                        row 
                                        aria-label="respuestas" 
                                        name="pregunta-respuestas" 
                                        onChange={handleChange}
                                        id={valor.idOpcionEvaluacion}
                                        style={{textAlign: 'center'}}   
                                        defaultValue={valor.respuestasPosibles} 
                                    >
                                        <FormControlLabel value="Sí" control={<Radio required />} label="Sí" />
                                        <FormControlLabel value="No" control={<Radio required />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                        )) 
                    
                }
               
                <div className={classes.formItems}>
                        <Button color="default" className={classes.back} onClick={() => history.push('/beneficiarios/'+props.match.params.idBeneficiario)}>Cancelar</Button>
                        <Button 
                            disabled={disabled} 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit}
                        >
                            {disabled ? <CircularProgress size={24} /> : 'Guardar'}
                        </Button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(EditarEvaluacionValores);
