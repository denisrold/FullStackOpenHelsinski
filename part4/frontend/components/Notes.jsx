const Note = ({content,important,toggleImportance,id })=>{
   const handleImportance=()=>{
        toggleImportance(id);
    }
    const label = important
    ? 'Not important' : 'Make important'
    return (
        <div className={`noteContent ${important?"important":""}`}>
        <li className={`note `}>
        {content}
        </li>
        <button className={`${important?"notimportant":""}`} onClick={handleImportance }>{label}</button>
        </div>
        )
    }
    
export default Note
