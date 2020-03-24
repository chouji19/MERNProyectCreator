import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios'

import { TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA
        } from '../../types';


const TareaState = props =>{
    const initialState  = {
        tareasProyecto: [],
        tarea: null,
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [state,dispatch] = useReducer(tareaReducer, initialState);

    const obtenerTareas = async proyecto => {
       try {
            var resultado = await clienteAxios.get(`/api/tareas`,{params: {proyecto}});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
       } catch (error) {
           console.log(error);
       }
    }

    const agregarTarea = async tarea => {
        console.log(tarea);
        
        try {
            const resultado = await clienteAxios.post('/api/tareas',tarea);
            console.log(resultado.data);
            
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id,proyecto) => {
        console.log(`Eliminar tarea: ${id}, proyecto: ${proyecto}`);
        
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarTarea = async (tarea) => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    

    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    



    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    
    

    return(
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}


export default TareaState;