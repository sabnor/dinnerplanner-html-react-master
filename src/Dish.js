import React, { Component } from 'react';
//import './Welcome.css';
import { Link } from 'react-router-dom';

class Dish extends Component {
  render() {
    return (
      <div className="">
          {/*/ <img className="imgWelcome" src="https://buyer-static.postmates.com/dist/prod/d1cec2a0ebfc3b4eb296a9d3d85aa76a.png"></img>*/}
        <div className="text-center">
          <p className='textSquare lead text-muted'>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
{        this.props.id
}        {/* <Link to="/search">
          <button className="btn btn-warning">Create new dinner</button>
        </Link> */}
        {/* <Sidebar model={this.props.model}/> */}
        </div>
      </div>
    );
  }
}

export default Dish;
