import React, { useEffect, useState } from "react";
import LoadingPage from './LoadingPage';
import CarouselCards from './CarouselCards/CarouselCards';
import { useParams } from 'react-router-dom';

export const Summary = () => {

    const { teamId } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(undefined);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/get/${teamId}`);
          const responseData = await response.json();
          setData(responseData);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, [teamId]);
  

    return (
        loading ? <LoadingPage /> :
        (
            <CarouselCards data={data}/>
        )
      );
}

export default Summary;