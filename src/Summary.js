import React, { useEffect, useState } from "react";
import LoadingPage from './LoadingPage';
import CarouselCards from './CarouselCards/CarouselCards';
import { useParams } from 'react-router-dom';

export const Summary = () => {

    const { id } = useParams();


    const [loading, setLoading] = useState(true);
    //const [dataProcessingDone, setDataProcessingDone] = useState(false);
    const [data, setData] = useState(undefined);

    //get all data from api calls 
    //set dataProcessingDone to true once all data processing is done


    // useEffect(() => {
    //     const fetchData = async () => {
    //       const response = await fetch(`http://localhost:8000/get/${id}`);
    //       const responseData = await response.json();
    //       setData(responseData);
    //     };
      
    //     fetchData();
        
    //     if (data !== undefined) {
    //       setLoading(false);
    //     }
    //   }, [data, id]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/get/${id}`);
          const responseData = await response.json();
          setData(responseData);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, [id]);
  

    return (
        loading ? <LoadingPage /> :
        (
            <CarouselCards data={data}/>
        )
      );
}

export default Summary;