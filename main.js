import { recipes } from "/data/recipes.js"
import Recipe from "./scripts/Recipe.js";
import Search from "./scripts/Search.js";

// DOM 
let allRecipes = []
let search;
const inputIngredients = document.getElementById('search-ingredient')
const chevronIngredient = document.getElementById('chevron-ingredient')
const inputAppareils = document.getElementById('search-appareiles')
const chevronAppareils = document.getElementById('chevron-appareiles')
const inputDishes = document.getElementById('search-dishes')
const chevronDishes = document.getElementById('chevron-dishes')


// montrer toute les recettes sur la page
function displayData(recipes) {
      recipes.forEach((recipe) => {
            const recipeModel = new Recipe(recipe);
            allRecipes.push(recipeModel);
      });
}

function init() {
      displayData(recipes);
      search  = new Search(allRecipes);
      search.toSearchRecipe()
}

document.getElementById('search-input').addEventListener('input', (e) => {
      search.toSearchRecipe(e.target.value)
})
inputIngredients.addEventListener('input', (e) => {
      search.toSearchIngredients(e.target.value)
})
inputAppareils.addEventListener('input', (e) => {
      search.toSearchAppareils(e.target.value)
})
inputDishes.addEventListener('input', (e) => {
      search.toSearchUstensils(e.target.value)
})

//montrer tableau avec les tags
function toShowTagsTableau(type) {
      switch(type) {
            case "ingredients" :
                  if(!chevronIngredient.classList.contains('fa-chevron-up')) {
                        inputIngredients.setAttribute("placeholder", "Rechercher un ingredient")
                        document.getElementById('all-ingredients').style.display = 'block'
                        document.getElementById('box-input-ingredient').style.width = 'auto'
                  } else if(chevronIngredient.classList.contains('fa-chevron-up')){
                        document.getElementById('all-ingredients').style.display = 'none'
                        document.getElementById('box-input-ingredient').style.width = '150px'
                        inputIngredients.setAttribute("placeholder", "Ingredients")
                  }
            break
            case "appareils" :
                  if(!chevronAppareils.classList.contains('fa-chevron-up')) {      
                        inputAppareils.setAttribute("placeholder", "Rechercher un appareil")
                        document.getElementById('all-appareils').style.display = 'block'
                        document.getElementById('box-input-appareiles').style.width = 'auto'
                  } else if(chevronAppareils.classList.contains('fa-chevron-up')) {
                        document.getElementById('all-appareils').style.display = 'none'
                        document.getElementById('box-input-appareiles').style.width = '150px'
                        inputAppareils.setAttribute("placeholder", "Appareils")
                  }
            break
            case "ustensils" :
                  if(!chevronDishes.classList.contains('fa-chevron-up')) {
                        inputDishes.setAttribute("placeholder", "Rechercher un ustensile")
                        document.getElementById('all-dishes').style.display = 'block'
                        document.getElementById('box-input-dishes').style.width = 'auto'
                  } else if(chevronDishes.classList.contains('fa-chevron-up')) {
                        document.getElementById('all-dishes').style.display = 'none'
                        document.getElementById('box-input-dishes').style.width = '150px'
                        inputDishes.setAttribute("placeholder", "Ustensiles")
                  }
            break
      }
}

chevronIngredient.addEventListener('click', (e) => {
      toShowTagsTableau("ingredients")
      chevronIngredient.classList.toggle('fa-chevron-up')
})
if(chevronIngredient.classList.contains('fa-chevron-up')) {
      inputIngredients.addEventListener('focus', (e) => {
            toShowTagsTableau("ingredients")
      })
}

chevronAppareils.addEventListener('click', (e) => {
      toShowTagsTableau("appareils")
      chevronAppareils.classList.toggle('fa-chevron-up')
})
if(chevronAppareils.classList.contains('fa-chevron-up')) {
      inputAppareils.addEventListener('focus', (e) => {
            toShowTagsTableau("appareils")
      })
}

chevronDishes.addEventListener('click', (e) => {
      toShowTagsTableau("ustensils")
      chevronDishes.classList.toggle('fa-chevron-up')
})
if(chevronDishes.classList.contains('fa-chevron-up')) {
      inputDishes.addEventListener('focus', (e) => {
            toShowTagsTableau("ustensils")
      })
}

init(); 


