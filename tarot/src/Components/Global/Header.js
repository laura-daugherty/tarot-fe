import React from "react";
import { Link } from 'react-router-dom'
import {Header, Button} from 'semantic-ui-react'
import "./header.css"
export const Headerbar = (props) => {
  return ( 
    <div>
      <nav className="navbutts">
        <Button className="linkButton">
          <Link to="/">Home</Link>
        </Button>
        <Button>
          <Link to="/card">Play</Link>
        </Button>
      </nav>
      <Header as='h1' className="centered">
        Tarot Flip
      </Header>
    </div>
   );
}
// export default Header;