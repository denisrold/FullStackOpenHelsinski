const Content = ({parts})=>{
    const Part = ({part,exercises})=><p>{part} {exercises}</p>
    return(
      <>
      {parts.map(part=> <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      </>
    )
  }

export default Content;