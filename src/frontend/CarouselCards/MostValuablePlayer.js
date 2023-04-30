import React from "react";
import Jersey from '../components/Jersey';

export const MostValuablePlayer = (props) => {

    //here we will get player and assign team name to this const
    const teamName = props.mvp.maxIdTeamName;

    return (
        <React.Fragment>
            <div style={{fontSize : 20, fontWeight: '500', paddingBottom : '1%'}}>MVP</div>
            <Jersey teamName={teamName} height={200}/>
            <div style={{paddingTop : "1%"}}> 
                <span>{props.mvp.maxIdPlayerName} ({props.mvp.maxPoints} points)</span>
            </div>

        </React.Fragment>
      );
}

export default MostValuablePlayer;