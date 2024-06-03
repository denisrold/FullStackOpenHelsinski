import { useState } from 'react';
import blogService from '../src/service/blogs';

const UpdateBlogView = ({setNewBlog,blog,setUpdateBlog}) => {
    const { title,author,url,userId,id } = blog;
    const [updateTitle,setUpdateTitle] = useState(title)
    const [updateAuthor,setUpdateAuthor] = useState(author)
    const [updateUrl,setUpdateUrl] = useState(url);
    
    const handleEdit = async (e) => {
        e.preventDefault();
        const updateBlog = {
            title:updateTitle,
            author:updateAuthor,
            url:updateUrl
        }
        try {
            if(window.confirm("Do you really want to edit this blog?")){
              //get token with userdata
              const getUserToken = window.localStorage.getItem('userLogged');
              const { token } = await JSON.parse(getUserToken);
              blogService.setToken(token);
              await blogService.updateBlogs(id,updateBlog);
              setNewBlog(true);
            }
            else{
              setUpdateBlog({id:'',editState:false})
              return;
            }
          }
          catch(err){
            console.log(err)
        }
        setUpdateBlog({id:'',editState:false});
      };

    const handleCancel = (e) => {
        e.preventDefault();
        setUpdateBlog({id:'',editState:false});
    }
    return (
        <>
           <article className="flexRow">
              <form>
                <input onChange={(e)=>setUpdateTitle(e.target.value)} value={ updateTitle }/>
                  <span>by </span>
                <input onChange={(e)=>setUpdateAuthor(e.target.value)} value={ updateAuthor }/>
                <h5>
                  User: { userId.name }
                </h5>
                <h5>
                  url: <input onChange={(e)=>setUpdateUrl(e.target.value)} value={ updateUrl }/>
                </h5>
                <button name='editBlog' type='submit' onClick={handleEdit}>edit</button>
                <button onClick={handleCancel}>cancel</button>
              </form>
            </article>
        </>
    )
}
export default UpdateBlogView;