import React,{useState,useContext, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    const tareasContext = useContext(tareaContext);
    const {tareaSeleccionada,  errorTarea, agregarTarea, validarTarea, obtenerTareas,
            actualizarTarea, limpiarTarea } = tareasContext;

    useEffect(() => {
        if(tareaSeleccionada!== null)
            guardarTarea(tareaSeleccionada);
        else   
            guardarTarea({nombre: ''});
    }, [tareaSeleccionada])

    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    if(!proyecto) return null;

    const [proyectoActual] = proyecto;

    

    const onChangeTarea = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const {nombre} = tarea;

    const onSubmitTarea = e => {
        e.preventDefault();
        if(nombre.trim()==='') {
            validarTarea();
            return;
        }
        if(tareaSeleccionada===null)
        {   
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else
        {
            actualizarTarea(tarea);
            limpiarTarea();
        }
       
        obtenerTareas(proyectoActual._id);
        guardarTarea({nombre: ''});
    }


    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmitTarea}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Taskname"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeTarea}
                    />
                </div>
                <div className="contenedor-input">
                    <button
                    type="submit"
                    className="btn btn-block btn-primario"
                    >{tareaSeleccionada ? 'Update task' : 'Add Task'} </button>
                </div>
            </form>
            { errorTarea ? <p className="mensaje error">Task name can't be a empty value</p> : null}
        </div>

     );
}
 
export default FormTarea;