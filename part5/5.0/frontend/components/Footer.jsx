const Footer = ({user}) => {
    return (
      <>
      <div  className={"footer " +(user? "footerUser":"footerNotUser") }>
      {user&&<a className="gotop" href="#NOTES">Top</a>}
        <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
      </div>
      </>
    )
  }
  export default Footer;