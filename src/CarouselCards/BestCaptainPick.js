import React from "react";
import Jersey from '../Jersey';

export const BestCaptainPick = () => {

    //here we will get player and assign team name to this const
    const teamName = 'Arsenal';

    return (
        <React.Fragment>
            <div>Best Captain Pick</div>
            <Jersey teamName={teamName} height={200}/>
        </React.Fragment>
      );
}

export default BestCaptainPick;