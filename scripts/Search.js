export default class Search {
      constructor(recipes) {
            this.recipes = recipes
            this.input = ''
            
      }

      toSearchRecipe(inputValue) {
            this.input = inputValue // не удалять
            let recipesArray = []
            let ingredientsInRecipe = [] // all ingredients of all recipes
            let matchedAppareils = [] // подходящие аппареи
            let matchedUstensils = [] //  подходящая посуда
            let matchedIngredients = []
            
            document.getElementById('recipes-grid').innerHTML = ''
            
            // matching le recipe avec input (titre, description, ingredients)
            if(this.input.length >= 3) {
                  this.recipes.forEach(recipe => {
                        recipe.ingredients.forEach(elem => {
                              ingredientsInRecipe.push(elem.ingredient)
                        })
                        
                        if(recipe.name.toLowerCase().match(inputValue) || recipe.description.toLowerCase().match(inputValue) || ingredientsInRecipe.toString().toLowerCase().match(inputValue)) {
                              recipesArray.push(recipe)
                              matchedAppareils.push(recipe.appliance)
                              matchedUstensils.push(recipe.ustensils)
                              recipe.ingredients.forEach(elem => {
                                    matchedIngredients.push(elem.ingredient)
                              })
                        }
                  
                  });
                  
            } else { // si input.length < 3
                  recipesArray = this.recipes
            }
           

            // collecter les ingreients de recipes choisis dans le conteiner
            recipesArray.forEach(recipe => { 
                  document.getElementById('recipes-grid').appendChild(recipe.getRecipeDOM());

            })

            // Set ingredients
            const setIngredients = new Set(matchedIngredients)
            document.getElementById('all-ingredients').innerHTML = ''
            setIngredients.forEach(elem => {
                        let spanIngredient = document.createElement('span')
                        spanIngredient.textContent = elem
                        document.getElementById('all-ingredients').appendChild(spanIngredient)
                        
                  })
            
            // Set appareiles
            const setAppareils = new Set(matchedAppareils)
            document.getElementById('all-appareils').innerHTML = ''
            setAppareils.forEach(appareil => {
                  let spanAppareil = document.createElement('span')
                  spanAppareil.textContent = appareil
                  document.getElementById('all-appareils').appendChild(spanAppareil)
            })

            // Set ustensiles
            let subUtensil = []
            matchedUstensils.forEach(elem => {
                  elem.forEach(subElem => {
                        subUtensil.push(subElem)
                  })
            })

            const setUstensils = new Set(subUtensil)
            document.getElementById('all-diches').innerHTML = ''
            setUstensils.forEach(ustensil => {
                  let spanUstensil = document.createElement('span')
                  spanUstensil.textContent = ustensil
                  document.getElementById('all-diches').appendChild(spanUstensil)  
            })
            
      }

}