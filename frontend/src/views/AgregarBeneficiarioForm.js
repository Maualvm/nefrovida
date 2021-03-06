import React, {useState, useEffect} from 'react'
import {CssBaseline, makeStyles} from '@material-ui/core';
import { Grid } from 'semantic-ui-react';
import http from '../http-common'
import Controls from "../components/FormComponents/Controls";

const genderItems = [
    {id:'H', title: 'Hombre'},
    {id:'M', title: 'Mujer'}
]

const useStyle = makeStyles(theme => ({
    root:{
       '& .MuiFormControl-root' :{
           width: '90%',
           margin: theme.spacing(1),
       } 
    }, 
    form: {
            display: 'flex',
            justifyContent: 'space-evenly'
    }

}))

const initialFValues = {
    nombreBeneficiario: '',
    idEscolaridad: '',
    sexo: 'H',
    telefono: '',
    direccion: '',
    seguimiento: false,
    activo: true,
    fechaNacimiento: new Date(),
    idJornada: '',
}

export default function AgregarBeneficiarioForm(props) {

    const[values, setValues] = useState(initialFValues);
    const[errors, setErrors] = useState({});
    const classes = useStyle();
    const [escolaridadesCollection, setEscolaridades]  = useState([]);

    const handleInputChange= e => {
        const {name , value} = e.target
        setValues({
            ...values,
            [name]:value 
        })
    }

    useEffect ( () => {

        http.get('/escolaridades')
        .then(res => { setEscolaridades (res.data.data)
    })
        .catch((e) => {
            console.log(e)
        })
   }, []);
    
   values.idJornada = props.idJornada;



  const validate = () => {
      let temp = {}
      temp.nombreBeneficiario = values.nombreBeneficiario?"":"Este campo es requerido"
      temp.telefono = (values.telefono.length > 9 || values.telefono.length == 0 )?"":"Este campo debe tener al menos 10 digitos"
      temp.idEscolaridad = values.idEscolaridad.length!=0?"":"Este campo es requerido"
      setErrors({
          ...temp
      })

      return Object.values(temp).every(x => x == "")
  }


    const onSubmit = e => {

        let day = values.fechaNacimiento.getDate();
        let month = values.fechaNacimiento.getUTCMonth() + 1;
        let year = values.fechaNacimiento.getUTCFullYear();
        values.fechaNacimiento = year + "-" + month + "-" + day;

        e.preventDefault();

        if(validate()){

            if(values.seguimiento){
                values.seguimiento = 1
            } else {
                values.seguimiento = 0
            }
            
            http.post('/beneficiarios' , values)
            .then(res => {
                props.history.push("/jornadas");
            })
            .catch( e => {
                props.history.push("/jornadas");
            })

        } else {
          
        }

 

    }
 
    return (
        <div className={classes.form}>
        <CssBaseline/>
        <form className={classes.root}>
            <Grid container spacing={3} >
                <Grid item xs={6}>
                    <Controls.Input 
                        name="nombreBeneficiario" 
                        label="Nombre Completo *" 
                        value={values.nombreBeneficiario}
                        onChange = {handleInputChange}
                        error={errors.nombreBeneficiario}
                    />
                        <Controls.Input 
                        variant="outlined"
                        label="Numero de Teléfono"
                        name="telefono"
                        value={values.telefono}
                        onChange = {handleInputChange}
                        error={errors.telefono}
                        />
                        <Controls.Input 
                        variant="outlined"
                        label="Dirección"
                        name="direccion"
                        value={values.direccion}
                        onChange = {handleInputChange}
                        />
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup 
                        name = "sexo"
                        label="Sexo *"
                        value={values.sexo}
                        items={genderItems}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        name="idEscolaridad"
                        label="Escolaridad *"
                        value={values.idEscolaridad}
                        onChange={handleInputChange}
                        options={escolaridadesCollection}
                        error={errors.idEscolaridad}
                    />
                    <Controls.DatePicker 
                        name="fechaNacimiento"
                        label="Fecha de Nacimiento *"
                        value={values.fechaNacimiento}
                        onChange={handleInputChange}
                        />
                    <Controls.Checkbox 
                        name="seguimiento"
                        label= "De Seguimiento"
                        value={values.seguimiento}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button
                        text="Submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        onClick={onSubmit}
                        
                         />
                    </div>

                </Grid>
            </Grid>
        </form>
        </div>
    )
}
