
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
                  article.id = "carte-recipe"
                  const photo = document.createElement( 'img' )
                  const textOfRecipe = document.createElement('div')
                        textOfRecipe.id = "text-of-recipe"
                        const nameAndTime = document.createElement( 'div' ) 
                        nameAndTime.id = "name-and-time"     
                              const nameTitle = document.createElement( 'h2' )
                                    nameTitle.id = "name"
                                    nameTitle.textContent = this.name;
                              const timing = document.createElement( 'span' );
                              const icon = document.createElement( 'i' )
                                    icon.className = "fa-regular fa-clock"
                                    timing.innerHTML = `<i class="fa-regular fa-clock"></i> ${this.time} min`;
                        const ingredientsAndDescription = document.createElement( 'div' );
                        ingredientsAndDescription.id = "ingredients-and-description"
                              const ingredientsP = document.createElement( 'p' )
                              const descriptionP = document.createElement( 'p' )
                                    descriptionP.innerHTML = this.description;
                                    descriptionP.id = "description-p"
            
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
            
            // отобразить правильно ингредиенты в описании
            const stringIngredient = []
            this.ingredients.forEach((ingred) => {
                        if(ingred.hasOwnProperty('quantity') == true && ingred.hasOwnProperty('unit') == true) {
                              stringIngredient.push(`<br/>${ingred.ingredient}: ${ingred.quantity} ${ingred.unit}`)
                        } else if(ingred.hasOwnProperty('quantity') == true && ingred.hasOwnProperty('ingredient') == true) {
                              stringIngredient.push(`<br/>${ingred.ingredient}: ${ingred.quantity}`)
                        } else if(ingred.hasOwnProperty('ingredient') == true) {
                              stringIngredient.push(`<br/>${ingred.ingredient}`)
                        } 
                  ingredientsP.innerHTML = stringIngredient
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


      // hasAllAppareils(appliance) {
      //       let result = 0
      //       console.log(this.appliance)
      //       if(this.appliance.toLowerCase().includes(appliance.toLowerCase())) {
      //             result++
                  
      //       }

      //       return result == appliance.size
      // }



}
