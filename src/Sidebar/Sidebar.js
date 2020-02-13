//Child to SelectDish-component

import React, { Component } from 'react';
import './Sidebar.css';
class Sidebar extends Component {

  constructor(props) {
    super(props)
    console.log(this.props.model)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu()
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
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


  let title = null;
  let cost = 0;
  let totalCost = 0;


  this.state.menu.forEach(dish => {
    title = dish.title;
    cost = dish.measures.metric.amount;
    totalCost += dish.measures.metric.amount;
  });


    return (
      <div className="Sidebar">
        <h3>My dinner</h3>
        <p>
        People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
        <br/>
        Total number of guests: {this.state.numberOfGuests}
        </p>
        <p>
        Dish name: 
        </p>
        <br/>
        <p>
        Cost: <p>{Math.round(cost)} SEK </p>
        </p>
      </div>
    );
  }
}

export default Sidebar;
