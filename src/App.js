import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import Dish from "./Dish";
import Overview from "./Overview/Overview";
import Print from "./Print/Print";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  

  render() {
    if (localStorage.getItem('numberOfGuests')){
      modelInstance.setNumberOfGuests(localStorage.getItem('numberOfGuests'));
      }
    
    if (JSON.parse(localStorage.getItem('menu'))){
      let parsedMenu = JSON.parse(localStorage.getItem('menu'));
      console.log("Parsed menu: ", parsedMenu)
      modelInstance.overwriteMenu(parsedMenu);
    }else{
      console.log("No localStorage for menu");
    }
    

    return (
      <div className="App">
        <header className="App-header fluid">
          <h1 className="App-title">{this.state.title}</h1>
        </header>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
          <Route path="/overview" render={() => <Overview model={modelInstance}/>}/>
          <Route path="/print" render={() => <Print model={modelInstance}/>}/>
          <Route path="/dish/:id" component={Dish}/>
          
        
      </div>
    );
  }
}

export default App;
