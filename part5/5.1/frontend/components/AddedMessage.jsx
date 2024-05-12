const AddedMessage =({newBlog})=>{
    const {title,author} = newBlog;
    return(
    <div className="errorContainer">
    <h3 className="title">{`a new blog ${title} by ${author}.`}</h3>
    </div>)
}

export default AddedMessage;