import { recipes } from "/data/recipes.js"
import Recipe from "./scripts/Recipe.js";
import Search from "./scripts/Search.js";

// DOM 
const recipesGrid = document.getElementById('recipes-grid')
let allRecipes = []
let search;

      // ingredients
const boxIngredients = document.getElementById('box-input-ingredient')
const inputIngredients = document.getElementById('search-ingredient')
const chevronIngredient = document.getElementById('chevron-ingredient')
const showedIngredients = document.getElementById('all-ingredients')
      // appareiles
const boxAppareils = document.getElementById('box-input-appareiles')
const inputAppareils = document.getElementById('search-appareiles')
const chevronAppareils = document.getElementById('chevron-appareiles')
const showedAppareils = document.getElementById('all-appareils')
      // dishes
const boxDishes = document.getElementById('box-input-dishes')
const inputDishes = document.getElementById('search-dishes')
const chevronDishes = document.getElementById('chevron-dishes')
const showedDishes = document.getElementById('all-dishes')


// montrer toute les recettes sur la page
function displayData(recipes) {
      recipes.forEach((recipe) => {
            const recipeModel = new Recipe(recipe);
            allRecipes.push(recipeModel);
            const recipeDOM = recipeModel.getRecipeDOM();
            recipesGrid.appendChild(recipeDOM);
      });
}

function init() {
      displayData(recipes);
      search  = new Search(allRecipes);
}

document.getElementById('search-input').addEventListener('input', (e) => {
      search.toSearchRecipe(e.target.value)
})

//chercher ingredients
function toShowIngredients() {
      if(!chevronIngredient.classList.contains('fa-chevron-up')) {
            showedIngredients.style.display = 'flex'
            boxIngredients.style.width = '100%'
            inputIngredients.setAttribute("placeholder", "Rechercher un ingredient")
      } else if(chevronIngredient.classList.contains('fa-chevron-up')) {
            showedIngredients.style.display = 'none'
            boxIngredients.style.width = '150px'
            inputIngredients.setAttribute("placeholder", "Ingredients")
      }
}

chevronIngredient.addEventListener('click', (e) => {
      toShowIngredients(e)
      chevronIngredient.classList.toggle('fa-chevron-up')
})

if(chevronIngredient.classList.contains('fa-chevron-up')) {
      inputIngredients.addEventListener('focus', (e) => {
            toShowIngredients(e)
      })
}

// chercher appareiles
function toShowAppareils() {
      if(!chevronAppareils.classList.contains('fa-chevron-up')) {
            document.getElementById('all-appareils').style.display = 'flex'
            boxAppareils.style.width = '100%'
            inputAppareils.setAttribute("placeholder", "Rechercher un appareil")
            
      } else if(chevronAppareils.classList.contains('fa-chevron-up')) {
            document.getElementById('all-appareils').style.display = 'none'
            boxAppareils.style.width = '150px'
            inputAppareils.setAttribute("placeholder", "Appareils")
      }
}

chevronAppareils.addEventListener('click', (e) => {
      toShowAppareils(e)
      chevronAppareils.classList.toggle('fa-chevron-up')
})
if(chevronAppareils.classList.contains('fa-chevron-up')) {
      inputAppareils.addEventListener('focus', (e) => {
            toShowAppareils(e)
      })
}

// chercher dishes
function toShowDishes() {
      if(!chevronDishes.classList.contains('fa-chevron-up')) {
            document.getElementById('all-dishes').style.display = 'flex'
            boxDishes.style.width = '100%'
            inputDishes.setAttribute("placeholder", "Rechercher un ustensile")
      } else if(chevronDishes.classList.contains('fa-chevron-up')) {
            document.getElementById('all-dishes').style.display = 'none'
            boxDishes.style.width = '150px'
            inputDishes.setAttribute("placeholder", "Ustensiles")
      }
}

chevronDishes.addEventListener('click', (e) => {
      toShowDishes(e)
      chevronDishes.classList.toggle('fa-chevron-up')
})
if(chevronDishes.classList.contains('fa-chevron-up')) {
      inputDishes.addEventListener('focus', (e) => {
            toShowDishes(e)
      })
}

// choisir un tag

// document.querySelector(".span").addEventListener('click', (e) => {
//       console.log('!!!')
//       toShowDishes(e)
//       // let chosenSpan = document.createElement('div')
//       // chosenSpan.appendChild()
// })

init(); 


