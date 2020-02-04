import React, { useEffect, useState } from "react";
// import card from "../Cards/card.js";
import axios from "axios";
import { Card, Image } from "semantic-ui-react";

function CardView() {
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState([])

  let curDeck = []

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

  function displayName(name, order, suit) {
    if (name.length !== 0) {
      return name
    } else {
      return order + " of " + suit
    }
  }  ;

  function shuffleDeck() {
    function compare(a, b) {
      const numA = a.number;
      const numB = b.number;
      let comparison = 0;
      if (numA > numB) {
        comparison = 1;
      } else if (numA < numB) {
        comparison = -1;
      }
      return comparison;
    }

    for (let i = 0; i < cards.length; i++) {
      var card = 
        {
          id: cards[i].id,
          name: cards[i].name,
          suit: cards[i].suit,
          order: cards[i].order,
          description: cards[i].description,
          cardImage: cards[i].cardImage,
          number: Math.floor(Math.random() * cards.length)
        }
      curDeck.push(card)
    }
    console.log("curDeck unsorted", curDeck)
    curDeck.sort(compare)
    console.log("curDeck sorted", curDeck)
    setDeck(curDeck)
  }

  function pickCards() {
    return deck.slice(0, 3)
  }

  function display() {
    console.log("deck", deck)
    if (deck.length > 0) {
      const threeCards = pickCards()
      return (
        <div> 
          <button onClick = {() => shuffleDeck()}>Shuffle</button>

          {threeCards.map(card => (
            <Card key={card.id} className="ui centered card">
              <div className="image">
                <Image src={card.cardImage} wrapped ui={false} alt="Wedding photo" />
              </div>
              <div className="content">
                {displayName(card.name, card.order, card.suit)}
              </div>
              <div className="description">
                {card.description}
              </div>
            </Card>
          ))}

        </div>
      )
    } else {
      return (
        <button onClick = {() => shuffleDeck()}>Shuffle</button>
      )
    }
  }

  return (
    display()
  );
}

export default CardView;
