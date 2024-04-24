const Filter = ({handleFilter,newFilter}) =>{
return(  
    <div className="containerFilter">
        <h3>Filter phonebook:  </h3>
        <input type='text' placeholder="name or number..." onChange={handleFilter} value={newFilter}/>
    </div>
)
}

export default Filter;