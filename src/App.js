import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import Dish from "./Dish";
import Overview from "./Overview/Overview";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header fluid">
          <h1 className="App-title">{this.state.title}</h1>
        </header>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
          <Route path="/overview" render={() => <Overview model={modelInstance}/>}/>
          {/* <Route path="/dish/:id" render={() => <Dish id={"12345hej"} model={modelInstance}/>}/> */}
          <Route path="/dish/:id" component={Dish}/>
          
        
      </div>
    );
  }
}

export default App;
