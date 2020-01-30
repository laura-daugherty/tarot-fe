import React, { useEffect, useState } from "react";
// import card from "../Cards/card.js";
import axios from "axios";

function CardView() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    axios
      .get("https://tarot-flip.herokuapp.com/cards")
      .then(event => {
        setCards(event.data);
      })                             
      .catch(error => {
        console.log("ERROR", error);
      });
  }, []);

  return (
    <div> 
      {cards.map(card => {
        return <div key={card.id}>{card.name}</div>
      })}
    </div>
  );
}

export default CardView;
