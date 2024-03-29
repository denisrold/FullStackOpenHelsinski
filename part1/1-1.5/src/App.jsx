const App = () => {
  const course = {
  name:'Half Stack application development',
  parts : [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
   {
      name: 'State of a component',
      exercises: 14
    }
  
  ]
}
  const Header = ({course})=><h1>{course}</h1>

  const Content = ({parts})=>{
    const [part1,part2,part3] = parts;
    const Part = ({part,exercises})=><p>{part} {exercises}</p>
    return(
      <>
      <Part part={part1.name} exercises={part1.exercises}/>
      <Part part={part2.name} exercises={part2.exercises}/>
      <Part part={part3.name} exercises={part3.exercises}/>
      </>
    )
  }
  
  const Total = ({parts})=> <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total  parts={course.parts}/>
    </div>
  )
}

export default App