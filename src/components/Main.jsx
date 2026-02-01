import { useState, useEffect, useRef } from "react";
import IngredientsList from "./IngredientsList";
import Receipe from "./Recipe";
import { getRecipeFromAI } from "../../ai";

export default function Main() {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([])
  const [recipe, setRecipe] = useState("");

  const recipeSectionRef = useRef(null)

  function addNewIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
  }

  async function getRecipe() {
    setLoading(true);  
    const recipeMarkdown = await getRecipeFromAI(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false); 
  }

  useEffect(() => {
    if (recipe && recipeSectionRef.current) {
      const offset = 20;
      const elementTop = recipeSectionRef.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  }, [recipe]);


  return (
    <main>
      <form
        action={addNewIngredient}
        className="add-ingredient-form"
      >
        <input
          className="add-ingredient-form__input"
          type="text"
          aria-label="Add ingredient"
          placeholder="e.g. oregano"
          name="ingredient"
        />
        <button
          className="add-ingredient-form__button"
        >
          Add ingredient
        </button>
      </form>

      <IngredientsList 
        ref={recipeSectionRef}
        ingredients={ingredients} 
        loading={loading}
        getRecipe={getRecipe} 
      />

      {recipe && <Receipe recipe={recipe} />}
    </main>
  )
}