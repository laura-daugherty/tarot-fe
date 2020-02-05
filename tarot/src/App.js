//Dependencies//
import React from "react";
import { Route } from "react-router-dom";

//Styling//
import "./App.css";

//Components//
import Home from "./Components/Views/home";
import CardView from "./Components/Views/cardView";
import { Headerbar } from "./Components/Global/Header";

function App(props) {

  return (
    // <GreetingContext.Provider value={{greeting, setGreeting}}>

          <div className="App">  

            <div> 
              <Headerbar />
            </div> 

            <Route exact path="/" component={Home} /> 
            <Route exact path="/card" component={CardView} />
               
          </div>

  )
}

export default App;

