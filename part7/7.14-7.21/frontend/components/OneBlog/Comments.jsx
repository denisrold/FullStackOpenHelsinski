import './OneBlog.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../redux/reducers/blogReducer';
const Comments = ({ blog })=>{
  const dispatch = useDispatch();
  const [comments, setComments] = useState('');

    const sendComments = async (e)=>{
        e.preventDefault()
        try{
          const comment = e.target.comment.value;
          dispatch(updateComment({comment, blog}))
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
            <article className='box_comment'>
            <div className='titleComments'>Comments:</div>
            <ul  className='comment_list'>
              {!blog.comments.length&&<div className='noComments'>No comments yet.</div>}
              {blog.comments&&blog.comments.map((c,i)=>(
                <li key={i}>{c}</li>
              ))}
            </ul>
            </article>
          </article>
        </section>
        </>
    )
}

export default Comments;