import Total from "./Total";
import Content from "./Content";
import Header from "./Header";

const Course=({courses})=> {
   
    return ( 
        <>
        {courses.map(course => (
            <div key={course.id}>
                <Header course={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts}/>
            </div>
        ))}
    </>
    )

}

export default Course;