const Filter = ({handleFilter,newFilter}) =>{
return(  
    <h3>filter shown with:  <input type='text' onChange={handleFilter} value={newFilter}/></h3>
)
}

export default Filter;