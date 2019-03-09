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
    // let ingredients = dishDetails.extendedIngredients.map((ingredient,i) => {
    //       return ( <div key={i} className="col-md-4">
    //                 {ingredient}
    //               </div>
    //               )
    //             }
    //     )
    let ingredients = dishDetails.extendedIngredients
    console.log(ingredients)
    
//     this.items = dishDetails.extendedIngredients.map((item, key) =>
//     <li key={item.id}>{item.name}</li>
// );

 
    
    return (
      <div>
        <Sidebar model={modelInstance}/>
        <h3>{dishDetails.title}</h3>

        <div className="container col">
              <div className="row">


              <div className="col-sm-4">
              <img src={dishDetails.image}  />
                  <div className="smallTitle"><h5>Instructions:</h5><br/>{dishDetails.instructions}</div>
                  
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
                    <div className='superSmallTitle text-center'>Ingredients for # people</div>
                    <div className="solid"></div>
                    
                    


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