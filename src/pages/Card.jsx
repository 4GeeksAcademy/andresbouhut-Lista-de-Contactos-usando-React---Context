import React from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer'
import storeReducer from '../store'

const Card = () => {
  return (
    <div className="border border-primary">
        <h4>Componente Card:{storeReducer.saludo}</h4>

    </div>
  )
}

export default Card