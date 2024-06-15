import { useSelector } from "react-redux";

const Notification = () => {

  const notificationList = useSelector(state => state.notificationReducer);

  const style = {
    marginTop:10,
    marginBottom:10,
    textAlign:'center',
    padding: 10,
    borderWidth: 1,
    minHeight: 60,
  };
  return (<div style={style}>{notificationList}</div>);
};

export default Notification;
