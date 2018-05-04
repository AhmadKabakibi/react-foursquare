import React from 'react'
import {
  Navbar,
  NavbarBrand
} from 'reactstrap'

const Navigation = props => {
  return (
    <Navbar className='mb-5' color='light' light expand='md'>
      <NavbarBrand href='/'>{props.title}</NavbarBrand>
    </Navbar>
  )
}

export default Navigation
