let express =  require("express"); // get express
const { HfInference } = require('@huggingface/inference');
const hf = new HfInference('<api key here>');

let app = express(); // instance of express

// Add middleware to parse JSON
app.use(express.json());

app.get('/', (req,res)=> {
    res.send(" REached root");
});


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


app.post('/getdietplan',async(req,res) => {
    /*
    get the request
	send data from req to huggingface by creating a prompt , by making an api call, 
	get the response
    */
    //create prompt by sending the req  

 // Define Routes
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
    // res.send(" getting diet plan from hugging face");

  });





    


app.listen(4000,() => {
    console.log(" back end server is listening at port 4000");
});


// get
// post
// delete

/*
app.post('/checkpost',(req,res) =>{
     res.send(" REached check post");
});
app.delete('/deletecheck', (req,res) => {
     res.send(" REached delete check");
});

*/

/*

let http = require('http');

let server = http.createServer((req,res)=>{
    res.end(" Hello there!");
});

server.listen(4000,() => {
    console.log(" Backend server is listening at port 4000");
} );

// get the libraries
//create server, set the port
// server is listening at a port
// api end points 
 //1.
    // talk to hugging face and get info about my meal/diet plan
    // send the response back
//2. 
    //save the reponse in DB

    */