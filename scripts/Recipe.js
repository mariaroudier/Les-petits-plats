
export default class Recipe{
      constructor (data) {
            this.id = data.id
            this.name = data.name
            this.servings = data.servings
            this.ingredients = data.ingredients
            this.time = data.time
            this.description = data.description
            this.appliance = data.appliance
            this.ustensils = data.ustensils
            
      }
      getRecipeDOM(){ // заполнить карточку с рецептом
            const article = document.createElement( 'article' )
                  article.className = "carte-recipe"
                  const photo = document.createElement( 'div' )
                        photo.className = "photo-recipe"
                  const textOfRecipe = document.createElement('div')
                        textOfRecipe.className = "text-of-recipe"
                        const nameAndTime = document.createElement( 'div' ) 
                              nameAndTime.className = "name-and-time"     
                              const nameTitle = document.createElement( 'h2' )
                                    nameTitle.className = "name"
                                    nameTitle.textContent = this.name;
                              const timing = document.createElement( 'span' );
                              const icon = document.createElement( 'i' )
                                    icon.className = "fa-regular fa-clock"
                                    timing.innerHTML = `<i class="fa-regular fa-clock"></i> ${this.time} min`;
                        const ingredientsAndDescription = document.createElement( 'div' );
                              ingredientsAndDescription.className = "ingredients-and-description"
                              const ingredientsP = document.createElement( 'div' )
                              const descriptionP = document.createElement( 'p' )
                                    descriptionP.innerHTML = this.description;
                                    
            
            article.appendChild(photo)
            article.appendChild(textOfRecipe)
                  textOfRecipe.appendChild(nameAndTime)
                        nameAndTime.appendChild(nameTitle)
                        nameAndTime.appendChild(timing)
                  textOfRecipe.appendChild(ingredientsAndDescription)
                        ingredientsAndDescription.appendChild(ingredientsP)
                        ingredientsAndDescription.appendChild(descriptionP)

            // couper le texte
            if (descriptionP.textContent.length > 130) {
                  const newStr = descriptionP.textContent.substring(0,130)
                  descriptionP.textContent = `${newStr}...`
            } 
            // montrer les ingredients avec quantity, unit
            this.ingredients.forEach(ingred => {
                  const stringIngredient = document.createElement('div')
                        ingredientsP.appendChild(stringIngredient)
                  const ingredient = document.createElement('span')
                        stringIngredient.appendChild(ingredient)
                        ingredient.textContent = ingred.ingredient
                        ingredient.style.fontWeight = "700"
                  const quantity = document.createElement('span')
                        stringIngredient.appendChild(quantity)
                        quantity.textContent = ": " + ingred.quantity + " "
                  const unit = document.createElement('span')
                        stringIngredient.appendChild(unit)
                        unit.textContent = ingred.unit
                  if(ingred.hasOwnProperty('quantity') !== true) {
                        stringIngredient.removeChild(quantity)
                  }
                  if(ingred.hasOwnProperty('unit') !== true) {
                        stringIngredient.removeChild(unit)
                  }
            })
            return article;
            
      }

      hasAllIngredients(ingredients) {
            let result = 0
            ingredients.forEach(ingredient => {
                  this.ingredients.forEach(elem => {
                        if(elem.ingredient.toLowerCase().includes(ingredient.toLowerCase())) {
                              result++
                        }
                  })
            })
            return result == ingredients.size
      }
      
      hasAllUstensils(ustensils) {
            let result = 0
            
            ustensils.forEach(ustensil => {
                  this.ustensils.forEach(elem => {
                        if(elem.toLowerCase().includes(ustensil.toLowerCase())) {
                              result++
                        }
                  })

            })
            return result == ustensils.size

      }


      hasAllAppareils(appliances) {
            let result = 0
            appliances.forEach(appliance => {
                  if(this.appliance.toLowerCase().includes(appliance.toLowerCase())) {
                  result++
                  }
            })
            return result == appliances.size
      }



}
