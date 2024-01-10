import React from 'react';
import RecentPosts from './RecentPosts';

const RecentPost = () => {

    return(
        <div>
                  {console.log('posts',posts)}
        {/* {posts && posts.length > 0 ? (
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
        )} */}
        <RecentPosts posts={posts}/>

      </div>
    )
}
export default RecentPost;