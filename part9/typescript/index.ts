import express from "express";
import { calculator } from './calculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  try{
    const { value1 , value2, op } = req.body;
    if ( !value1 || isNaN(Number(value1)) ) {
       throw new Error('Invalid value 1');
    }
    if ( !value2 || isNaN(Number(value2)) ) {
      throw new Error('Invalid value 1');
    }
    if ( !op ){
      throw new Error('Invalid value 1');
    }
    const result = calculator(value1, value2, op);
    res.status(200).json({ result });
  }
  catch(err){
    let errorMessage = "something was wrong: ";
    if(err instanceof Error)
      errorMessage += err.message;
    res.status(400).json({error: errorMessage});
  }
 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
