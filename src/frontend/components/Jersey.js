import React from "react";
import Arsenal from '../../utils/icons/Arsenal.png';
import AstonVilla from '../../utils/icons/Aston Villa.png';
import Bournemouth from '../../utils/icons/Bournemouth.png';
import Brentford from '../../utils/icons/Brentford.png';
import Brighton from '../../utils/icons/Brighton.png';
import Chelsea from '../../utils/icons/Chelsea.png';
import CrystalPalace from '../../utils/icons/Crystal Palace.png';
import Everton from '../../utils/icons/Everton.png';
import Fulham from '../../utils/icons/Fulham.png';
import Leeds from '../../utils/icons/Leeds.png';
import Leicester from '../../utils/icons/Leicester.png';
import Liverpool from '../../utils/icons/Liverpool.png';
import ManCity from '../../utils/icons/Man City.png';
import ManUtd from '../../utils/icons/Man Utd.png';
import Newcastle from '../../utils/icons/Newcastle.png';
import NottForest from "../../utils/icons/Nott'm Forest.png";
import Southampton from '../../utils/icons/Southampton.png';
import Spurs from '../../utils/icons/Spurs.png';
import WestHam from '../../utils/icons/WestHam.png';
import Wolves from '../../utils/icons/Wolves.png';
import './Jersey.css';

export const Jersey = (props) => {

        switch (props.teamName)
        {
            case 'Arsenal':
                return <img src={Arsenal} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Aston Villa':
                return <img src={AstonVilla} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Bournemouth':
                return <img src={Bournemouth} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Brentford':
                return <img src={Brentford} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Brighton':
                return <img src={Brighton} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Chelsea':
                return <img src={Chelsea} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Crystal Palace':
                return <img src={CrystalPalace} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Everton':
                return <img src={Everton} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Fulham':
                return <img src={Fulham} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Leeds':
                return <img src={Leeds} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Leicester':
                return <img src={Leicester} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Liverpool':
                return <img src={Liverpool} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Man City':
                return <img src={ManCity} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Man Utd':
                return <img src={ManUtd} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Newcastle':
                return <img src={Newcastle} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case `Nott'm Forest`:
                return <img src={NottForest} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Southampton':
                return <img src={Southampton} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Spurs':
                return <img src={Spurs} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'West Ham':
                return <img src={WestHam} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            case 'Wolves':
                return <img src={Wolves} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
            default :
                return <img src={Wolves} alt={props.teamName} style={{display: "unset"}} className='jersey'/>
        }
}

export default Jersey;