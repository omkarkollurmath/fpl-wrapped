import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BestCaptainPick from './BestCaptainPick';
import MostCaptainedPlayer from './MostCaptainedPlayer';
import CategoryAwards from './CategoryAwards';
import MostValuablePlayer from './MostValuablePlayer';
import BestXI from './BestXI';

export const CarouselCards = () => {

    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return (
        <Slider {...settings} style={{paddingTop:'75px'}}>
            <div>
                <BestCaptainPick />
            </div>
            <div>
                <MostCaptainedPlayer />
            </div>
            <div>
                <span>Best Week: </span>
                <span>Worst Week: </span>
            </div>
            <div>
                <span>Best Rank: </span>
                <span>Worst Rank: </span>
                <span>Final Rank: </span>
            </div>
            <div>
                <CategoryAwards />
            </div>
            <div>
                <MostValuablePlayer />
            </div>
            <div>
                <BestXI />
            </div>
        </Slider>
      );
}

export default CarouselCards;