import { recipes } from "/data/recipes.js"
import Recipe from "./scripts/Recipe.js";
import Search from "./scripts/Search.js";

// DOM 
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

//montrer ingredients
function toShowIngredients() {
      if(!chevronIngredient.classList.contains('fa-chevron-up')) {
            showedIngredients.style.display = 'block'
            boxIngredients.style.width = 'auto'
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

// montrer appareiles
function toShowAppareils() {
      if(!chevronAppareils.classList.contains('fa-chevron-up')) {
            showedAppareils.style.display = 'block'
            boxAppareils.style.width = '100%'
            inputAppareils.setAttribute("placeholder", "Rechercher un appareil")
            
      } else if(chevronAppareils.classList.contains('fa-chevron-up')) {
            showedAppareils.style.display = 'none'
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

// montrer dishes
function toShowDishes() {
      if(!chevronDishes.classList.contains('fa-chevron-up')) {
            showedDishes.style.display = 'block'
            boxDishes.style.width = '100%'
            inputDishes.setAttribute("placeholder", "Rechercher un ustensile")
      } else if(chevronDishes.classList.contains('fa-chevron-up')) {
            showedDishes.style.display = 'none'
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




init(); 


