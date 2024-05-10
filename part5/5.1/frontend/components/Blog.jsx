const Blogs = ({blog})=>{
    const {title,author,likes,userId,url} = blog
    return(
        <>
        <article  className='blogContainer'>
             <h4>{title}</h4>
            <h5>
             {author}
            </h5>
            <h5>{likes}</h5>
            <h5>{userId.name}</h5>
            <h5>
             {url}
            </h5>
            
          </article>
        </>
    )
}

export default Blogs;