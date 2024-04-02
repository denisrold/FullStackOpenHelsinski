const Note = ({content,important,toggleImportance,id })=>{
   const handleImportance=()=>{
   
        toggleImportance(id);
    }
    const label = important
    ? 'make not important' : 'make important'
    return (
        <>
        <li>{content}</li>
        <button onClick={handleImportance }>{label}</button>
        </>
        )
    }
    
export default Note
