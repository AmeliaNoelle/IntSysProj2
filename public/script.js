//const { default: axios } = require("axios");
//const axios = require('axios')
//import axios from "axios";
//const instance = axios.create({baseURL:"http://localhost:5000"});

//const { default: axios } = require("axios");

axios.defaults.baseURL="http://localhost:5000";

$(document).ready(function(){
    
    axios.get('api/ingredient/getall').then((response)=>{
        console.log(response.data)
    
        $("#ingredient").select2({
            data: response.data
          })
    })
});
$('#ingredient').on('select2:select', function (e) {
    let theIngredient = e.params.data;
    console.log(theIngredient)

    axios.get('api/meals/'+theIngredient.text).then((response)=>{
        console.log(response.data)

        var mealList = response.data.meals;
       // var mealList = response.data.meals.map(list =>{
       //     return list.strMeal;
       // })

       document.getElementById("meals").innerHTML ="";

        for(let i=0; i<mealList.length; i++){

            // used code from here: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement to learn how to create and insert new divs

            //column container
            const newContainer = document.createElement("div");
            newContainer.className="col-sm";
            newContainer.id="container" +i;

            document.getElementById("meals").appendChild(newContainer);

            //creating the card element
            var mealNumber = mealList[i].idMeal;
            const newCard = document.createElement("div");
            newCard.className= "card";
            newCard.id = mealNumber;
            newCard.style.width ="18rem";
            newCard.style.margin = "2rem";
     

            document.getElementById("container"+i).appendChild(newCard);

            //creating the card title
            const newDiv = document.createElement("div");
           // newDiv.id =mealList[i].idMeal;
            newDiv.className="card-title";
        

            const newContent = document.createTextNode(mealList[i].strMeal);
            newDiv.appendChild(newContent);

            //adding the image to the card
            const newImg = document.createElement("img");
            newImg.className="card-img-top";

            newImg.src=mealList[i].strMealThumb;
           // newImg.appendChild(newImg)

            document.getElementById(mealNumber).appendChild(newImg);
            document.getElementById(mealNumber).appendChild(newDiv);
            
            document.getElementById(mealNumber).addEventListener("click", (e)=>{
                console.log(e.srcElement.parentNode.id);
               // console.log(this);
                axios.get('api/meal/'+e.srcElement.parentNode.id).then((response)=>{
                console.log(response.data);

                window.open(response.data.meals[0].strYoutube), '_blank';

   
            });
            });
        }

       

            //on click send another request to retreive the recipe
         

    })
  });

