const multiplicator = (a:number, b:number, printText:string) => {
  console.log(printText,  a * b);
}

multiplicator(2 , 4, 'Multiplied numbers 2 and 4, the result is:');

type Operation = 'multiply' | 'add' | 'divide';
type Result = string | number
// const calculator = (a:number,b:number,op:Operation):Result=>{
// if(op==='multiply') a*b;
// else if(op==='add') a+b;
// else if(op==='divide') {
//   if(b===0) return ('cant divide by 0')
//   a/b;
// }
// };

const calculator = (a: number, b: number, op: Operation) : number => {
  switch(op) {
     case 'multiply':
       return a * b;
     case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
     case 'add':
       return a + b;
     default:
      throw new Error('Operation is not multiply, add or divide!');
  }
 }
 
 try {
   console.log(calculator(1, 5,'divide'));
 } catch (error: unknown) {
   let errorMessage = 'Something went wrong: '
   if (error instanceof Error) {
     errorMessage += error.message;
   }
   console.log(errorMessage);
 }
 
 