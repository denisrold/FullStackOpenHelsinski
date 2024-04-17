
const NewContact = ({handleSubmit,handleNameChange,newName,handleNumberChange,newNumber})=>{

    return(
    <>
    <h3>Add a new contact</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type='text' onChange={handleNameChange} value={newName} required/>
          <br/>
          number: <input  required  type='tel' onChange={handleNumberChange} value={newNumber}/>
        </div>
       
        <div className="button-container">
          <button type="submit">Add</button>
        </div>
      </form>
    </>
)
}

export default NewContact;