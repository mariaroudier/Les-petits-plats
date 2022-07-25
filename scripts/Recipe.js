
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
      getRecipeDOM(){
          
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
      
            // couper les strings - tried to make a function but it did not work
            if (descriptionP.textContent.length > 130) {
                  const newStr = descriptionP.textContent.substring(0,130)
                  descriptionP.textContent = `${newStr}...`
            } 
            
            const stringIngred = []
            this.ingredients.forEach((ingred) => {
                        if(ingred.hasOwnProperty('quantity') == true && ingred.hasOwnProperty('unit') == true) {
                              stringIngred.push(`<br/>${ingred.ingredient}: ${ingred.quantity} ${ingred.unit}`)
                        } else if(ingred.hasOwnProperty('quantity') == true && ingred.hasOwnProperty('ingredient') == true) {
                              stringIngred.push(`<br/>${ingred.ingredient}: ${ingred.quantity}`)
                        } else if(ingred.hasOwnProperty('ingredient') == true) {
                              stringIngred.push(`<br/>${ingred.ingredient}`)
                        } 
                  //ingredientsP.textContent = ingred.ingredient
                  ingredientsP.innerHTML = stringIngred
                 
            })
      
      
      
            return article;
          }


}
