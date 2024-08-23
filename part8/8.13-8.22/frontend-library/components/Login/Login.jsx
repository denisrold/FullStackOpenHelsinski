import LoginForm from "../LoginForm/LoginForm";
import Notify from "../Notify/Notify";
const Login =({show,errorMessage,setToken,notify,setPage}) => {
  if (!show) {
    return null
  }

  return(
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />
      </div>
  )
}

export default Login;