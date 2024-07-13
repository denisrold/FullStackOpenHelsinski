import { Link } from "react-router-dom";
const Landing = () => {
    return (
    <>
    <section>
        <div className="background"></div>
    </section>
    <section >
      <article className="landingPage">
        <h3>Welcome back to:</h3>
        <h1>Bloguerse</h1>
        <span>Find the most popular blogs</span>
        <Link to={'/login'} ><button>Enter</button></Link>
      </article>
    </section>    
    </>
    )
}


export default Landing;