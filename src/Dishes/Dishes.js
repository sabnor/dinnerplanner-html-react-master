//Child to SelectDish-component

import React, {Component} from 'react';
import './Dishes.css';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';


class Dishes extends Component {
  constructor(props) {
    super(props);
    console.log("dishes component init");
    
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }

  componentWillReceiveProps = () => {
    // this.componentDidMount()
    this.getAllDishesFunction();
    console.log("update")
    
  
    
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    console.log("didMount")
    this.getAllDishesFunction();
  }

  getAllDishesFunction = () => {
    modelInstance.getAllDishes(this.props.type).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      }) 
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
    //console.log(dishes)
    
  }


  render() {
    let dishesList = null;
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <em>Loading...</em>
        break;
      case 'LOADED':
      console.log("Loaded update "+this.props.type)
      console.log("Loaded update "+this.state.type)


      // console.log("Loaded update "+this.state.dishes)


        dishesList = this.state.dishes.map((dish) =>
        
          <div key={dish.id} className="col-md-4">
          <Link to={"/dish/" + dish.id}>
            <div className="card mb-4 box-shadow">
              <img className="tumnagel card-img-top" alt="Thumbnail [100%x225]" src={"https://spoonacular.com/recipeImages/"+ dish.image} data-holder-rendered="true"/>
              <div className="card-body">
                  <p className="card-text">{dish.title}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{dish.readyInMinutes} min</small>
                  </div>
                </div>
            {/* <h3 key={dish.id}>{dish.title}</h3> */}

            </div>
          </Link>
          </div>
        )
        break;
      default:
        dishesList = <b>Failed to load data, please press the filter button to complete your search</b>
        console.log("update failed"+this.props)
        break;
    }

    return (
      <div className="Dishes">
        <h3>Dishes</h3>
        <div className="row">

          {dishesList}
        </div>
      </div>
    );
  }
}

export default Dishes;
