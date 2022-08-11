export default class Search {
      constructor(recipes) {
            this.recipes = recipes
            this.input = ''
            
      }

      toSearchRecipe(inputValue) {
            this.input = inputValue
            let recipesArray = []
            let matchedAppareils = []
            let matchedUstensils = []
            let matchedIngredients = []
            let spans = []
            
            document.getElementById('recipes-grid').innerHTML = ''
            // matching le recipe avec input (titre, description, ingredients)
            if(this.input.length >= 3) {
                  this.recipes.forEach(recipe => {
                        let ingredientsInRecipe = []
                        recipe.ingredients.forEach(elem => {
                              ingredientsInRecipe.push(elem.ingredient)
                        })
                        if(recipe.name.toLowerCase().includes(inputValue) || recipe.description.toLowerCase().includes(inputValue) || ingredientsInRecipe.toString().toLowerCase().includes(inputValue)) {
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
                  recipesArray.forEach(recipe => {
                        matchedAppareils.push(recipe.appliance)
                        matchedUstensils.push(recipe.ustensils)
                        recipe.ingredients.forEach(elem => {
                              matchedIngredients.push(elem.ingredient)
                        })
                  })
                  
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
            let subUtensil = []
            matchedUstensils.forEach(elem => {
                  elem.forEach(subElem => {
                        subUtensil.push(subElem)
                  })
            })

            const setUstensils = new Set(subUtensil)
            document.getElementById('all-dishes').innerHTML = ''
            setUstensils.forEach(ustensil => {
                  let spanUstensil = document.createElement('span')
                  spanUstensil.textContent = ustensil
                  spanUstensil.classList = 'span'
                  spans.push(spanUstensil)
                  document.getElementById('all-dishes').appendChild(spanUstensil)  
            })
            
            // ajouter choisi span dans le searche
            
            
            spans.forEach(elem => {
                  elem.addEventListener('click', () => {
                        const boxForChosen = document.createElement('div')
                              boxForChosen.classList = "box-for-chosen"
                        const croix = document.createElement('span')
                              croix.classList = "fa-regular fa-circle-xmark"
                        document.getElementById('chosen').appendChild(boxForChosen)
                        boxForChosen.appendChild(elem)
                        boxForChosen.appendChild(croix)
                        // changer le couler de la boite
                        if (matchedIngredients.includes(elem.textContent)) {
                              boxForChosen.style.backgroundColor = "#3282F7"
                        } else if (matchedAppareils.includes(elem.textContent)) {
                              boxForChosen.style.backgroundColor = "#68D9A4"
                        } else if (subUtensil.includes(elem.textContent)) {
                              boxForChosen.style.backgroundColor = "#ED6454"
                              
                        }
                        croix.addEventListener('click', () => {
                              if(matchedIngredients.includes(elem.textContent)) {
                                    document.getElementById('all-ingredients').appendChild(elem)
                              } else if (matchedAppareils.includes(elem.textContent)) {
                                    document.getElementById('all-appareils').appendChild(elem)
                              }
                              document.getElementById('chosen').removeChild(boxForChosen)
                        })
                  })
            

                  
            })
            



      }

}