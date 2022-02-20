const express = require('express')
const axios = require('axios')
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(process.env.BASE_URL+'/', express.static('public'))

app.get(process.env.BASE_URL+'/api/meals/:ingredient', (req, res) => {
   
    const options = {
        method: 'get',
        url: `http://themealdb.com/api/json/v1/1/filter.php?i=${req.params.ingredient}`,
        headers: { }
      };
      
      axios.request(options).then(function (response){
          //console.log(response.data);
          res.send(response.data)
      }).catch(function(error){
          console.error(error);
      });
      
})

app.get(process.env.BASE_URL+'/api/ingredient/getall', (req, res) => {
   
    const options = {
        method: 'get',
        url: `http://themealdb.com/api/json/v1/1/list.php?i=list`,
        headers: { }
      };
      
      axios.request(options).then(function (response){ 
          var ingredientList = response.data.meals.map(ingredient =>{
              return{id:ingredient.idIngredient, text:ingredient.strIngredient}
          })
          //console.log(ingredientList);
          res.send(ingredientList)
      }).catch(function(error){
          console.error(error);
      });
      
})

app.get(process.env.BASE_URL+'/api/meal/:id', (req, res) => {

   
    const options = {
        method: 'get',
        url: `http://themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`,
        headers: { }
      };
      
      axios.request(options).then(function (response){ 
          console.log(JSON.stringify(response.data));
          //console.log(ingredientList);
          res.send(response.data)
      }).catch(function(error){
          console.error(error);
      });
      
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("we are live on port " + port)
})