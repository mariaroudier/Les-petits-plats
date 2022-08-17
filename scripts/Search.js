export default class Search {
      constructor(recipes) {
            this.recipes = recipes
            this.input = ''
            this.tagIngredients = new Set()
            this.tagAppareils = new Set()
            this.tagUstensils = new Set()
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
                        }
                  });
            } else { // si input.length < 3
                  recipesArray = this.recipes
            }
            let recipesTab = []

            recipesArray.forEach(recipe => {
                  if(recipe.hasAllIngredients(this.tagIngredients)) { // dobavit && avec ustensils etc
                        recipesTab.push(recipe)
                  }
            })

            
            recipesTab.forEach(recipe => {
                  matchedAppareils.push(recipe.appliance)
                  matchedUstensils.push(recipe.ustensils)
                  recipe.ingredients.forEach(elem => {
                        matchedIngredients.push(elem.ingredient)
                  })
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
                        // design & fonctionalité
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
                              this.tagIngredients.add(elem.textContent)
                        } else if (matchedAppareils.includes(elem.textContent)) {
                              boxForChosen.style.backgroundColor = "#68D9A4"
                              this.tagAppareils.add(elem.textContent)
                        } else if (subUtensil.includes(elem.textContent)) {
                              boxForChosen.style.backgroundColor = "#ED6454"
                              this.tagUstensils.add(elem.textContent)
                        }
                        this.toSearchRecipe()

                        // enlever span de la boite choisi
                        croix.addEventListener('click', () => {
                              if(matchedIngredients.includes(elem.textContent)) {
                                    document.getElementById('all-ingredients').appendChild(elem)
                              } else if (matchedAppareils.includes(elem.textContent)) {
                                    document.getElementById('all-appareils').appendChild(elem)
                              } else if(subUtensil.includes(elem.textContent)) {
                                    document.getElementById('all-dishes').appendChild(elem)
                              }
                              document.getElementById('chosen').removeChild(boxForChosen)
                        })

                  })
            

                  
            })
            
            recipesArray.forEach(recipe => { 
                  document.getElementById('recipes-grid').appendChild(recipe.getRecipeDOM());

            })

            
      }

}