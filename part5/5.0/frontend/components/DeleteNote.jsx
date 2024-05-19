
import noteService from '../src/services/notes';
const DeleteNote = ({note,setNewNote})=>{
    const {id} = note;
    const handleDelete = async ()=>{
        try {
            if(window.confirm("Do you really want to delete this Note?")){  
                 //get token with userdata
                const getUserToken = window.localStorage.getItem('userLogged');
                const {token} = await JSON.parse(getUserToken);
                noteService.setToken(token);
                //Delete Note
                await noteService.deleteBlogs(id);
                setNewNote(true);
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

export default DeleteNote;