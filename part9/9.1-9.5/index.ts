import express from "express";
import  calcualator  from "./bmiCalculator";

const app = express();

app.get("/hello" , (_req,res)=>{
res.send("Hello FullStack!")
})

app.get("/bmi" , (req,res) : string | void => {
  try{
  const weight = req.query.weight;
  const height = req.query.height;

  if (!weight || !height) {
    res.status(400).json({ error: "Missing parameters" });
  }

  if(!isNaN(Number(weight)) && !isNaN(Number(height))){
    const response = calcualator(Number(weight),Number(height))
    res.status(200).json({ weight, height, bmi:response })
      } 
      else{
        res.status(400).json({ error: "Invalid input" });
      }
    }

  catch(err){
     res.status(500).json({ error: err instanceof Error ? err.message : "malformatted parameters" });
    }
  }
)

app.listen(3003,()=>{console.log('connected')})