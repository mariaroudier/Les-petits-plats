import { recipes } from "/data/recipes.js"
import Recipe from "./scripts/Recipe.js";
import Search from "./scripts/Search.js";

/* DOM */
const recipesGrid = document.getElementById('recipes-grid')
let allRecipes = []
let search;

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


init(); 

