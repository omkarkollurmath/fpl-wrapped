import React from "react";
import ReactLoading from "react-loading";
import Slider from "react-slick";

export const LoadingPage = () => {

    var settings = {
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        autoplaySpeed: 3000,
        slidesToScroll: 1
      };

    return (
        <div>
            <div style = {{marginLeft: '48%'}} >
                <ReactLoading type="bubbles" color="#343a40" height={'10%'} width={'15%'}/>
            </div>
            <span>Wrapping up your Fantasy Premier League team 2022/23 season...</span>

            <div style={{paddingTop: '1%'}}>
                <h2>Did you know?</h2>
            </div>  
          
            <div style={{paddingTop: '1%'}}>
                <Slider {...settings} arrows={false}>
                    <div>
                        <span>Fantasy football was invented in 1990 by Italian journalist Riccardo Albini.</span>
                    </div>
                    <div>
                        <span>By the end of the year 1994, 70,000 subscribers had played the game.</span>
                    </div>
                    <div>
                        <span>Fantasy Premier League was born in 2002 with the Launch of the Premier League website.</span>
                    </div>
                    <div>
                        <span>Points scored from GW 1-6 did not count to the total and transfers could be made at no cost. It was supposed to be a trial period. </span>
                    </div>
                    <div>
                        <span>When FPL was launched in 2002, Ruud van Nistelrooy was the most expensive player in the game at £11.5m. </span>
                    </div>
                </Slider>
            </div>
        </div>  
      );
}

export default LoadingPage;