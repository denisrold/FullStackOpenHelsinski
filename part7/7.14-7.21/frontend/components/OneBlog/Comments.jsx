import './OneBlog.css';
import blogService from '../../src/service/blogs';
import { useState } from 'react';
const Comments = ({ blog })=>{
  const [comments, setComments] = useState('');

    const sendComments = async (e)=>{
        e.preventDefault()
        try{
          const comment = e.target.comment.value;
          const response = await blogService.updateComments( comment, blog);
          setComments('');
        }
        catch(err){
          console.log(err);
        }
    }

    return (
        <>
        <section className='comments_container'>
        Send your comment
          <article className='displayComment'>
            <form onSubmit={sendComments}>
              <input maxLength={70} name='comment' type='text' placeholder='your comment...' onChange={(e)=>setComments(e.target.value)} value={comments} />
              <button type='submit'>Send</button>
            </form>
            <div >Comments:</div>
          </article>
        </section>
        </>
    )
}

export default Comments;