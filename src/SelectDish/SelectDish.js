//Parent to Sidebar & Dishes-component

import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {type: 'starter', filter: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({type: event.target.value, filter:event.target.value});
    event.preventDefault();
  }

  handleSubmit(event) {
    this.setState({type: event.target.value, filter:event.target.value});
    event.preventDefault();
  }


  render() {
    return (
      <div className="SelectDish">
      {/* We pass the model as property to the Sidebar component */}
      <Sidebar model={this.props.model}/>
      
        <h2 className="jumbotron-heading">This is the Select Dish screen</h2>
        <p className="lead text-muted">Search for what food u want mate.</p>
      <form>
        <div className="form-row">
        <div className="col">
          <select class="form-control" value={this.state.value} onChange={this.handleChange}>
            <option value="starter">Starter</option>
            <option value="side dish">Side dish</option>
            <option value="main course">Main course</option>
            <option value="dessert">Dessert</option>
          </select>
          </div>

          <div className="col">
            <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" placeholder="Filter by dishname"></input>
          </div>

          <div className="col">
            <button type="button-center" className="btn btn-warning" onSubmit={this.handleSubmit}>Filter</button>
          </div>
        </div>  
      </form>

        
        <Dishes type={this.state.type} filter={this.state.filter}/>
      </div>
    );
  }
}

export default SelectDish;
