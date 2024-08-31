interface CheckedValues {
  value1: number[];
  value2: number;
}

const parsedArgs = (args: string[]): CheckedValues => {
  if (args.length < 10) throw new Error('Not enough arguments');
  if (args.length > 10) throw new Error('Too many arguments');

  let lastArgs = args.pop();
  let arrs = args.slice(2)
  let first = arrs[0].split('[')[1];
  let last = arrs[arrs.length - 1].split(']')[0]
  let resultArray = [first, ...arrs.slice(1, -1), last];

  const weekArray : number[] = []
  for (let value of resultArray){
    if(!isNaN(Number(value))){
      weekArray.push(Number(value));
    }
  }

  if (!isNaN(Number(lastArgs))) {
    return {
      value1: weekArray,
      value2: Number(lastArgs)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

type Rating = 1 | 2 | 3;
type ratingDescription = "Nice! you have a perfect training time." | "not too bad but could be better" | "you exercise times is so bad. check it"

interface ExecerciseControl {
  periodLength:number,
  trainingDays:number,
  success:boolean,
  rating:Rating,
  ratingDescription:ratingDescription,
  target:number,
  average:number
}

const calculateExercises  = (arr : number[] , objetivo:number ): ExecerciseControl => {
  let Trained = { days:0, hours:0, success:false, ratingDescription:"not too bad but could be better", raiting:2  };
  for (let hours of arr){
    if(hours !=0){
      Trained.days += 1
      Trained.hours+= hours
    }
  }
  if ((Trained.hours / arr.length) >= objetivo){
    Trained.success = true;
    Trained.ratingDescription = "Nice! you have a perfect training time.";
    Trained.raiting = 3;
  }
  else if ((Trained.hours / arr.length) <= (objetivo/2)){
    Trained.ratingDescription = "you exercise times is so bad. check it";
    Trained.raiting = 1;
  }

  const Result = {
    periodLength: arr.length as number,
    trainingDays:Trained.days as number,
    success:Trained.success as boolean,
    rating: Trained.raiting as Rating,
    ratingDescription: Trained.ratingDescription as ratingDescription,
    target:objetivo as number,
    average: Trained.hours / arr.length as number
  }
  console.log(Result)
  return Result
}

try{
  let args = process.argv;
const { value1, value2 } = parsedArgs(args); 
calculateExercises( value1,value2 )
}
catch(error:unknown){
  if( error instanceof Error){
    throw new Error(`Something was Wrong: ${error.message}`);
  }
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))
