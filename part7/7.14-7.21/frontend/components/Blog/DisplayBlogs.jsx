import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Blog.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function DisplayBlogs({blogs}) {
    const rankedBlogs = blogs.slice(0,5); 
    return (
      <>
        Most Ranked Blogs! 
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
        {rankedBlogs.map(b=>(
            <SwiperSlide>
              <article className='displayContainer'>
                <span>{b.title} </span>
                <span>by {b.author} </span>
                  <a>{b.url}</a>
                <div>
                  <span>likes: </span>
                  <span className='likesStyle'>{b.likes}</span>
                </div>
              </article>
            </SwiperSlide> ))}
        </Swiper>
      </>
  );
}

