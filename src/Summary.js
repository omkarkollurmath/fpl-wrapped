import React, { useEffect, useState } from "react";
import LoadingPage from './LoadingPage';
import CarouselCards from './CarouselCards/CarouselCards';

export const Summary = () => {

    const [loading, setLoading] = useState(false);
    const [dataProcessingDone, setDataProcessingDone] = useState(false);

    //get all data from api calls 
    //set dataProcessingDone to true once all data processing is done

    useEffect(() => {
        if (dataProcessingDone){
            setLoading(false);
        }
    },[dataProcessingDone]);

    return (
        loading ? <LoadingPage /> :
        (
            <CarouselCards />
        )
      );
}

export default Summary;