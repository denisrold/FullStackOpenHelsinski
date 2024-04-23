const Note = ({content,important,toggleImportance,id })=>{
   const handleImportance=()=>{
        toggleImportance(id);
    }
    const label = important
    ? 'make not important' : 'make important'
    return (
        <>
        <li className='note'>
        {content}
        <button onClick={handleImportance }>{label}</button>
        </li>
        </>
        )
    }
    
export default Note
