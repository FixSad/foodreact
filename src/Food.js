import {useState, useEffect,} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const apiURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const apiAreaURL = "https://www.themealdb.com/api/json/v1/1/categories.php";

const FoodTable = (props) => {
    return(
        <>
        <div class="container">
            <div class="row">
                {props.food.map(function(meal){
                    return(
                        <div class="col-md-4">
                            <div>
                                <div class="card" style={{width: "18rem", marginTop: "20px"}}>
                                    <img src={meal.strMealThumb} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        <h5 class="card-title">{meal.strMeal}</h5>
                                        <p class="card-text">{meal.strInstructions}</p>
                                        <Link to={`id/${meal.idMeal}`}><a href='#'>Full Instruction</a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}  
            </div>
        </div>
        </>
    )
}

function Food() {
    const[searchText, setSearchText] = useState('');
    const[isLangFilter, setIsLangFilter] = useState(false);
    const[food, setFood] = useState([]);
    const[areas, setAreas] = useState([]);
    
    const handleFilter = (event) => {
        console.log();
    }

    useEffect(() => {
        fetch(apiURL + "Beef")
        .then(response => response.json())
        .then(data => {
            setFood(data.meals);
        })
        .catch(error => console.error(error));
    }, []);
    console.log(apiURL);

    useEffect(() => {
        fetch(apiAreaURL)
        .then(response => response.json())
        .then(data => {
            setAreas(data.categories);
        })
        .catch(error => console.error(error));
    }, []);

    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleSelectChange = (event) =>{
        console.log(apiURL + event.target.value);
        axios
          .get(apiURL + event.target.value)
          .then(res => {
            setFood(res.data.meals);
          })
          .catch(err => {
            console.log(err.message);
          });
    }

    const searchedFood = food.filter(function (meal){
        return meal.strMeal.toLowerCase().includes(searchText.toLowerCase());
    });

    return(
        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <span class="fs-4">Home</span>
                </a>

                <ul class="nav nav-pills">
                    <li class="nav-item"><Link to={'/'}><button href="#" class="nav-link active"
                         aria-current="page">Home</button></Link></li>
                    <li class="nav-item"><Link to={'/food'}><button href="#" class="nav-link active" 
                        style={{marginLeft: "10px"}}>Food</button></Link></li>
                </ul>
            </header>
        <div>
            <h1 class='text-center'>Meals</h1>                
            <div class="container">
                <div class="row">
                    <div class="col-sm-4 d-flex justify-content-between">
                        <input type="search" class="form-control rounded"
                           onKeyUp={handleChange} placeholder="Search"
                           id="myInput" style={{ maxWidth:"350px", marginTop: "20px" }} />
                        <select class="form-select" onChange={handleSelectChange} style={{width: "200px", 
                            height: "40px", marginLeft: "20px", marginTop: "20px"}}>
                            {areas.map(function(area){
                                return(
                                    <option value={area.strCategory}>{area.strCategory}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <FoodTable food={searchedFood}></FoodTable>
        </div>
        </div>
    )
}

export default Food;
