export default class Search {
      constructor(recipes) {
            this.recipes = recipes
            this.input = ''
      }
      toSearchRecipe(inputValue) {
            this.input = inputValue
      }
}