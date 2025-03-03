import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthChecker = ({token,children}) => {
  if(token){
    return <Navigate to="/dashboard" replace/>
  }
  return children
}

export default AuthChecker