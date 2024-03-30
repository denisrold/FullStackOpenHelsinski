const Total = ({parts})=> {
const totalExcersice = parts.reduce((total,part)=>total+part.exercises,0);
return (<h3>
    Number of exercises {totalExcersice}
</h3>)
}

export default Total;