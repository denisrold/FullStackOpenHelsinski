import { useState } from 'react';
import blogService from '../src/service/blogs';
import Notification from './Notifications';

const UpdateBlogView = ({errorMessage,setErrorMessage,setNewBlog,blog,setUpdateBlog}) => {
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
              setUpdateBlog({id:'',editState:false});
            }
            else{
              setUpdateBlog({id:'',editState:false})
              return;
            }
          }
          catch(err){
            setErrorMessage(err.response.data.error.split('.')[0].split(':')[2].replace("Path","").split('`').join("").replace(/\(([^)]+)\)/g, '"$1"'));
            console.log(err)
        }
      };

    const handleCancel = (e) => {
        e.preventDefault();
        setUpdateBlog({id:'',editState:false});
    }
    return (
        <>
           <article className="flexRow">
              <form>
                <input data-testid='updateTitle' onChange={(e)=>setUpdateTitle(e.target.value)} value={ updateTitle }/>
                  <span>by </span>
                <input data-testid='updateAuthor' onChange={(e)=>setUpdateAuthor(e.target.value)} value={ updateAuthor }/>
                <h5>
                  User: { userId.name }
                </h5>
                <h5>
                  url: <input data-testid='updateUrl' onChange={(e)=>setUpdateUrl(e.target.value)} value={ updateUrl }/>
                </h5>
                {errorMessage&&<Notification errorMessage={ errorMessage } setErrorMessage={setErrorMessage}/>}
                {!errorMessage&&(<>
                    <button data-testid='editBlog' type='submit' onClick={handleEdit}>edit</button>
                    <button onClick={handleCancel}>cancel</button>
                </>)}
              </form>
            </article>
        </>
    )
}
export default UpdateBlogView;