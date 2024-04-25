const Form= ({addNote,handleNoteChange,newNote})=>{
    return(
<form onSubmit={addNote}>
<input id='inputNote' placeholder="My example note..." onChange={handleNoteChange} value={newNote}/>
<button type="submit">add</button>
</form> )}

export default Form;