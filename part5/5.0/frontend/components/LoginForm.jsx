import loginService from '../src/services/login';
import noteService from '../src/services/notes'
import BackLoginButton from './BackLoginButton';
import sessionService from '../src/services/sessionStorage';
import { useState } from 'react';
const LoginForm = ({ loginHandle,visible,setVisible,setChangesNotes }) => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const { setUser,setErrorMessage }=loginHandle;

  //LOGIN
  const handleLoggin = async  (event) => {
    event.preventDefault();
    try{
      const userLog = await loginService.login({ username,password });
      sessionService.saveData("tokenExpires", "loggedNoteAppUser");
      sessionService.saveUserSession('loggedNoteAppUser',userLog);
      noteService.setToken(userLog.token);
      setUser(userLog);
      setChangesNotes(true);
      setUsername('');
      setPassword('');
      setErrorMessage(null)
    } catch(err){
      setErrorMessage(err.response.data.error.replace(err.response.data.error[0],err.response.data.error[0].toUpperCase()) + '.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  };

  const handleDemoUser = (e) => {
    e.preventDefault();
    setUsername('rooter');
    setPassword('Password123*');
  }
  return(
    <div className='userFormContainer'>
      <form className="userForm">
        <div>
          <input  data-testid='username' name="Username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} placeholder="Username" />
        </div>
        <div>
          <input data-testid='password' name="Password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} placeholder="Password" />
        </div>
        <button type="submit" name="Login" onClick={handleLoggin}>Login</button>
        <button  onClick={handleDemoUser}>Demo user</button>
      </form>
      <p className='loginToRegister'>Don't have an account yet? <a onClick={() => setVisible(!visible)}>Register.</a></p>
      <BackLoginButton visible={visible} setVisible={setVisible}/>
    </div>)
};

export default LoginForm;