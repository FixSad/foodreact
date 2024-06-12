import {useState, useEffect, Link} from 'react';
import { useParams } from "react-router-dom";
import MealInfo from './MealInfo';

const Meal = (props) =>{
    let { testid } = useParams(); 

    return(
        <>
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
            </div>
            <MealInfo stateid={testid}></MealInfo>
        </>
    )
}

export default Meal;