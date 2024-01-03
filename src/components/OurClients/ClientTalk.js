import React from 'react';
import { Button } from 'react-bootstrap';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import { FaQuoteLeft } from 'react-icons/fa';

const ClientTalk = ({ selectedImageIndex, setSelectedImageIndex }) => {
  let description = '';
  let name='';
  let job ='';

  const handleNextButtonClick = () => {
    // Logic to handle incrementing the selectedImageIndex
    const newIndex = (selectedImageIndex + 1) % 5; // Assuming a totalNumberOfTalks variable is defined
    setSelectedImageIndex(newIndex);
  };

  const handlePrevButtonClick = () => {
    // Logic to handle decrementing the selectedImageIndex
    const newIndex = (selectedImageIndex - 1 + 5) % 5; // Assuming a totalNumberOfTalks variable is defined
    setSelectedImageIndex(newIndex);
  };

  switch (selectedImageIndex) {
    case 0:
      description = "Leading an organization is incredibly rewarding and equally humbling. Confidence and humility. Every success is built on lessons from mistakes made is incredibly rewarding and equally humbling. It requires healthy. "
      name='Mila McSabbu'
      job=' Freelance Designer';
      break;
    case 1:
      description = "I just wanted to share a quick note and let you know that you guys do a really good job. I’m glad I decided to work with you. It’s really great how easy your websites are to update and manage. I never have any problem at all."
      name='Bob McSabbu'
      job='Talent';
      break;
      case 2:
        description = "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save."
        name='Bob Jemes'
        job='Scout';
        break;

        case 3:
          description = "I absolutely love it! It's revolutionized the way I [specific benefit]. The quality is unmatched, and I can't imagine my life without it. Highly recommended!"
          name='Jemes Salahb'
          job='Manager';
          break;

    default:
      description = "Wow. I just updated my site and it was SO SIMPLE. I am blown away. You guys truly kick ass. Thanks for being so awesome. High fives!"
      name='Aya Joudeh'
      job='Frontend Developer';
      break;
  }

  return (
    <div className='bg-gray mb-4 clientTalk-container'>
      <h1 className='who-h1 mt-5 test-h1'>What people are saying</h1>
      <p className='m-1' style={{ width: '30rem' }}>
        <span style={{ fontSize: '4rem', color: '#1A2A44' }} className='talkQ'>
          <FaQuoteLeft size={38} />
        </span>
        <br />
        {description && <p>{description}</p>}

        <br />
        <div className=''>
         
            {name &&  <span style={{}}>-{name}</span>}
          <br />

          {job &&<span style={{ color: '#464646' }}>{job}       </span>}
   
        </div>
      </p>

      <div>
        <Button className='customButton' style={{ backgroundColor: '#213555' }} onClick={handlePrevButtonClick}>
          <FaLongArrowAltLeft />
        </Button>
        <Button className='customButton' style={{ backgroundColor: '#213555' }} onClick={handleNextButtonClick}>
          <FaLongArrowAltRight />
        </Button>
      </div>
    </div>
  );
}

export default ClientTalk;
