import React, {useContext} from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/ProyectoContext';

const Tarea = ({tarea}) => {

    // Extrar si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

    // Extraer el proyecto
    const [proyectoActual] = proyecto;

    const borrarTarea = tarea => {
            eliminarTarea(tarea._id, proyectoActual._id)
            obtenerTareas(proyectoActual._id)
    }


    const cambiarEstado = (tarea) => {
        if(tarea.estado)
            tarea.estado = false;
        else
            tarea.estado = true;
        actualizarTarea(tarea)
    }


    const seleccionarTarea = (tarea) => {
        guardarTareaActual(tarea)
    }
    
    

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                    ? 
                        (
                            <button 
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >complete</button>
                        )
                    :
                        (
                            <button 
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >incomplete</button>
                        )
                }
            </div>
            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Edit</button>
                <button 
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => borrarTarea(tarea)}
                >Delete</button>
            </div>
        </li>
    );
}
 
export default Tarea;