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
            let spans = []
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
                        if(recipe.name.toLowerCase().includes(inputValue) || recipe.description.toLowerCase().includes(inputValue) || ingredientsInRecipe.toString().toLowerCase().includes(inputValue)) {
                              recipesArray.push(recipe)
                        }
                  });
            } else {
                  recipesArray = this.recipes
            }

            // // si le recipe a cette ingredient/ustensil/appareil
            
            let recipesTab = []
            recipesArray.forEach(recipe => {
                  if(recipe.hasAllIngredients(this.tagIngredients) 
                  && recipe.hasAllUstensils(this.tagUstensils)
                  // && recipe.hasAllAppareils(this.tagAppareils)
                  ) { // dobavit && avec ustensils etc
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


            // Set ingredients
            const setIngredients = new Set(matchedIngredients)
            document.getElementById('all-ingredients').innerHTML = ''
            setIngredients.forEach(elem => {
                  let spanIngredient = document.createElement('span')
                  spanIngredient.textContent = elem
                  spanIngredient.classList = 'span'
                  spans.push(spanIngredient)
                  document.getElementById('all-ingredients').appendChild(spanIngredient)
                        
            })
            
            // Set appareiles
            const setAppareils = new Set(matchedAppareils)
            document.getElementById('all-appareils').innerHTML = ''
            setAppareils.forEach(appareil => {
                  let spanAppareil = document.createElement('span')
                  spanAppareil.textContent = appareil
                  spanAppareil.classList = 'span'
                  spans.push(spanAppareil)
                  document.getElementById('all-appareils').appendChild(spanAppareil)
            })

            // Set ustensiles

            const setUstensils = new Set(matchedUstensils)
            document.getElementById('all-dishes').innerHTML = ''
            setUstensils.forEach(ustensil => {
                  let spanUstensil = document.createElement('span')
                  spanUstensil.textContent = ustensil
                  spanUstensil.classList = 'span'
                  spans.push(spanUstensil)
                  document.getElementById('all-dishes').appendChild(spanUstensil)  
            })
            
            // design & fonctionalité
            this.tagIngredients.forEach(ingredient => {
                  const boxForChosen = document.createElement('div')
                        boxForChosen.classList = "box-for-chosen"
                  const croix = document.createElement('span')
                        croix.classList = "fa-regular fa-circle-xmark"
                  document.getElementById('chosen').appendChild(boxForChosen)
                        boxForChosen.textContent = ingredient
                        boxForChosen.appendChild(croix)
                        boxForChosen.style.backgroundColor = "#3282F7"

                  croix.addEventListener('click', () => {
                        this.tagIngredients.delete(ingredient)
                        document.getElementById('chosen').removeChild(boxForChosen)
                        this.toSearchRecipe()
                  })
            })   
            this.tagAppareils.forEach(appareil => {
                  const boxForChosen = document.createElement('div')
                        boxForChosen.classList = "box-for-chosen"
                  const croix = document.createElement('span')
                        croix.classList = "fa-regular fa-circle-xmark"
                  document.getElementById('chosen').appendChild(boxForChosen)
                        boxForChosen.textContent = appareil
                        boxForChosen.appendChild(croix)
                        boxForChosen.style.backgroundColor = "#68D9A4"

                  croix.addEventListener('click', () => {
                        this.tagAppareils.delete(appareil)
                        document.getElementById('chosen').removeChild(boxForChosen)
                        this.toSearchRecipe()
                  })
            })      
            this.tagUstensils.forEach(ustensil => {
                  const boxForChosen = document.createElement('div')
                        boxForChosen.classList = "box-for-chosen"
                  const croix = document.createElement('span')
                        croix.classList = "fa-regular fa-circle-xmark"
                  document.getElementById('chosen').appendChild(boxForChosen)
                        boxForChosen.textContent = ustensil
                        boxForChosen.appendChild(croix)
                        boxForChosen.style.backgroundColor = "#ED6454"

                  croix.addEventListener('click', () => {
                        this.tagUstensils.delete(ustensil)
                        document.getElementById('chosen').removeChild(boxForChosen)
                        this.toSearchRecipe()
                  })
            })    
                  

            // ajouter choisi span dans le searche
            spans.forEach(elem => {
                  elem.addEventListener('click', () => {
                        if (matchedIngredients.includes(elem.textContent)) {
                              
                              this.tagIngredients.add(elem.textContent)

                        } else if (matchedAppareils.includes(elem.textContent)) {
                              this.tagAppareils.add(elem.textContent)
                              
                        } else if (matchedUstensils.includes(elem.textContent)) {
                              this.tagUstensils.add(elem.textContent)
                        }
                        this.toSearchRecipe()
                        
                  })
            })

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

}