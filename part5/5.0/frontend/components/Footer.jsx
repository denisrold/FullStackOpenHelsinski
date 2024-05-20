const Footer = ({ user }) => {
  return (
    <>
      <footer className="footerContainer">
        <div  className={"footer " +(user? "footerUser":"footerNotUser") }>
          {user&&<a className="gotop" href="#NOTES">Top</a>}
          <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
        </div>
      </footer>
    </>
  )
}
export default Footer;