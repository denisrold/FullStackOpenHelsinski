
export type Operation = 'multiply' | 'add' | 'divide';
type Result = string | number

// const calculator = (a:number,b:number,op:Operation):Result=>{
// if(op==='multiply') a*b;
// else if(op==='add') a+b;
// else if(op==='divide') {
//   if(b===0) return ('cant divide by 0')
//   a/b;
// }
// };

export const calculator = (a: number, b: number, op: Operation) : Result => {
  switch(op) {
     case 'multiply':
       return Number(a) * Number(b);
     case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return Number(a) / Number(b);
     case 'add':
       return Number(a) + Number(b);
     default:
      throw new Error('Operation is not multiply, add or divide!');
  }
 };

 
 try {
   console.log(calculator(1, 5,'divide'));
 } catch (error) {
   let errorMessage = 'Something went wrong: ';
   if (error instanceof Error) {
     errorMessage += error.message;
   }
   console.log(errorMessage);
 };
 