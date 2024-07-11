import blogService from '../src/service/blogs';
import { useEffect,useState } from "react";
import { useUserValue } from '../context/userContext';
import sessionService from '../src/service/sessionStorage';
import { useMutation, useQueryClient, } from '@tanstack/react-query';

const Likes =({ blog }) => {
  const { id } = blog;
  const userId = useUserValue();
  const [unlikes,setUnlike] = useState(false);
  const [blogLike,setBlogLike] = useState(blog.likes);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: blogService.updateLikes,
       onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
    },
  });

  const mutationUserLikes = useMutation({
    mutationFn: blogService.getBlogsByID,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
    },
  });

  const getUserLike = async () => {
    try{
      const blog = await mutationUserLikes.mutateAsync(id);
      const arrayUser = blog.likesUserId.find(u => u === userId);
      // if(!arrayUser) setUnlike(false)
      // else setUnlike(true);
      setUnlike(!!arrayUser);
    }
    catch(err){
      console.error(err);
    }
  }

  useEffect(() => {
    if(userId){
      getUserLike();
    }
    
  },[userId]);
  //Likes or Unlikes.
  const handleLikes = async() => {
    try {
      const token = await sessionService.getUserToken();
      blogService.setToken(token);
      setUnlike(!unlikes);
      await mutation.mutateAsync({blog,unlikes})
      if(blog.likes>=0 && unlikes===true){
        setBlogLike(blogLike-1);
      }
      if(unlikes===false){
        setBlogLike(blogLike+1);
      }
      } catch (err) {
        console.error(err);
      }
    }
  return(
    <section className='likeContainer'>
      <span>
          Likes:
        <span data-testid='likecount' className={ 'Liked' }style={{ fontWeight:'bolder' }}> {blogLike}</span>
      </span>
      <button data-testid='likeButton' onClick={handleLikes}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`heart ${unlikes?"heartLike":''}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>
    </section>
  )
}

export default Likes;