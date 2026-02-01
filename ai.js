import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has
and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention.
The recipe can include additional ingredients, but avoid too many extras.

Format your response as HTML with this structure:
- Use <h2> for the recipe title
- Use <h3> for section headings (Ingredients, Instructions, etc)
- Use <ul> and <li> for ingredient lists
- Use <ol> and <li> for step-by-step instructions
- Use <p> for descriptions

Do NOT include html, head, or body tags. Only return the content HTML.
`;

// Garantir que é uma string
const API_KEY = String(import.meta.env.VITE_HF_API_KEY).trim();

const hf = new InferenceClient(API_KEY); // Passar direto como string

export async function getRecipeFromAI(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  
  try {
    let fullResponse = "";
    
    const stream = hf.chatCompletionStream({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user", 
          content: `I have: ${ingredientsString}. Suggest a recipe!`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        if (newContent) {
          fullResponse += newContent;
        }
      }
    }

    return fullResponse;
    
  } catch (err) {
    console.error("Error generating recipe:", err);
    return "Sorry, couldn't generate a recipe right now.";
  }
}