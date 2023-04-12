import React from "react";
import Jersey from '../Jersey';

export const MostCaptainedPlayer = () => {

    //here we will get player and assign team name to this const
    const teamName = 'Aston Villa';

    return (
        <React.Fragment>
            <div>Most Captained Player</div>
            <Jersey teamName={teamName} height={200}/>
        </React.Fragment>
      );
}

export default MostCaptainedPlayer;