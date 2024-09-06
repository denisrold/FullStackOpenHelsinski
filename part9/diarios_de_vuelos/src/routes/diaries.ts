import express from 'express';
import diaryService from '../service/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
})

router.get('/:id',(req,res)=>{
  const result = diaryService.findById(Number(req.params));
  if(result){
    res.status(200).json({result});
  }
  else{
    res.sendStatus(404);
  }
})

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
})


router.post('/', (req, res) => {
  try{
    const newDiaryEntry = toNewDiaryEntry(req.body);
  
    const { date, weather, visibility, comment } = req.body;
  
    const addedEntry = diaryService.addDiary(
      date,
      weather,
      visibility,
      comment,
    );
    res.json(addedEntry);
  }
  catch(err: unknown){
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;
