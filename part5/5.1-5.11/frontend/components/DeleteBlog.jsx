
import blogService from '../src/service/blogs';
const DeleteBlog = ({blog,setNewBlog})=>{
    const {id} = blog;
    const handleDelete = async ()=>{
        try {
            if(window.confirm("Do you really want to delete this blog?")){  
                 //get token with userdata
                const getUserToken = window.localStorage.getItem('userLogged');
                const {token} = await JSON.parse(getUserToken);
                blogService.setToken(token);
                await blogService.deleteBlogs(id);
                setNewBlog(true);
            }
            else{
                return;
            }
        }
        catch(err){console.log(err)}
 
    }
    return(
        <section>
            <button onClick={handleDelete}>delete</button>
        </section>
    )
}

export default DeleteBlog;