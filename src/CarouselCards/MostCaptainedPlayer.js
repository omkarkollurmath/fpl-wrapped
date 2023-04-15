import React from "react";
import Jersey from '../Jersey';

export const MostCaptainedPlayer = (props) => {

    //here we will get player and assign team name to this const
    const teamName = 'Aston Villa';

    return (
        <React.Fragment>
            <div>Most Captained Player:</div>
            <span>{props.name}</span><br></br>
            <Jersey teamName={teamName} height={200}/>
        </React.Fragment>
      );
}

export default MostCaptainedPlayer;