import React from "react";
import Jersey from '../Jersey';

export const BestCaptainPick = (props) => {

    //here we will get player and assign team name to this const
    const teamName = props.teamName;

    return (
        <React.Fragment>
            <div>Best Captain Pick</div>
            <Jersey teamName={teamName} height={200}/>
            <div>
                <span>{props.name} (GW{props.gameWeek} - {props.points} points)</span>
            </div>  
        </React.Fragment>
      );
}

export default BestCaptainPick;