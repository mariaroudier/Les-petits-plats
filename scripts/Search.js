export default class Search {
      constructor(recipes) {
            this.recipes = recipes
            this.input = ''
      }
      toSearchRecipe(inputValue) {
            this.input = inputValue // не удалять
           
            if(this.input.length >= 3) {
                  document.getElementById('recipes-grid').innerHTML = ''
                  let  matchedRecipes = []
                  this.input = inputValue // не удалять

                  this.recipes.forEach(recipe => {
                        if(recipe.name.match(inputValue) || recipe.description.match(inputValue) ) {
                              matchedRecipes.push(recipe.getRecipeDOM())
                              document.getElementById('recipes-grid').appendChild(recipe.getRecipeDOM());
                        }

                  });
                  return document.getElementById('recipes-grid')
                  
                  //console.log(matchedRecipes)

                  //filter, reduce ?
                  //console.log(allRecipes)
                  // if(this.input.match(this.recipes/g)) {
                        
                  //       console.log(this.recipes.name)
                  // }
                 // && this.recipes.contains(this.input) == true
                  // найти в базе есть ли такой рецепт название
                  // allRecipes.push(this.r)


                  // отобразить только те которые совпадают


            }


      }
}