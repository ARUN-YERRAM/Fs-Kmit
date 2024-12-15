const { HfInference } = require('@huggingface/inference');
const hf = new HfInference('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');

// Create Prompt
const createPrompt = (mealData) => {
    const { name, calories, ingredients, nutritionalInfo } = mealData;
  
    // Convert ingredients array to a readable string
    const ingredientsList = ingredients.length
      ? ingredients.join(", ")
      : "no specific ingredients";
  
    const { protein, carbs, fat } = nutritionalInfo;
  
    return `Create a ${name} recipe with approximately ${calories} calories. Include the following ingredients: ${ingredientsList}.
    The recipe should meet the following nutritional requirements:
    - Protein: ${protein}
    - Carbs: ${carbs}
    - Fat: ${fat}.
    
    Return only a JSON object in this exact format, with no additional text:
    {
      "name": "meal name",
      "calories": number,
      "ingredients": ["ingredient1", "ingredient2"],
      "nutritionalInfo": {
        "protein": "Xg",
        "carbs": "Xg",
        "fat": "Xg"
      }
    }`;
  };
  
  // Define Routes
  app.post('/api/getmealplan', async (req, res) => {
    console.log("Received request for meal plan");
    try {
      const mealData = req.body;
      console.log("Request Body:", mealData);
  
      // Validate request body
      if (!mealData || !mealData.name || !mealData.calories || !mealData.ingredients || !mealData.nutritionalInfo) {
        return res.status(400).json({ error: "Invalid input. Please provide all required fields." });
      }
  
      // Build the prompt dynamically
      const prompt = createPrompt(mealData);
  
      // Call Hugging Face API with the generated prompt
      const result = await hf.textGeneration({
        model: "tiiuae/falcon-7b-instruct",
        inputs: prompt,
        parameters: {
          max_new_tokens: 300, //limit the tokens
          temperature: 0.7, // randomness of the output
          top_p: 0.95, // considers only tokens whose cumulative probability is <= 0.95.
          return_full_text: false, //only output text , not input and output
          stop: ["}"], //it will stop generating once it encounters }
          do_sample: true, // Enables sampling, which makes the model pick tokens based 
          //on probabilities rather than deterministically choosing the highest probability token
        },
      });
  
  
      /*
      // Parse the output from the model to ensure it's in JSON format
      let mealPlanData;
      try {
        mealPlanData = JSON.parse(result.generated_text);
      } catch (parseError) {
        mealPlanData = { raw_output: result.generated_text, error: "Parsing failed" };
      }
  
      if (mealPlanData && !mealPlanData.error) {
        // Save the meal plan to the database
        const mealPlan = new MealPlan({
          name: mealPlanData.name,
          calories: mealPlanData.calories,
          ingredients: mealPlanData.ingredients,
          nutritionalInfo: mealPlanData.nutritionalInfo,
          description: mealPlanData.description,
          calories_per_item: mealPlanData.calories_per_item
        });
  
        await mealPlan.save();
      }
      */
      console.log(result);
      res.json({ result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });