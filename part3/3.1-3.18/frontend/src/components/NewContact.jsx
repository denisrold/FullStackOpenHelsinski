
const NewContact = ({handleSubmit,handleNameChange,newName,handleNumberChange,newNumber})=>{

    return(
    <>
    <h3 className="newContact">New contact</h3>
      <form onSubmit={handleSubmit}>
        <div className="inputsNew">
          <span>name:</span> <input type='text' placeholder="Jules Jhonson..." onChange={handleNameChange} value={newName} required/>
          <span>number:</span> <input  required  placeholder=" 3212-654654..." type='tel' onChange={handleNumberChange} value={newNumber}/>
          <button type="submit">Add</button>
        </div>
       
      </form>
    </>
)
}

export default NewContact;