import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import "./Home.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <div className='home-page-div'>
                <span className='team-id-text'>Enter the team ID : </span>
                <input
                    type='text'
                    placeholder={'1234567'}
                    maxLength='10'
                    onChange={handleTextChange}
                    autoComplete="off"
                    required
                    value={teamId}
                />
                <div className="button-submit">
                    <Button variant="primary" onClick={handleSubmitButtonOnClick}>
                        <span>Submit</span>
                    </Button>
                </div>
            </div>
            <ToastContainer autoClose={2000} hideProgressBar theme="light" position="top-center"/>
        </React.Fragment>
    )
}

export default Home;