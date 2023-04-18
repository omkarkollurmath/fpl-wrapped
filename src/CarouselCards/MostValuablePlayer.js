import React from "react";
import Jersey from '../Jersey';

export const MostValuablePlayer = (props) => {

    //here we will get player and assign team name to this const
    const teamName = props.mvp.maxIdTeamName;

    return (
        <React.Fragment>
            <div>MVP</div>
            <div style={{display:"inline-grid"}}>
                <Jersey teamName={teamName} height={200}/>
                <span>{props.mvp.maxIdPlayerName}</span>
                <span>({props.mvp.maxPoints} points)</span>
            </div>
        </React.Fragment>
      );
}

export default MostValuablePlayer;