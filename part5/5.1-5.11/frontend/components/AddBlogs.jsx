import { useState } from 'react';
import blogs from '../src/service/blogs';
import AddedMessage from './AddedMessage';
import Notification from './Notifications';
import Toggable from './Toggable';

const AddBlogs = ({ setNewBlog }) => {
  const [addState,setAddState] = useState(false);
  const [addedState,setAddedState] = useState(false);
  const [title,setTitle] =useState("");
  const [url,setUrl] =useState("");
  const [author,setAuthor] =useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const handleAddBlogs = async (event) => {
    event.preventDefault();
    const userToken = window.localStorage.getItem('userLogged');
    const JSONPARSE = await JSON.parse(userToken)
    blogs.setToken(JSONPARSE.token);
    const newBlog = { url,title,author };
    try {
      await blogs.createBlogs(newBlog);
      setNewBlog(true);
      setAddState(false);
      setAddedState(true);
      setTimeout(() => {
        setAddedState(false);
        setTitle('');
        setUrl('');
        setAuthor('');
      },2000)
    }
    catch(err){
      if(err.response.data.error.includes('Blog validation failed')){
        setErrorMessage(err.response.data.error.split('.')[0].split(':')[2].replace("Path","").split('`').join("").replace(/\(([^)]+)\)/g, '"$1"'));
      }else{
        console.log(err.response.data)
      }
    }
  }
  return(
    <div className='containerAbsolute'>
      {addedState&&<AddedMessage newBlog={ { title,author } }/>}
      <section className={addState?'createContainer':null}>
        <div className='ToggableAddBlogs'>
          <Toggable buttonLabel={'Add Blog'}>
            <form id="form" className='formAdd'>
              <div className='formContainer'>
                <label>Title </label>
                <input type="text" placeholder='the blogverse title' required name="title" onChange={({ target }) => setTitle(target.value)} value={ title }/>
                <label>Author </label>
                <input type="text" placeholder='Jhon Travis' required name="author" onChange={({ target }) => setAuthor(target.value)} value={ author }/>
                <label>Url </label>
                <input type="url" placeholder='https://exampleweb.com' required onChange={({ target }) => setUrl(target.value)} name="url" value={ url }/>
              </div>
              <button onClick={handleAddBlogs} style={{ display:errorMessage&&'none', marginTop:'1.65rem' }} type="submit">Add</button>
              {errorMessage&&<Notification errorMessage={ errorMessage } setErrorMessage={setErrorMessage}/>}
            </form>
          </Toggable>
        </div>
      </section>
    </div>
  )
}
export default AddBlogs;