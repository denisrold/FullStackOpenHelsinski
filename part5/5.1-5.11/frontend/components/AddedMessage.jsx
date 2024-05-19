const AddedMessage =({newBlog})=>{
    const {title,author} = newBlog;
    return(
    <div className="notificationContainer">
    <h3 className="title">{`New blog ${title} by ${author}.`}</h3>
    </div>)
}

export default AddedMessage;