import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado,  iniciarSesion} = authContext;

    //EN caso de q el usuario o password no exista
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
        email: '',
        password: ''
    })

    const {email, password} = user;

    const onSubmit = e => {
        e.preventDefault();
        if(email.trim()=== '' || password.trim()=== ''){
            mostrarAlerta('You must insert email and password', 'alerta-error')
        }
        //validate empty fields

        //send to action
        iniciarSesion({email,password});

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
                <h1>Sign In</h1>
                <form
                    onSubmit={onSubmit}

                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            placeholder="your email"
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
                            placeholder="password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <button 
                            type="submit"
                            className="btn btn-primario btn-block"
                        >Sing in</button>
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Get Account
                </Link>
            </div>
        </div>
     );
}
 
export default Login;