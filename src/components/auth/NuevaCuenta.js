import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado,  registrarUsuario} = authContext;

    //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    const [user, setUser] = useState({
        nombre: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const {email, password, nombre, passwordConfirm} = user;

    const onSubmit = e => {
        e.preventDefault();

        //validate empty fields
        if(nombre.trim() === '' || email.trim() === '' ||
         password.trim() === '' || passwordConfirm.trim() === '' )
         {
             mostrarAlerta('All fields are required', 'alerta-error');
             return;
         }

        //Password minimo 6 caracteres
        if(password.length<6){
            mostrarAlerta('The password must be at least 6 characters', 'alerta-error');
            return;
        }

        if(password!==passwordConfirm){
            mostrarAlerta('The passwords must be the same', 'alerta-error');
            return;
        }

        //send to action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    const onChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    

    return ( 
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Sign Up</h1>
                <form
                    onSubmit={onSubmit}

                >
                    <div className="campo-form">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="name"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            placeholder="email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="passwordConfirm">Password Confirm</label>
                        <input 
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="repeat password"
                            onChange={onChange}
                            value={passwordConfirm}
                        />
                    </div>
                    <div className="campo-form">
                        <button 
                            type="submit"
                            className="btn btn-primario btn-block"
                        >Create New Account</button>
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Back to login page
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;