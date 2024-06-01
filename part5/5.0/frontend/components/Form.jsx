const Form= ({ addNote,handleNoteChange,newNote }) => {
  return(
    <form onSubmit={addNote}>
      <input id="inputNote" placeholder="My example note..." onChange={handleNoteChange} value={newNote}/>
      <button className="addbutton" type="submit">ADD</button>
    </form> )}

export default Form;
