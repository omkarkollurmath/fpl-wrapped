import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import "./Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import instructionImage from './utils/instructions.png';

const Home = () => {

    const navigate = useNavigate();
    const [teamId, setTeamId] = useState('');

    const handleTextChange = (event) => {
        setTeamId(event.target.value);
    };

    const handleSubmitButtonOnClick = () => {

        const regex = /^\d{0,10}$/;

        if(teamId.trim().length !== 0 ){

            if (regex.test(teamId)) {
                navigate(`/${teamId}/summary`);
            }else{
                toast.error("Invalid Team ID. Please enter only digits.");
                setTeamId('');
            }
        }
        else{
            
            toast.error("Team Id cannot be empty.")
        }
    };

    return(
        <React.Fragment>
            <Container fluid>
                <span className='team-id-text'>Enter the team ID </span>
                <input
                    type='text'
                    placeholder={'1234567'}
                    maxLength='10'
                    onChange={handleTextChange}
                    autoComplete="off"
                    required
                    value={teamId}
                />
            </Container>
            <div className="button-submit">
                <Button variant="primary" onClick={handleSubmitButtonOnClick}>
                    <span>Submit</span>
                </Button>
            </div>
            <div style={{fontWeight: '500', paddingTop : '5%', paddingBottom : '1%'}}>How to find you Fantasy Premier League Team ID?</div>
          
            <div>Login to your account at <a href="https://fantasy.premierleague.com">https://fantasy.premierleague.com</a> <p>and click on the "Points" tab</p></div>
            <div style={{padding: '1%'}}>Check your browser's address bar and you should find your ID through the URL address, where 497062 is ID.
                <p>
                    <img src={instructionImage} alt="Instructions" className="img-size"></img>
                </p>
            </div>

            
            <ToastContainer autoClose={2000} hideProgressBar theme="light" position="top-center"/>
        </React.Fragment>
    )
}

export default Home;