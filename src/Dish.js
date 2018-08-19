import React, { Component } from 'react';
//import './Welcome.css';
import { Link } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { modelInstance } from './data/DinnerModel'

const Dish = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>

    <div className="container col">
    <div className="row">


    <div className="col-sm-4">
    <div className="smallTitle">Small title </div>
    


      <div className="button">
      <button type="button-center" className="btn btn-warning">Back to search</button>
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

  

)
// class Dish extends Component {
//   render() {
//     return (
//       <div className="">
//           {/*/ <img className="imgWelcome" src="https://buyer-static.postmates.com/dist/prod/d1cec2a0ebfc3b4eb296a9d3d85aa76a.png"></img>*/}
//         <div className="text-center">
//           <p className='textSquare lead text-muted'>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
//           httpsej
//           {this.props.id}
//           {match.params.dish}
//           {/* {this.props.match.params.value} */}
//           {/* {this.pa1rams.id} */}
//         {/* {this.props.match.params.id} 

//         {this.props.location.description}
//         {this.props.match.params.id} 
//         {window.location.href}          */}
//           {/* <Link to="/search">
//           <button className="btn btn-warning">Create new dinner</button>
//         </Link> */}
//         {/* <Sidebar model={this.props.model}/> */}
//         </div>
//       </div>
//     );
//   }
// }
export default Dish;
