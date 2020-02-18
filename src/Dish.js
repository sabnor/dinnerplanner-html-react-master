import React, { Component } from 'react';
//import './Welcome.css';
import { Link } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { modelInstance } from './data/DinnerModel';
import Sidebar from './Sidebar/Sidebar';
import { withRouter } from 'react-router'
import './Dish.css';





class Dishes extends Component {
  constructor(props) {
    super(props);    
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL',
      numberOfGuests: modelInstance.getNumberOfGuests(),
      menu: modelInstance.getMenu(),
      menuObject: null
    }
  }

  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    console.log("didMount")
    this.getDishDetailsFunction();
    modelInstance.addObserver(this);
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

  render() {

    let dishDetails = this.state.dishResults;
    let ingredients = null;

    modelInstance.addObserver(this);
    

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case 'INITIAL':
      dishDetails = <em>Loading...</em>
        break;
      case 'LOADED':
      
  

        //Calculate total cost
      let ingredientsss = dishDetails.extendedIngredients
      let totalCost = 0;
      ingredientsss.forEach(ingredient => {
        totalCost += ingredient.measures.metric.amount;
      });
      this.state.menuObject = {title: dishDetails.title, cost: totalCost}
      ingredients = (

      <div id="dishIngredients">

      {dishDetails.extendedIngredients.map((ingredient,i) => (

          <div key={i} className="d-flex justify-content-between">
            <div className="p-2 flex-grow-1 bd-highlight dishIngredientMeasure">
              {Math.round(ingredient.measures.metric.amount*modelInstance.getNumberOfGuests())}&nbsp;{ingredient.measures.metric.unitShort}&nbsp;{ingredient.name}
            </div>
            <div className="p-2 flex-shrink-1 bd-highlight dishIngredientPrice">
            {Math.round(ingredient.measures.metric.amount*modelInstance.getNumberOfGuests())} &nbsp; SEK
            </div>
          </div>
        

      ))}
          <div>TOTAL <p>{Math.round(totalCost*modelInstance.getNumberOfGuests())} SEK </p>
          
        </div>
      </div>
      )


      // function addMenuClick(e) {
      //   e.preventDefault
      // }


        break;
      default:
      dishDetails = <b>Failed to load data, please try again</b>
        break;
    }
    

    return (
      <div className="d-flex bd-highlight">
        <div className="p-2 flex-fill bd-highlight">
        <Sidebar model={modelInstance} />
        </div>
        
      
              <div className="p-2 flex-fill bd-highlight">

                <div className="button">
                  <Link to="/Search">
                    <button type="button-center" className="btn btn-warning">
                          Back to search
                      </button>
                  </Link>
                </div>
                
                <h3>{dishDetails.title}</h3>
                <img src={dishDetails.image}  />
                    <div className="smallTitle"><h5>Instructions:</h5><br/>{dishDetails.instructions}</div>
                      
              
                </div>

                <div className="p-2 w-100 bd-highlight">
                    <div className='superSmallTitle text-center'>Ingredients for {modelInstance.getNumberOfGuests()} people</div>

                    <div className="ingredients text-center">
                      {ingredients}

                    </div>
                    <div className="button text-center">
                      <button id="addDishButton" type="button-center" className="btn btn-warning regularContainer" onClick={()=> {modelInstance.setMenu(this.state.menuObject);}}>Add to menu</button>
                    </div>

                    
                </div>
          
      </div>
    );
  }
}

export default Dishes;