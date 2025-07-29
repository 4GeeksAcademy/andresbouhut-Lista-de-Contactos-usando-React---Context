import React from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer'

const Info = () => {
    const {store, dispatch} = useGlobalReducer()
  return (
    <div className="bg-warning">
        <h4>Componente Info: {store.saludo}</h4>

    </div>
  )
}

export default Info