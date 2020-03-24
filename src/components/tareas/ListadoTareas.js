import React,{Fragment,useContext} from 'react';
import Tarea from './Tarea';
import tareaContext from '../../context/tareas/tareaContext';
import { CSSTransition, TransitionGroup} from 'react-transition-group'

import proyectoContext from '../../context/proyectos/ProyectoContext';

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;
    const tareasContext = useContext(tareaContext);
    const {tareasProyecto} = tareasContext;

    if(!proyecto) return <h2>Select project</h2>;

    const [proyectoActual] = proyecto;

    

 

    return ( 
        <Fragment>
            <h2>Project: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasProyecto.length === 0 
                    ? (<li className="tarea"><p>there are no pending tasks</p></li>)
                    : <TransitionGroup>
                        {(tareasProyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea 
                                    
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        )))}
                    </TransitionGroup>
                }
            </ul>
            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyectoActual._id)}
                >
                Delete Project</button>
        </Fragment>
     );
}
 
export default ListadoTareas;