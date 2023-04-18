import React, { useEffect, useState } from "react";
import LoadingPage from './LoadingPage';
import CarouselCards from './CarouselCards/CarouselCards';
import { useParams } from 'react-router-dom';
import HorizontalBarChart from "./Charts/TeamChart";

import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Summary = () => {

    const navigate = useNavigate();
    const { teamId } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/get/${teamId}`);
          if (!response.ok) {
            setError(true);
          } else {
            const responseData = await response.json();
            setData(responseData);
            setLoading(false);
          }
          
        } catch (error) {
          setError(true);
        }
      };
    
      fetchData();
    }, [teamId,error]);

    if (error) {
      if(!toast.isActive("invalid-team-id")){
        toast.error("Failed to get API response, Please check Team ID.", {toastId: "invalid-team-id"});
      }
      navigate('/');
    }
  
  
    return (
      loading ? <LoadingPage /> :
      (    
        <div>
          <CarouselCards data={data}/>
          <HorizontalBarChart data={data["weeklyData"]}/>
          {error && <ToastContainer autoClose={2000} hideProgressBar theme="light" position="top-center"/>}
        </div>        
      )
    )
}

export default Summary;
