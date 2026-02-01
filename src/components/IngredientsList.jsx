import { forwardRef } from "react";

const IngredientsList = forwardRef(function IngredientsList(props, ref) {
  const ingredientsListItems = props.ingredients.map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  ))

  return (
    <section className="ingredients-list">
      {props.ingredients.length > 0 && <h2 className="ingredients-list__title">Ingredients on hand:</h2>}
      <ul className="ingredients-list__items">
        {ingredientsListItems}
      </ul>

      <div ref={ref} className="get-recipe-container">
        <div className="get-recipe-container__texts">
          <h3 className="get-recipe-container__title">Ready for a recipe?</h3>
          <p className="get-recipe-container__description">Generate a recipe from your list of ingredients (at least 3 ingredients required).</p>
        </div>
        <button 
          className="get-recipe-container__btn" 
          onClick={props.getRecipe}
          disabled={props.loading || props.ingredients.length < 3}
        >
          {props.loading ? (
            <svg
              className="loader"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
            </svg>
          ) : (
            "Get Recipe"
          )}
        </button>
      </div>
    </section>
  )
});

export default IngredientsList;