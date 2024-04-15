const Form= ({addNote,handleNoteChange,newNote})=>{
    return(
<form onSubmit={addNote}>
<input onChange={handleNoteChange} value={newNote}/>
<button type="submit">save</button>
</form> )}

export default Form;