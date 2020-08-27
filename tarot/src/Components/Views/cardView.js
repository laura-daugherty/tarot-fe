import React, { useEffect, useState } from "react";
// import card from "../Cards/card.js";
import axios from "axios";
import { Card, Image, Button, Dimmer, Loader } from "semantic-ui-react";
import "./cardview.css"

function CardView() {
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState([])
  const [loading, setLoading] = useState(true)
  const [shuffling, setShuffling] = useState(false)
  const [isTen, setIsTen] = useState(false)
  const [isThree, setIsThree] = useState(false)

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
    setShuffling(true)
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
    setShuffling(false)
    setDeck(curDeck)
  }
  //returns the first 3 cards from 'deck'
  function pick3Cards() {
    return deck.slice(0, 3)
  }
  function pick10Cards() {
    return deck.slice(0,10)
  }
  function isDisplayTen() {
    setIsThree(false)
    setIsTen(true)
  }
  function isDisplayThree() {
    setIsTen(false)
    setIsThree(true)
  }



  function display() {
    const threeCards = pick3Cards()
    const tenCards = pick10Cards()
    console.log("deck", deck)
    if (deck.length > 0) {
      console.log("deck length over 0")
            if (isThree === true) {
              return (  
              <div>
                <div> 
                <div className="draw">
                      <Button onClick = {() => shuffleDeck()}>Shuffle Deck</Button>
                      <Button onClick = {() => isDisplayTen()}>Draw Your 10 Cards</Button>
                      <Button onClick = {() => isDisplayThree()}>Draw Your 3 Cards</Button>
                    </div>
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
            }
            else if (isTen === true) {
              return (    
                <div>
                  <div> 
                    <div className="draw">
                      <Button onClick = {() => shuffleDeck()}>Shuffle Deck</Button>
                      <Button onClick = {() => isDisplayTen()}>Draw Your 10 Cards</Button>
                      <Button onClick = {() => isDisplayThree()}>Draw Your 3 Cards</Button>
                    </div>

                  </div>     
                  <Card.Group className="centered">
                  {tenCards.map(card => (
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
            } else {
              return (
                <div className="draw">
                <Button onClick = {() => shuffleDeck()}>Shuffle Deck</Button>
                <Button onClick = {() => isDisplayThree()}>Draw Your 3 Cards</Button>
                <Button onClick = {() => isDisplayTen()}>Draw Your 10 Cards</Button>
              </div>
              )
            }
           } else if (loading === true) {
      return (
        <div>
          <div className="draw">
            <Button onClick = {() => shuffleDeck()}>Shuffle Deck</Button>
            <Button onClick = {() => isDisplayThree()}>Draw Your 3 Cards</Button>
            <Button onClick = {() => isDisplayTen()}>Draw Your 10 Cards</Button>
          </div>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
        </div>
      )
    } else if (shuffling === true) {
      return (
        <div>
          <div className="draw">
            <Button onClick = {() => shuffleDeck()}>Shuffle Deck</Button>
            <Button onClick = {() => isDisplayThree()}>Draw Your 3 Cards</Button>
            <Button onClick = {() => isDisplayTen()}>Draw Your 10 Cards</Button>
          </div>
            <Dimmer active inverted>
              <Loader inverted>Shuffling</Loader>
            </Dimmer>
        </div>
      )
    } else {
      return (
        <div className="draw">
          <Button onClick = {() => shuffleDeck()}>Shuffle Deck</Button>
        </div>
      )
    }
  }
  
  return (
    display()
  );
}

export default CardView;
