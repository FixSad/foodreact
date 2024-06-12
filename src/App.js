import { Link } from 'react-router-dom';
import './App.css';
import MealInfo from './MealInfo';
import {useState, useEffect} from 'react';

const apiURL = "https://www.themealdb.com/api/json/v1/1/random.php";

function App() {
  const [ meal, setMeal] =  useState([]);

  useEffect(() => {
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      setMeal(data.meals[0]);
    })
    .catch(error => console.error(error));
  }, []);
  return (
  <>
    <div class="container">
      <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto
          link-body-emphasis text-decoration-none">
          <span class="fs-4">Home</span>
        </a>

        <ul class="nav nav-pills">
          <li class="nav-item"><Link to={'/'}><button href="#" class="nav-link active"
            aria-current="page">Home</button></Link></li>
          <li class="nav-item"><Link to={'/food'}><button href="#" class="nav-link active" 
            style={{marginLeft: "10px"}}>Food</button></Link></li>
        </ul>
      </header>
      <h1>The Meal of the Day</h1>
      <MealInfo stateid={meal.idMeal}></MealInfo>
    </div>
  </>
  );
}

export default App;