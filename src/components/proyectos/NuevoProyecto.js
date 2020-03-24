import React, {Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';


const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorFormulario , mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();
        
        if(nombre.trim() === ''){
            mostrarError();
            return;
        }

        agregarProyecto(proyecto);
        setProyecto({
            nombre: ''
        })
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"   
                onClick={ () => mostrarFormulario()}
            >
                New Project
            </button> 
            {
                formulario 
                ? (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Project Name"
                            name="nombre"
                            onChange={onChangeProyecto}
                            value={nombre}
                        />
                        <button
                            type="submit"
                            className="btn btn-block btn-primario"
                        >Add</button>
                    </form>

                )
                : null
            }

            {errorFormulario ? 
                <p className="mensaje error">You must provide a project name</p>
            :null}
        </Fragment>
    );
}
 
export default NuevoProyecto;