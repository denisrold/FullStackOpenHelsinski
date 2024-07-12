import { useSelector } from 'react-redux';
const AddedMessage =({ newBlog }) => {
  const {notification} = useSelector(state=>state.notification)
  const { title,author } = newBlog;
  return(
    <div className="notificationContainer">
    {notification &&(
      <h3 className="title">{notification}</h3>
    )
    }
     {!notification && <h3 className="title">{`New blog ${ title } by ${ author }.`}</h3>}
    </div>)
}

export default AddedMessage;