
import blogService from '../src/service/blogs';
const DeleteBlog = ({blog,setNewBlog})=>{
    const {id} = blog;
    const handleDelete = async ()=>{
        try {
            if(windows.confirm("Do you really want to delete blog?")){  
                 //get token with userdata
                const getUserToken = window.localStorage.getItem('userLogged');
                const {token} = await JSON.parse(getUserToken);
                blogService.setToken(token);
                //get this blog by id
                const res = await blogService.getBlogsByID(id);
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