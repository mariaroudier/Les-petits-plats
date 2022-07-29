export default class Search {
      constructor(recipes) {
            this.recipes = recipes
            this.input = ''
            
      }

      

      toSearchRecipe(inputValue) {
            this.input = inputValue // не удалять
            let recipes = []
            document.getElementById('recipes-grid').innerHTML = ''
            document.getElementById('all-ingredients').innerHTML = ''
            if(this.input.length >= 3) {
                  this.recipes.forEach(recipe => {
                        let arrayOfIngredients = [];
                        recipe.ingredients.forEach(elemIngredient => {
                              arrayOfIngredients.push(elemIngredient.ingredient)
                        })

                        // search matching
                        if(recipe.name.toLowerCase().match(inputValue) || recipe.description.toLowerCase().match(inputValue) || arrayOfIngredients.toString().toLowerCase().match(inputValue) ) {
                              recipes.push(recipe)
                        }

                  });
            } else {
                  recipes = this.recipes
            }
            recipes.forEach(recipe => { 
                  document.getElementById('recipes-grid').appendChild(recipe.getRecipeDOM());
                  recipe.ingredients.forEach(ingredient => {
                        let span = document.createElement('span')
                        span.textContent = ingredient.ingredient
                        document.getElementById('all-ingredients').appendChild(span)
                  })
            })
            

      }

      toSearchIngredient(inputValue) {
            this.input = inputValue // не удалять
           
            if(this.input.length >= 3) {
                  document.getElementById('recipes-grid').innerHTML = ''
                  this.recipes.forEach(recipe => {
                        // to get les ingredients
                        let arrayOfIngredients = []
                        recipe.ingredients.forEach(elemIngredient => {
                              arrayOfIngredients.push(elemIngredient.ingredient)
                        })

                        if(arrayOfIngredients.toString().toLowerCase().match(inputValue)) {
                              document.getElementById('recipes-grid').appendChild(recipe.getRecipeDOM());
                        }
                  });
                  return document.getElementById('recipes-grid')
            }


      }

      toSearchAppareil(inputValue) {
            this.input = inputValue // не удалять

            if(this.input.length >= 3) {
                  document.getElementById('recipes-grid').innerHTML = ''
                  this.recipes.forEach(recipe => {
                        if(recipe.appliance.toString().match(inputValue)) {
                              document.getElementById('recipes-grid').appendChild(recipe.getRecipeDOM());
                        }
                  });
                  return document.getElementById('recipes-grid')


            }
      }

      toSearchUstensil(inputValue) {
            this.input = inputValue // не удалять

            if(this.input.length >= 3) {
                  document.getElementById('recipes-grid').innerHTML = ''
                  this.recipes.forEach(recipe => {
                        if(recipe.ustensils.toString().toLowerCase().match(inputValue)) {
                              document.getElementById('recipes-grid').appendChild(recipe.getRecipeDOM());
                        }
                  });
                  return document.getElementById('recipes-grid')


            }
      }

}