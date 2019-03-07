import React, { Component } from 'react';
//import './Welcome.css';
import { Link } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { modelInstance } from './data/DinnerModel';
import Sidebar from './Sidebar/Sidebar';
import { withRouter } from 'react-router'


class Dishes extends Component {
  constructor(props) {
    super(props);    
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }

  // componentWillReceiveProps = () => {
  //   // this.componentDidMount()
  //   this.getDishDetailsFunction();    
  
    
  // }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    console.log("didMount")
    this.getDishDetailsFunction();
  }
  
  getDishDetailsFunction = () => {
    modelInstance.getDishDetails(this.props.match.params.id).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishResults: dishes
      }) 
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
    
  }
  // log(dishes)


  render() {
    let dishDetails = this.state.dishResults;
    
  //   ingredients = this.state.dishResults.ingredients.map((ingredient) =>
  //   {ingredient}
  // )
    
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
      dishDetails = <em>Loading...</em>
        break;
      case 'LOADED':
      
      //dishesList = this.state.dishes
        // dishesList = this.state.dishes.map((dish) =>
       
        // // .map((dish) =>
        
        //   <div >
        //     Ingredients: {}
        //   </div>
        // )
        break;
      default:
      dishDetails = <b>Failed to load data, please try again</b>
        break;
    }


    return (
      <div>
        <Sidebar model={modelInstance}/>
        <h3>{dishDetails.title}</h3>

        <div className="container col">
    <div className="row">


    <div className="col-sm-4">
    <div className="smallTitle">Instructions:{dishDetails.instructions}</div>
    
    <div className="button">
        <Link to="/Search">
          <button type="button-center" className="btn btn-warning">
                Back to search
            </button>
        </Link>
      </div>
   
      </div>

      <div className="col">
        <div className="solid orange regularContainer">
          <div className='superSmallTitle text-center'>Ingredients for <span id="numberOfGuests"></span> people</div>
          <div className="solid">
          </div>
          <span id="ingredientrows"></span>
          <div className="button text-center">
              <button id="addDishButton" type="button-center" className="btn btn-warning regularContainer">Add to menue</button>
          </div>
        </div>
      </div>
    </div>
    </div>
      </div>
    );
  }
}

export default Dishes;