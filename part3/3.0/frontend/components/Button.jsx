const Button = ({setShowAll,showAll})=>{
return(
    <div className="important_btn" >
    <button onClick={() => setShowAll(!showAll)}>
      show {showAll ? 'important' : 'all' }
    </button>
    </div>
)
}

export default Button;