import React from 'react';


const TimlinePost=({post})=>{
   return(
    <div>
     {post.video ? (
                    <div className="FacebookVideo">
                        <video controls className='post-video' >
                            <source src={post.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : post.image ? (
                    <div className="FacebookImg">
                        <img src={post.image} alt="dp" style={{ height: "30rem", width: "100%", borderRadius: '30px', padding: '1rem' }} />
                    </div>
                ) : null}
    <br></br>
    <div className="caption">
        <h5 className='postTimline-title'>{post.title!=''?post.title:post.challenge.name}</h5>
        <p style={{color:'#6B6B6B'}}>{post.description}</p>
    </div> 
    </div>
   )
}

export default TimlinePost;