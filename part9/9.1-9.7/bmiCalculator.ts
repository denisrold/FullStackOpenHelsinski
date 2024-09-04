

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


const checkNumbersErrors = (peso:number, altura:number):boolean => {
  if(peso === 0)throw new Error("weight can't be 0");
  if(altura === 0)throw new Error("Height can't be 0");
  if(String(altura).includes('.')) throw new Error('Height must parse in centimeters');
  return true;
};

const calcualator = (peso:number, altura:number) : (string | void) => {
    if(checkNumbersErrors(peso,altura)){
      const heightParse = altura / 100;
      let bmi = peso / (heightParse * heightParse);
      if(bmi < 18.5) return "thinness";
      else if(bmi < 24.99) return "Normal (healthy weight)";
      else if ( bmi < 30) return "overweight";
      else if (bmi >= 30.00) return "obesity";
    } 
};

export default calcualator;

try{

  if(require.main === module){
  const args = process.argv;
    parseArguments(args);
    console.log(calcualator(Number(args[2]), Number(args[3])));
  }
}
catch(error:unknown){
  let errorMessage = 'something was wrong';
  if(error instanceof Error){
    throw new Error(errorMessage +` Error: ${error.message}`);
  }
}
