import React from 'react';

function StorySection() {
    const stories = [
        { username: 'Username', imageUrl: 'https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp' },
        { username: 'Username', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUKa8rdbebgLF1SzLQN71RnKi-vxiJrKCeSnvK3rxt-PNc732MAn6oSlgpNaB2hr2ppSw&usqp=CAU' },
        { username: 'Username', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUlS3GCOdYAk0kRZ-9Z7jy1WS8tzCLcyGZ82ZBtGylPA-Lz3v7dbuJpPDQyFZWIBp0tc&usqp=CAU' },
        { username: 'Username', imageUrl: 'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM=' },
        { username: 'Username', imageUrl: 'https://media.istockphoto.com/id/1134378235/photo/side-view-of-one-young-woman.jpg?s=612x612&w=0&k=20&c=LT7aIbWRK7-rlDq7O4_7kZBw6m5YzvyTkc8NRwqh2Lc=' },

    ];

    return (
        <div className="story-section">
            <div className="story-container">
                {stories.map((story, index) => (
                    <div className="story" key={index}>
                        <img src={story.imageUrl} alt="Story" />
                        <span>{story.username}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StorySection;
