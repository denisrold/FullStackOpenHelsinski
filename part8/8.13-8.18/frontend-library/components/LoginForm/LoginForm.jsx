import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../service/querys';

const LoginForm = ({setToken,setError,setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    onCompleted: (data) => {
      setPage('authors')
      const token = data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  const handleDemo =(e)=>{
    e.preventDefault();
  setUsername('denisrol'); 
  setPassword('secret');
  }
    return (
      <div>
        <form onSubmit={submit}>
         <div>
           username <input
             value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
           password <input
             type='password'
             value={password}
             onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button  onClick={handleDemo}> demo </button>
          <button type='submit'>login</button>
        </form>
      </div>
    )
}

export default LoginForm;