//Dependencies//
import React from "react";
import { Route } from "react-router-dom";

//Styling//
import "./App.css";

//Components//
import Home from "./Components/Views/home";
import Card from "./Components/Views/cardView";
import { Header } from "./Components/Global/Header";

function App(props) {

  return (
    // <GreetingContext.Provider value={{greeting, setGreeting}}>

          <div className="App">  

            <div> 
              <Header />
            </div> 

            <Route exact path="/" component={Home} /> 
            <Route exact path="/card" component={Card} />
               
          </div>

  )
}

export default App;

