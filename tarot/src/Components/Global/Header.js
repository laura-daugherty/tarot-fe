import React from "react";
import { Link } from 'react-router-dom'
export const Header = (props) => {
  return ( 
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cards">Cards</Link>
      </nav>
      <header>
        <p>Tarot is cool.</p>
      </header>
    </div>
   );
}
// export default Header;