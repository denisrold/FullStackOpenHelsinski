import Notification from './Notifications';
const AddForm = ({errorMessage, setAuthor,author,setTitle,title,setErrorMessage, handleAddBlogs, setUrl, url})=>{
  return(        
    <form id="form" className='formAdd'>
      <div className='formContainer'>
        <label>Title </label>
        <input type="text" placeholder='the blogverse title' required name="title" onChange={({ target }) => setTitle(target.value)} value={ title }/>
        <label>Author </label>
        <input type="text" placeholder='Jhon Travis' required name="author" onChange={({ target }) => setAuthor(target.value)} value={ author }/>
        <label>Url </label>
        <input type="url" placeholder='https://exampleweb.com' required onChange={({ target }) => setUrl(target.value)} name="url" value={ url }/>
      </div>
      <button name='addFormButton' onClick={handleAddBlogs} style={{ display:errorMessage&&'none', marginTop:'1.65rem' }} type="submit">Add</button>
      {errorMessage&&<Notification errorMessage={ errorMessage } setErrorMessage={setErrorMessage}/>}
    </form>
  )
}
export default AddForm;