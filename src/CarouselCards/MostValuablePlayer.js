import React from "react";
import Jersey from '../Jersey';

export const MostValuablePlayer = () => {

    //here we will get player and assign team name to this const
    const teamName = 'Crystal Palace';

    return (
        <React.Fragment>
            <div>MVP</div>
            <Jersey teamName={teamName} height={200}/>
        </React.Fragment>
      );
}

export default MostValuablePlayer;