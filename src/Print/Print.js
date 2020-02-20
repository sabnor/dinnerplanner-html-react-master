//Child to SelectDish-component

import React, {Component} from 'react';
import './Print.css';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';


class Print extends Component {
  constructor(props) {
    super(props);
    console.log("dishes component init");
    
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL',
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menu: modelInstance.getMenu(),
      totalCost: 0
    }
  }


  
  
  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menu: modelInstance.getMenu()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    modelInstance.setNumberOfGuests(+e.target.value)
  }

  componentWillReceiveProps = () => {
    // this.componentDidMount()
    console.log("update")
    
  
    
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    console.log("didMount")
    modelInstance.addObserver(this);
  }


  
  render() {

    let dishesList = null;

    this.state.menu.forEach(dish => {
      this.state.totalCost += dish.cost;
    });
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    dishesList = (
      <div className="row">
      {this.state.menu.map((dish) => (

          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img className="tumnagel card-img-top" alt="Thumbnail [100%x225]" src={dish.image} data-holder-rendered="true"/>
              <div className="card-body">
                  <p className="card-text">{dish.title}</p>
              </div>
              <div className="smallTitle"><h5>Ingredients:</h5><br/>{JSON.stringify(dish.ingredients)}</div>

              <div className="smallTitle"><h5>Instructions:</h5><br/>{dish.instructions}</div>

            </div>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                {Math.round(dish.cost*this.props.model.getNumberOfGuests())} SEK
              </small>
            </div>
            
            
          </div>
        ))}
        </div>
    )

    return (
      <div  id="menuRow" className="">
        
        <div className="d-flex justify-content-between">
            <div className="p-2 flex-grow-1 bd-highlight">
              <h3>My dinner:&nbsp;{this.state.numberOfGuests}&nbsp;people</h3>
            </div>
            <div className="p-2 flex-shrink-1 bd-highlight">
              <div className="button">
                  <Link to="/search">
                    <button type="button-center" className="btn btn-warning">
                          Go back and edit dinner
                      </button>
                  </Link>
              </div>
            </div>  
        </div>
        <div className="text-center">
        
          {dishesList}

          Total cost: &nbsp; {Math.round(this.state.totalCost*this.props.model.getNumberOfGuests())}&nbsp;SEK
          <div className="button">
            <Link to="/print">
              <button type="button-center" className="btn btn-warning">
                    Print full recipe
                </button>
            </Link>
          </div>
          </div>
      </div>
    );
  }
}

export default Print;
