export default class Search {
      constructor(recipes) {
            this.recipes = recipes
            this.input = ''
            this.tagIngredients = new Set()
            this.tagAppareils = new Set()
            this.tagUstensils = new Set()
            this.displayedRecipes = []
      }


      toSearchRecipe(inputValue = null) {
            if(inputValue != null) {
                  this.input = inputValue
            }
            let recipesArray = []
            let matchedAppareils = []
            let matchedUstensils = []
            let matchedIngredients = []
            this.displayedRecipes = []

            document.getElementById('recipes-grid').innerHTML = ''
            document.getElementById('chosen').innerHTML = ''
            
            // matching le recipe avec input (titre, description, ingredients)
            if(this.input.length >= 3) {
                  this.recipes.forEach(recipe => {
                        let ingredientsInRecipe = []
                        recipe.ingredients.forEach(elem => {
                              ingredientsInRecipe.push(elem.ingredient)
                        })
                        if(recipe.name.toLowerCase().includes(this.input) || recipe.description.toLowerCase().includes(this.input) || ingredientsInRecipe.toString().toLowerCase().includes(this.input)) {
                              recipesArray.push(recipe)

                        }
                  })
                  
                  if (recipesArray.length == 0) {
                        const boxGridText = document.createElement('div')
                              boxGridText.id = "box-grid-text"
                              boxGridText.style.display = 'flex'
                        const gridText = document.createElement('span')
                              gridText.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
                        document.getElementById('recipes-grid').appendChild(boxGridText)
                        boxGridText.appendChild(gridText)
                  } 

            } else {
                  recipesArray = this.recipes
            }

            
            let recipesTab = []
            recipesArray.forEach(recipe => {
                  if(recipe.hasAllIngredients(this.tagIngredients) 
                  && recipe.hasAllUstensils(this.tagUstensils)
                  && recipe.hasAllAppareils(this.tagAppareils)
                  ) {
                        recipesTab.push(recipe)
                  }
            })

            recipesTab.forEach(recipe => {
                  recipe.ustensils.forEach(ustensil => {
                        matchedUstensils.push(ustensil)
                  })
                  recipe.ingredients.forEach(elem => {
                        matchedIngredients.push(elem.ingredient)
                  })
                  matchedAppareils.push(recipe.appliance)
                  document.getElementById('recipes-grid').appendChild(recipe.getRecipeDOM());
                  
            })

            this.displayIngredients(matchedIngredients)
            this.displayAppareils(matchedAppareils)
            this.displayUstensils(matchedUstensils)
            this.displayTags("ingredients")
            this.displayTags("appareils")
            this.displayTags("ustensils")

            
            this.displayedRecipes = recipesTab
            
      }


      toSearchIngredients(inputValue) {
            let matchedIngredients = []
            this.displayedRecipes.forEach(recipe => {
                  recipe.ingredients.forEach(elem => {
                        if(elem.ingredient.toLowerCase().includes(inputValue)) {
                              matchedIngredients.push(elem.ingredient)
                        }
                  })

            })
            this.displayIngredients(matchedIngredients)
      }

      toSearchAppareils(inputValue) {
            let matchedAppareils = []
            this.displayedRecipes.forEach(recipe => {
                  if(recipe.appliance.toLowerCase().includes(inputValue)) {
                        matchedAppareils.push(recipe.appliance)
                  }

            })
            this.displayAppareils(matchedAppareils)
              
      }

      toSearchUstensils(inputValue) {
            let matchedUstensils = []
            this.displayedRecipes.forEach(recipe => {
                  recipe.ustensils.forEach(ustensil => {
                        if(ustensil.toLowerCase().includes(inputValue)) {
                        matchedUstensils.push(ustensil)
                        }
                  })
            })
            this.displayUstensils(matchedUstensils)
              
      }

      displayIngredients(matchedIngredients) {
            let spans = []
            const setIngredients = new Set(matchedIngredients)
            document.getElementById('all-ingredients').innerHTML = ''
            setIngredients.forEach(elem => {
                  let spanIngredient = document.createElement('span')
                  spanIngredient.textContent = elem
                  spanIngredient.classList = 'span'
                  spanIngredient.addEventListener('click', e => {
                        this.tagIngredients.add(elem)
                        this.toSearchRecipe()
                  })
                  spans.push(spanIngredient)
                  document.getElementById('all-ingredients').appendChild(spanIngredient)
                        
            })
            return spans
      }

      displayAppareils(matchedAppareils) {
            let spans = []
            const setAppareils = new Set(matchedAppareils)
            document.getElementById('all-appareils').innerHTML = ''
            setAppareils.forEach(elem => {
                  let spanAppareil = document.createElement('span')
                  spanAppareil.textContent = elem
                  spanAppareil.classList = 'span'
                  spanAppareil.addEventListener('click', e => {
                        this.tagAppareils.add(elem)
                        this.toSearchRecipe()
                  })
                  spans.push(spanAppareil)
                  document.getElementById('all-appareils').appendChild(spanAppareil)
                        
            })
            return spans
      }

      displayUstensils(matchedUstensils) {
            let spans = []
            const setUstensils = new Set(matchedUstensils)
            document.getElementById('all-dishes').innerHTML = ''
            setUstensils.forEach(elem => {
                  let spanUstensil = document.createElement('span')
                  spanUstensil.textContent = elem
                  spanUstensil.classList = 'span'
                  spanUstensil.addEventListener('click', e => {
                        this.tagUstensils.add(elem)
                        this.toSearchRecipe()
                  })
                  spans.push(spanUstensil)
                  document.getElementById('all-dishes').appendChild(spanUstensil)
                        
            })
            return spans
      }

      displayTags(tags){
            let color = ""
            let list = new Set()
            switch(tags) {
                  case "ingredients" :
                        color = "#3282F7"
                        list = this.tagIngredients
                  break
                  case "appareils" :
                        color = "#68D9A4"
                        list = this.tagAppareils
                  break
                  case "ustensils" :
                        color = "#ED6454"
                        list = this.tagUstensils
                  break
            }
            list.forEach(tag => {
                  const boxForChosen = document.createElement('div')
                        boxForChosen.classList = "box-for-chosen"
                  const croix = document.createElement('span')
                        croix.classList = "fa-regular fa-circle-xmark"
                  document.getElementById('chosen').appendChild(boxForChosen)
                        boxForChosen.textContent = tag
                        boxForChosen.appendChild(croix)
                        boxForChosen.style.backgroundColor = color

                  croix.addEventListener('click', () => {
                        list.delete(tag)
                        document.getElementById('chosen').removeChild(boxForChosen)
                        this.toSearchRecipe()
                  })
            }) 
            
      }


}