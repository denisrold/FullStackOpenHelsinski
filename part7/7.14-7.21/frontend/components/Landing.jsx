import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Landing = () => {
  const loggedUserID = useSelector(state => state.user.userId)
    return (
    <>
    <section >
      <article className="landingPage">
      { !loggedUserID && <h3>Welcome to:</h3> }
      { loggedUserID && <h3>Welcome back to:</h3> }
        <h1>Bloguerse</h1>
        <span>Find the most popular blogs</span>
       { !loggedUserID && <Link to={'/login'} ><button>Enter</button></Link> }
       { loggedUserID &&<Link to={'/home'} ><button>Enter</button></Link> }
      </article>
    </section>    
    </>
    )
}


export default Landing;