import React from 'react'
import '../index.css'
import { ConnectButton } from './ConnectButton'
import {Logo,Nav} from './Design.styled'

function Navbar() {
  return (
      <Nav>
        <div>
            <Logo>SHARK LABS</Logo>
              {/* <Navlink>Homepage</Navlink>
              <Navlink>Staking</Navlink>
              <Navlink>Public release</Navlink> */}
          </div>
        <div>
         <ConnectButton />
        </div>
      </Nav>
  )
}

export default Navbar