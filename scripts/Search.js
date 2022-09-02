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
                  for (let i = 0; i < this.recipes.length; i++) {
                        let ingredientsInRecipe = []
                        for (let l = 0; l < this.recipes[i].ingredients.length; l++) {
                              ingredientsInRecipe.push(this.recipes[i].ingredients[l].ingredient)
                        }
                        if(this.recipes[i].name.toLowerCase().includes(this.input) || this.recipes[i].description.toLowerCase().includes(this.input) || ingredientsInRecipe.toString().toLowerCase().includes(this.input)){
                              recipesArray.push(this.recipes[i])
                        }
                  }
                  // montrer le message d'erreur
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
            
            // recuperer les recettes correspondant le demande
            let recipesTab = []
            for(let i = 0; i < recipesArray.length; i++) {
                  if(recipesArray[i].hasAllIngredients(this.tagIngredients) 
                  && recipesArray[i].hasAllUstensils(this.tagUstensils)
                  && recipesArray[i].hasAllAppareils(this.tagAppareils)){
                        recipesTab.push(recipesArray[i])
                  }
            }
            // recuperer les ingredients, appareils et ustensils de recettes dans un array
            for (let i = 0; i < recipesTab.length; i++) {
                  for (let l = 0; l < recipesTab[i].ustensils.length; l++){
                        matchedUstensils.push(recipesTab[i].ustensils[l])
                  }
                  for (let b = 0; b < recipesTab[i].ingredients.length; b++){
                        matchedIngredients.push(recipesTab[i].ingredients[b].ingredient)
                  }
                  matchedAppareils.push(recipesTab[i].appliance)
                  // mettre la recette dans le grid
                  document.getElementById('recipes-grid').appendChild(recipesTab[i].getRecipeDOM());
            }
            this.displayIngredients(matchedIngredients)
            this.displayAppareils(matchedAppareils)
            this.displayUstensils(matchedUstensils)
            this.displayTags("ingredients")
            this.displayTags("appareils")
            this.displayTags("ustensils")
            this.displayedRecipes = recipesTab
      }
// chercher un ingredient sur la boite par input
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
// chercher un appareil sur la boite par input
      toSearchAppareils(inputValue) {
            let matchedAppareils = []
            this.displayedRecipes.forEach(recipe => {
                  if(recipe.appliance.toLowerCase().includes(inputValue)) {
                        matchedAppareils.push(recipe.appliance)
                  }
            })
            this.displayAppareils(matchedAppareils)
      }
// chercher un ustensil sur la boite par input
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
// montrer les ingredients dans la boite de recettes
      displayIngredients(matchedIngredients) {
            const setIngredients = new Set(matchedIngredients)
            document.getElementById('all-ingredients').innerHTML = ''
            for (let span of setIngredients) {
                  let spanIngredient = document.createElement('span')
                  spanIngredient.textContent = span
                  spanIngredient.classList = 'span'
                  document.getElementById('all-ingredients').appendChild(spanIngredient)
                  spanIngredient.addEventListener('click', e => {
                        this.tagIngredients.add(span)
                        this.toSearchRecipe()
                  })
            }
      }

// montrer les appareils dans la boite de recettes
      displayAppareils(matchedAppareils) {
            const setAppareils = new Set(matchedAppareils)
            document.getElementById('all-appareils').innerHTML = ''
            for (let span of setAppareils) {
                  let spanAppareil = document.createElement('span')
                  spanAppareil.textContent = span
                  spanAppareil.classList = 'span'
                  document.getElementById('all-appareils').appendChild(spanAppareil)
                  spanAppareil.addEventListener('click', e => {
                        this.tagAppareils.add(span)
                        this.toSearchRecipe()
                  })
            }
      }
// montrer les ustensils dans la boite de recettes
      displayUstensils(matchedUstensils) {
            const setUstensils = new Set(matchedUstensils)
            document.getElementById('all-dishes').innerHTML = ''
            for (let span of setUstensils) {
                  let spanUstensil = document.createElement('span')
                  spanUstensil.textContent = span
                  spanUstensil.classList = 'span'
                  document.getElementById('all-dishes').appendChild(spanUstensil)
                  spanUstensil.addEventListener('click', e => {
                        this.tagUstensils.add(span)
                        this.toSearchRecipe()
                  }) 
            }
      }
// la creation de design de tags
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
