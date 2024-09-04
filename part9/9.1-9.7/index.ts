import express from "express";
import  calcualator  from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello" , (_req,res)=>{
res.send("Hello FullStack!");
});

app.get("/bmi" , (req,res) : string | void => {
  try{
  const weight = req.query.weight;
  const height = req.query.height;

  if (!weight || !height) {
    res.status(400).json({ error: "Missing parameters" });
  }

  if(!isNaN(Number(weight)) && !isNaN(Number(height))){
    const response = calcualator(Number(weight),Number(height));
    res.status(200).json({ weight, height, bmi:response });
      } 
      else{
        res.status(400).json({ error: "Invalid input" });
      }
    }

  catch(err){
     res.status(500).json({ error: err instanceof Error ? err.message : "malformatted parameters" });
    }
  }
);

app.post("/exercises",(req,res)=>{
  try{
    const { daily_exercises , target} = req.body;
    if(!daily_exercises.length)throw new Error("parameters missing");
    if(daily_exercises.length > 7) throw new Error("excercise days have more numbers than a week.");
    if(!target)throw new Error("parameters missing");
    for (let num of daily_exercises){
      if(isNaN(num)) throw new Error("Daily Exercises values has to be numbers.");
    };
    const response = calculateExercises(daily_exercises , target);
    res.status(200).json(response);
  }
  catch(err){
    res.status(400).json({error: err instanceof Error ? err.message : "malformatted parameters" });
  }
});

app.listen(3003,()=>{console.log('connected');});