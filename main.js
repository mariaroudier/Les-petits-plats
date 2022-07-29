import { recipes } from "/data/recipes.js"
import Recipe from "./scripts/Recipe.js";
import Search from "./scripts/Search.js";

/* DOM */
const recipesGrid = document.getElementById('recipes-grid')
let allRecipes = []
let search;
// отобразить рецепты при загрузке страницы
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
// input search
document.getElementById('search-input').addEventListener('input', (e) => {
      // if(e.target.value.length = 0) {
      //       displayData(recipes) 
      // } 
      search.toSearchRecipe(e.target.value)
})

// input ingredients
document.getElementById('search-ingredient').addEventListener('input', (e) => {
      
      search.toSearchIngredient(e.target.value)
      
})

// input appareils
document.getElementById('search-appareiles').addEventListener('input', (e) => {
      search.toSearchAppareil(e.target.value)
})

// input ustensiles
document.getElementById('search-diches').addEventListener('input', (e) => {
      search.toSearchUstensil(e.target.value)
})



document.getElementById('chevron-ingredient').addEventListener('click', (e) => {
      search.toSearchRecipe(e.target.value)
})

// form.addEventListener('submit',function(ev) {
//       // on arrete l'envoy de forme par default
//       ev.preventDefault() 

// })

init(); 

