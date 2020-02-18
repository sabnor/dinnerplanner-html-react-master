const httpOptions = {
  headers: {'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'}
};

const DinnerModel = function () {

  let numberOfGuests = 4;
  let observers = [];
  let menu = [];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  // Add menu
  this.setMenu = function (dish) {
    menu.push(dish);
    console.log(menu);
    notifyObservers();
  };


  this.getMenu = function () {
    return menu;
  };

    //Github-
  // API Calls

  this.getAllDishes = function (type) {
    const url = "http://sunset.nada.kth.se:8080/iprog/group/39/recipes/search?type="+type+"&number=100&query="//+filter

    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // API Calls

  this.getDishDetails = function (id) {
    const url = "http://sunset.nada.kth.se:8080/iprog/group/39/recipes/"+id+"/information"

    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern
  this.addObserver = function (observer) {
    observers.push(observer);

  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };



  // this.removeObserver = function (observer) {
  //   observers = observers.filter(o => o !== observer);
  // };

  // const notifyObservers = function () {
  //   observers.forEach(o => o.update());
  // };

};




export const modelInstance = new DinnerModel();
