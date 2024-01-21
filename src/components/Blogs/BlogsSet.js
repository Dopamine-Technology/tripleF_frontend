import React from 'react'
import Blog from './Blog';
import './style.css'

const BlogsSet = () => {
    const blogs=[{
        img:"https://www.blazepod.com/cdn/shop/articles/BP_Article_Football_Endurance_Training_960x585_dedd2f08-a3e7-4c4b-be4b-d82cca607000_1024x.jpg?v=1654091122",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
    {
        img:"https://www.blazepod.com/cdn/shop/articles/BP_Article_Football_Endurance_Training_960x585_dedd2f08-a3e7-4c4b-be4b-d82cca607000_1024x.jpg?v=1654091122",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
    {
        img:"https://www.blazepod.com/cdn/shop/articles/BP_Article_Football_Endurance_Training_960x585_dedd2f08-a3e7-4c4b-be4b-d82cca607000_1024x.jpg?v=1654091122",
        title:"Blog title here, Neque porro quisquam est qui dolorem ipsum",
        categoryName:"Category Name",
        date:"21 Nov, 2023",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor",
        tags:['#hashtag','#hashtag']
    },
]
return (
    <div style={{marginLeft:'3rem'}}>
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