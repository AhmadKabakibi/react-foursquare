import React from 'react'
import { Alert } from 'reactstrap'

const ErrorAlert = (props) => {
  return (
    <Alert color='danger'>
      {props.message}
    </Alert>
  )
}

export default ErrorAlert
