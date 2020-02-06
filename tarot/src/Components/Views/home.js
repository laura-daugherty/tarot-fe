import React from "react";
import { Link } from 'react-router-dom'
import {Container, Button} from 'semantic-ui-react'
import './cardview.css'
function Home() {
  return (
    <div>
      <Container text>
        Tarot Flip was made with images from the Rider-Waite Tarot Deck published in 1909. Cards were drawn by Pamela Coleman Smith at the instruction of A.E.Waite. 
        The cards were scanned by Holly Voley from an original 1909 deck in public domain and obtained through Wikipedia. Descriptions are interpreted from <b>The Key To the Tarot </b>
        by Arthur Edward Waite.
      </Container>
      <div className="draw">
        <Button>
          <Link to= "/card" className="centered">Click to Enter</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;










