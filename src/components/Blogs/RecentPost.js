import React from 'react';
import RecentPosts from './RecentPosts';

const RecentPost = () => {
    const posts=[{
        img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        date:"21 Nov, 2023",
    },
    {
        img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        date:"21 Nov, 2023"
    },
    {
        img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        date:"21 Nov, 2023"
    },
]
    return(
        <div>
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <RecentPosts
              key={index}
              img={post.img}
              title={post.title}
              date={post.date}
            />
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    )
}
export default RecentPost;