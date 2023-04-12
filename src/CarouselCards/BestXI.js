import React from "react";
import Jersey from '../Jersey';

export const MostValuablePlayer = () => {

    //here we will get 15 players and assign team names to this consts
    const teamName1 = 'Everton';
    const teamName2 = 'Fulham';
    const teamName3 = 'Leeds';
    const teamName4 = 'Leicester';
    const teamName5 = 'Liverpool';
    const teamName6 = 'Man City';
    const teamName7 = 'Man Utd';
    const teamName8 = 'Newcastle';
    const teamName9 = `Nott'm Forest`;
    const teamName10 = 'Southampton';
    const teamName11 = 'Spurs';
    const teamName12 = 'WestHam';
    const teamName13 = 'Wolves';
    const teamName14 = 'Arsenal';
    const teamName15 = 'Spurs';

    return (
        <React.Fragment>
            <div>Best XI</div>
            <Jersey teamName={teamName1} height={100}/>
            <Jersey teamName={teamName2} height={100}/>
            <Jersey teamName={teamName3} height={100}/>
            <Jersey teamName={teamName4} height={100}/>
            <Jersey teamName={teamName5} height={100}/>
            <Jersey teamName={teamName6} height={100}/>
            <Jersey teamName={teamName7} height={100}/>
            <Jersey teamName={teamName8} height={100}/>
            <Jersey teamName={teamName9} height={100}/>
            <Jersey teamName={teamName10} height={100}/>
            <Jersey teamName={teamName11} height={100}/>
            <Jersey teamName={teamName12} height={100}/>
            <Jersey teamName={teamName13} height={100}/>
            <Jersey teamName={teamName14} height={100}/>
            <Jersey teamName={teamName15} height={100}/>
        </React.Fragment>
      );
}

export default MostValuablePlayer;