import React from 'react'
import { Button } from 'react-bootstrap';

function RightArea(){
    return(
        <div>

      
        <div className="RightArea">

            <div className="RecommendedChallenges">
                <h5>Recommended Challenges</h5>
                <hr />
            </div>


            <div className="Profile">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfE7-EeamPBHVBVAQL9N_H-Gc0XjmI9AktmA&usqp=CAU" alt="Profile Pic" style={{ height: "60px", width: "50px", borderRadius: "60%" }} />
                <div>
                    Aya Joudeh
                    <br />
                    Running for 10 min.
                    </div>
            </div>
            
            <div className="Profile">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuFLt0IZWQlRXwatulKTym3aVt7_vS6yO6sw&usqp=CAU" alt="Profile Pic" style={{ height: "60px", width: "50px", borderRadius: "60%" }} />
                <div>
                    Saber Salameh
                    <br />
                    playing football
                    </div>
            </div>
     
        </div>

        <div className="RightArea">

<div className="RecommendedChallenges">
    <h5>Clubs to Follow</h5>
    <hr />
</div>


<div className="Profile">
    <img src="https://marketplace.canva.com/EAFn79D1vQ4/1/0/1600w/canva-red-white-and-black-modern-football-club-logo-cyuklMnKVrQ.jpg" alt="Profile Pic" style={{ height: "60px", width: "50px", borderRadius: "60%" }} />
    <div>
    Club Name here
        <br />
        <Button variant="outline-success">+ Follow</Button>
        </div>
</div>

<div className="Profile">
    <img src="https://img.freepik.com/free-vector/logo-template-design_1195-105.jpg" alt="Profile Pic" style={{ height: "60px", width: "50px", borderRadius: "60%" }} />
    <div>
    Club Name here
        <br />
        <Button variant="outline-success">+ Follow</Button>
        </div>
</div>

<div className="Profile">
    <img src="https://static.vecteezy.com/system/resources/thumbnails/003/686/552/small/soccer-logo-america-logo-classic-logo-free-vector.jpg" alt="Profile Pic" style={{ height: "60px", width: "50px", borderRadius: "60%" }} />
    <div>
    Club Name here
        <br />
        <Button variant="outline-success">+ Follow</Button>
        </div>
</div>

</div>
        </div>
    )
}

export default RightArea;