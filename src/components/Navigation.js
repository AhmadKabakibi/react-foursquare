import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

const Navigation = props => {
  return (
    <Navbar className='mb-5' color='light' light expand='md'>
      <NavbarBrand href='/'>{props.title}</NavbarBrand>
      <Nav className='ml-auto' navbar>
        <NavItem>
          <NavLink href='https://github.com/afuggini/react-foursquare' target='_blank'>Github</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Navigation
