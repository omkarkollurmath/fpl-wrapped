import React from "react";
import Jersey from '../components/Jersey';

export const BestCaptainPick = (props) => {

    //here we will get player and assign team name to this const
    const teamName = props.teamName;

    return (
        <React.Fragment>
            <div style={{fontSize : 20, fontWeight: '500', paddingBottom : '1%'}}>Best Captain Pick</div>
            <Jersey teamName={teamName}/>
            <div style={{paddingTop : "1%"}}>
                <span>{props.name} (GW{props.gameWeek} - {props.points} points)</span>
            </div>  
        </React.Fragment>
      );
}

export default BestCaptainPick;