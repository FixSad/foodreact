import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const apiURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

const MealInfo = ({stateid}) =>{
    const [ meal, setMeal] =  useState([]);
    const [ ingredients, setIngredients] =  useState([]);

    useEffect(() => {
        axios
        .get(apiURL + stateid)
        .then(res => {
            setMeal(res.data.meals[0]);
            let tmpArr = [];
            for(var key in res.data.meals[0]){
                if(key.includes("strIngredient") && res.data.meals[0][key] !== "" )
                tmpArr.push(res.data.meals[0][key]);
            }
            setIngredients(tmpArr);
        })
        .catch(err => {
            console.log(err.message);
        });
    })

    return(
    <>
    <h3 class="text-center">{meal.strMeal}</h3>
    <div class="container d-flex mt-4 p-4"> 
        <div class="card mb-3" style={{maxWidth: "1200px"}}> 
            <div class="row g-0"> 
                <div class="col-md-6"> 
                <img src={meal.strMealThumb} class="card-img-top" alt="..."></img>
                </div> 
                <div class="col-md-6"> 
                    <div class="card-body"> 
                        <h5 class="card-title" style={{ textAlign: "justify" }}> 
                          {meal.strInstructions}
                        </h5> 
                        <p class="card-text"> 
                        <div class="card">
                        <div class="card-header">
                          Ingredients
                            </div>
                              
                            <ul class="list-group list-group-flush">
                            {ingredients.map(ingredient => {
                              return <li class="list-group-item">{ingredient}</li>
                            })}
                            </ul>
                        </div>
                        </p> 
                        <p class="card-text"> 
                            <small class="text-muted"> 
                                Last updated now 
                            </small> 
                        </p> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div>
    </>
    )
}

export default MealInfo;