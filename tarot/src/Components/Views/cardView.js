import React, { useEffect, useState } from "react";
// import card from "../Cards/card.js";
import axios from "axios";
import { Card, Image, Button, Dimmer, Loader } from "semantic-ui-react";
import "./cardview.css"

function CardView() {
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState([])
  const [loading, setLoading] = useState(true)

  let curDeck = []

  useEffect(() => {
    axios
      //access DB
      .get("https://tarot-flip.herokuapp.com/cards")
      .then(event => {
        //set state
        setCards(event.data);
        setLoading(false)
      })                             
      .catch(error => {
        console.log("ERROR", error);
      });
  }, []);

  //Properly displays name of card
  function displayName(name, order, suit) {
    if (name.length !== 0) {
      return name
    } else {
      return order + " of " + suit
    }
  }  ;

  //Shuffles deck and sets state 'deck' to the deck sorted into shuffled order
  function shuffleDeck() {
    //helper function to sort cards into order by "number"
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
    //for each card from DB, add a random 'number' value from 0 through the length of the deck
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
    //sorting the deck using sort function
    curDeck.sort(compare)
    //set state 'deck' to shuffled deck
    setDeck(curDeck)
  }
  //returns the first 3 cards from 'deck'
  function pickCards() {
    return deck.slice(0, 3)
  }

  function display() {
    console.log("deck", deck)
    if (deck.length > 0) {
      const threeCards = pickCards()
      return (
        <div> 
          <div className="draw">
            <Button onClick = {() => shuffleDeck()}>Draw Your Cards</Button>
          </div>
          <Card.Group className="centered">
            {threeCards.map(card => (
              <Card key={card.id} className="ui card">
                <Image src={card.cardImage} wrapped ui={true} alt="tarot card image" />
                <Card.Content>
                  <Card.Header className="content">
                    {displayName(card.name, card.order, card.suit)}
                  </Card.Header>
                  <Card.Description className="description">
                    {card.description}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </div>
      )
    } else if (loading === true) {
      return (
        <div>
          <div className="draw">
            <Button onClick = {() => shuffleDeck()}>Draw Your Cards</Button>
          </div>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
        </div>
      )
    } else {
      return (
        <div className="draw">
          <Button onClick = {() => shuffleDeck()}>Draw Your Cards</Button>
        </div>
      )
    }
  }
  return (
    display()
  );
}

export default CardView;
