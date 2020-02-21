//Child to SelectDish-component

import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
class Sidebar extends Component {

  constructor(props) {
    super(props)
    console.log(this.props.model)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu(),
      totalCost: 11
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)

  //   if (localStorage.getItem('numberOfGuests')){
  //     this.props.model.setNumberOfGuests(localStorage.getItem('numberOfGuests'));
  //     }
    
  //   if (JSON.parse(localStorage.getItem('menu'))){
  //     let parsedMenu = JSON.parse(localStorage.getItem('menu'));
  //     console.log("Parsed menu: ", parsedMenu)
  //     this.props.model.setMenu(parsedMenu);
  //   }else{
  //     console.log("No localStorage for menu");
  //   }
    
   }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  


  render() {


  let displayMenu = null;
  let confirmDinnerButton = null;
  let totalCost = 0;
  
  if (this.state.menu.length === 0) {
    console.log("Menu is empty")
    displayMenu = (
      <div id="menu">
        Add a dish to the menu
      </div>
    )
  } else {
    this.state.menu.forEach(dish => {
      totalCost += dish.cost;
      console.log(dish.title, dish.cost);
    });
  
    displayMenu = (
    <div id="menu">
  
    {this.state.menu.map((dish) => (
  
            <div>
              <button type="button" className="close" aria-label="Close" onClick={()=> {this.props.model.removeFromMenu(dish);}}>
                <span aria-hidden="true">&times;</span>
              </button>
              {dish.title}&nbsp;{Math.round(dish.cost*this.props.model.getNumberOfGuests())} SEK
            </div>
  
        ))}
            <div>TOTAL <p>{Math.round(totalCost*this.props.model.getNumberOfGuests())} SEK </p>
            
          </div>
    </div>
    )
  }

  // this.state.menu.forEach(dish => {
  //   totalCost += dish.cost;
  //   console.log(dish.title, dish.cost);
  // });

  // displayMenu = (
  // <div id="menu">

  // {this.state.menu.map((dish) => (

  //         <div>
  //           {dish.title}&nbsp;{Math.round(dish.cost*this.props.model.getNumberOfGuests())} SEK
  //         </div>

  //     ))}
  //         <div>TOTAL <p>{Math.round(totalCost*this.props.model.getNumberOfGuests())} SEK </p>
          
  //       </div>
  // </div>
  // )
    
      
      if (this.state.menu.length === 0) {

        confirmDinnerButton = (
        <div className="button">
          <Link to="/overview">
            <button type="button-center" className="btn btn-warning" disabled>
                  Confirm dinner
              </button>
          </Link>
        </div>
        )
      } else {
        confirmDinnerButton = (
        <div className="button">
          <Link to="/overview">
            <button type="button-center" className="btn btn-warning">
                  Confirm dinner
              </button>
          </Link>
        </div>
  )
  
      }
      
    
  


    return (
      <div className="Sidebar">
        <h3>My dinner</h3>
        <p>
        People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        <br/>
        Total number of guests: {this.state.numberOfGuests}
        </p>
        {displayMenu}

        {confirmDinnerButton}
       </div>
    );
  }
}

export default Sidebar;
