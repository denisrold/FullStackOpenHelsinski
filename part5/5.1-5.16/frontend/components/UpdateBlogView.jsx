import {useState} from 'react';
const UpdateBlogView = ({blog,setUpdateBlog}) => {
    const { title,author,userId,url } = blog;
    const [updateTitle,setUpdateTitle] = useState(title)
    const [updateAuthor,setUpdateAuthor] = useState(author)
    const [updateUserNameId,setUpdateuserNameId] = useState(userId.name)
    const [updateUrl,setUpdateUrl] = useState(url);
    
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            if(window.confirm("Do you really want to edit this blog?")){
              //get token with userdata
              const getUserToken = window.localStorage.getItem('userLogged');
              const { token } = await JSON.parse(getUserToken);
              blogService.setToken(token);
              await blogService.updateBlogs(id);
              setNewBlog(true);
            }
            else{
              return;
            }
          }
          catch(err){console.log(err)}
        setUpdateBlog(false);
      };

    const handleCancel = (e) => {
        e.preventDefault();
        setUpdateBlog(false);
    }
    return (
        <>
           <article className="flexRow">
              <form>
                <input onChange={(e)=>setUpdateTitle(e.target.value)} value={ updateTitle }/>
                  <span>by </span>
                <input onChange={(e)=>setUpdateAuthor(e.target.value)} value={ updateAuthor }/>
                <h5>
                  User: <input onChange={(e)=>setUpdateuserNameId( e.target.value )} value={ updateUserNameId } />
                </h5>
                <h5>
                  url: <input onChange={(e)=>setUpdateUrl(e.target.value)} value={ updateUrl }/>
                </h5>
                <button type='submit' onClick={handleEdit}>edit</button>
                <button onClick={handleCancel}>cancel</button>
              </form>
            </article>
        </>
    )
}
export default UpdateBlogView;