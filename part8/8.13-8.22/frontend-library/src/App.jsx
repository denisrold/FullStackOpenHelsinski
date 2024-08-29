import { useEffect, useState } from "react";
import Authors from "../components/Authors/Authors";
import Books from "../components/Books/Books";
import NewBook from "../components/NewBook/NewBook";
import Notify from "../components/Notify/Notify";
import { useSubscription } from "@apollo/client";
import Login from "../components/Login/Login";
import Recommend from "../components/Recommend/Recommend";
import { BOOK_ADDED } from "../service/querys";

const App = ({client}) => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  const [errorMessage,setErrorMessage] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem('phonenumbers-user-token');
    if(token){
      setToken(token);
    }
    },[])
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
      // // updateCacheWith(addedPerson)
    }
  }) 

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token&&<button onClick={() => setPage("add")}>add book</button>} 
        {token&&<button onClick={() => setPage("recommend")}>recommend</button>} 
        {!token&&<button onClick={() => setPage("login")}>login</button>}
        {token&&<button onClick={logout}>logout</button>}
      </div>
      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setErrorMessage={notify} />
      <Recommend show={page === "recommend"}/>
      <Login show={page === "login"}  setPage={setPage} errorMessage={errorMessage} setToken={setToken} notify={notify}/>
     <Notify errorMessage={errorMessage} />
    </div>
  );
};

export default App;
