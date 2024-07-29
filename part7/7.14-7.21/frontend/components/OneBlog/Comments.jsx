import './OneBlog.css';
const Comments = ()=>{

    const sendComments = (e)=>{
        e.preventDefault()

        console.log(e.target.comment.value);
    }
    return (
        <>
        <section className='comments_container'>
        Send your comment
          <article className='displayComment'>
            <form onSubmit={sendComments}>
              <input maxLength={70} name='comment' type='text' placeholder='your comment...'/>
              <button type='submit'>Send</button>
            </form>
            <div >Comments:</div>
          </article>
        </section>
        </>
    )
}

export default Comments;