import React, {Component} from 'react';
import './Dishes.css';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';


class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
      status: 'INITIAL'
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.getAllDishes().then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
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
        dishesList = this.state.dishes.map((dish) =>
          <div key={dish.id} className="col-md-4">
            <div className="card mb-4 box-shadow">
              <img className="card-img-top" alt="Thumbnail [100%x225]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22208%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20208%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1638c4fcd6b%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A11pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1638c4fcd6b%22%3E%3Crect%20width%3D%22208%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2266.9375%22%20y%3D%22117.45%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true"/>
              <div className="card-body">
                  <p className="card-text">{dish.title}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">9 mins</small>
                  </div>
                </div>
            {/* <h3 key={dish.id}>{dish.title}</h3> */}

            </div>
          </div>
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
        <h3>Dishes</h3>
        <div>

          {dishesList}
        </div>
      </div>
    );
  }
}

export default Dishes;
