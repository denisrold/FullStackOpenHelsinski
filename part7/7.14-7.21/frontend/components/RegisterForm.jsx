import { useState } from "react"

const RegisterForm = ({username,password,setPassword,setUsername,handleForm,setRegister}) => {
    const [repeatPassword,setRepeatPassword] = useState(false);
    return(
        <form name="LoginForm" className='form'>
        <div>
          <input data-testid='username' required type="text" value={username} onChange={({ target }) => setUsername(target.value)} placeholder='user'></input>
        </div>
        <div>
          <input data-testid='password' required type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder='password'></input>
        </div> 
        <div>
          <input required type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder='repeat password'></input>
        </div>
        <button name="Login" onClick={handleForm}>Register</button>
        <p className="loginToRegister">do you have an account?<a onClick={()=>{setRegister(false)}}> Login.</a></p>
      </form>
    )
}

export default RegisterForm;