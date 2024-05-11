import {useState} from 'react'; 
import blogs from '../src/service/blogs';
const AddBlogs = ()=>{
    const [addState,setAddState] = useState(false);
    const [title,setTitle] =useState("");
    const [url,setUrl] =useState("");
    const [author,setAuthor] =useState("");

    const handleAddBlogs = async (event)=>{
      event.preventDefault();
      const userToken = window.localStorage.getItem('userLogged');
      const JSONPARSE = await JSON.parse(userToken)
      blogs.setToken(JSONPARSE.token);
      const newBlog = {url,title,author};
      try{
        const response =await blogs.createBlogs(newBlog);
        return response;
      }catch(err){
        console.log(err.response.data);
      }
    }
    return(
        <div className='containerAbsolute'>
    <section className={addState?'createContainer':null}>
        {!addState &&(<div className='addNewBLog'><a href='#form' onClick={()=>setAddState(true)}>Add new blog</a></div>)}
          {addState&&(<>
          <header className='addBlogsTitle'>
            <button onClick={()=>setAddState(false)}>x</button>
            <div className='titleAddBlogs'>
              <h3 onClick={()=>setAddState(true)}>Add Blogs</h3>
             </div>
          </header>
          <form id="form" className='form'>
            <div className='formContainer'>
                <label>Title </label>
                <input tipe="text" placeholder='the blogverse title' required name="title" onChange={({target})=>setTitle(target.value)} value={title}/>
                <label>Author </label>
                <input tipe="text" placeholder='Jhon Travis' required name="author" onChange={({target})=>setAuthor(target.value)} value={author}/>
                <label>Url </label>
                <input tipe="url" placeholder='https://exampleweb.com' required onChange={({target})=>setUrl(target.value)} name="url" value={url}/>
            </div>
            <button onClick={handleAddBlogs} type="submit">Add</button>
          </form>
          </>)}
        </section>
        </div>
    )
}
export default AddBlogs;