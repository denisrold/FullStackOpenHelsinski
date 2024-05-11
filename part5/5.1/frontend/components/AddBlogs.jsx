import {useState} from 'react'; 
const AddBlogs = ()=>{
    const [addState,setAddState] = useState(false);
    const [title,setTitle] =useState("");
    const [url,setUrl] =useState("");
    const [author,setAuthor] =useState("");
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
            <button type="submit">Add</button>
          </form>
          </>)}
        </section>
        </div>
    )
}
export default AddBlogs;