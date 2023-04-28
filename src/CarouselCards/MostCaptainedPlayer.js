import React from "react";
import Jersey from '../Jersey';

export const MostCaptainedPlayer = (props) => {

    //here we will get player and assign team name to this const
    const teamName = props.teamName;

    return (
        <React.Fragment>
            <div style={{fontSize : 20, fontWeight: '500', paddingBottom : '1%'}}>Most Captained Player:</div>
            <Jersey teamName={teamName} height={200}/>
            <div style={{paddingTop : "1%"}}>
                <span>{props.name} ({props.frequency} times)</span>
            </div>   
        </React.Fragment>
      );
}

export default MostCaptainedPlayer;