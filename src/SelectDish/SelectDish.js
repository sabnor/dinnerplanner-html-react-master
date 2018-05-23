import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {
  render() {
    return (
      <div className="SelectDish">
      
        <h2 className="jumbotron-heading">This is the Select Dish screen</h2>
        <p className="lead text-muted">Search for what food u want mate.</p>
        <div className="form-row">
        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Search:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
        <input type="search" value="Search" />
      </form> */}

            <div class="col">
              <select className="form-control" id="chooseDish" onchange="handleChange">
              <option selected value="">ALL</option>
              <option value="starter">Starter</option>
              <option value="side dish">Side dish</option>
              <option value="main dish">Main course</option>
              <option value="dessert">Dessert</option>
              </select>
            </div>
            <div className="col">
              <input type="text" id="filter" class="form-control" placeholder="Filter by dishname"/>
            </div>

            <div className="col">
            <button id="searchButton" type="button-center" class="btn btn-warning">Filter</button>
            </div>

           
          </div>




        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>
        <Dishes type={'side'}/>
      </div>
    );
  }
}

export default SelectDish;
