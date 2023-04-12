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
        const value = event.target.value;
        const regex = /^[0-9]{0,10}$/;
        if (regex.test(value)) {
            setTeamId(value);
        }
    };

    const handleSubmitButtonOnClick = () => {
        if(teamId.trim().length !== 0 ){
            navigate(`/${teamId}/summary`);
        }
        else{
            toast.error('Team Id cannot be empty');
        }
    };

    return(
        <React.Fragment>
            <div className='home-page-div'>
                <span className='team-id-text'>Enter the team ID : </span>
                <input
                    type='text'
                    placeholder={'1234567'}
                    // pattern='[1-9]{1}[0-9]{9}'
                    maxlength='10'
                    onChange={handleTextChange}
                    autoComplete="off"
                    required
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