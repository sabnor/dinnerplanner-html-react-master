//Parent to Sidebar & Dishes-component

import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'starter'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    event.preventDefault();
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    this.setState({value: event.target.value});
    event.preventDefault();
  }


  render() {
    return (
      <div className="SelectDish">
      
        <h2 className="jumbotron-heading">This is the Select Dish screen</h2>
        <p className="lead text-muted">Search for what food u want mate.</p>
      <form>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="starter">Starter</option>
            <option value="side dish">Side dish</option>
            <option value="main course">Main course</option>
            <option value="dessert">Dessert</option>
          </select>
      </form>

        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>
        <Dishes type={this.state.value}/>
      </div>
    );
  }
}

export default SelectDish;
