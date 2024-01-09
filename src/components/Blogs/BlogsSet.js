import React from 'react'
import Blog from './Blog';
import './style.css'

const BlogsSet = () => {
    const blogs=[{
        img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Few benifits of group & personal trainingLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
    {
        img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
    {
        img:"https://media.istockphoto.com/id/510398566/photo/the-most-famous-sports.jpg?s=612x612&w=0&k=20&c=4luU-DrHEakY-5VL4TgAPgOAGzeN-l9IpmxpUriW2a4=",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
]
return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Blog
            key={index}
            img={blog.img}
            title={blog.title}
            categoryName={blog.categoryName}
            date={blog.date}
            desc={blog.desc}
            tags={blog.tags}
          />
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
}

export default BlogsSet;