import React from "react";
import Jersey from '../Jersey';

export const CategoryAwards = (props) => {

    //here we will get 4 players and assign team names to this consts
    const teamName1 = 'Bournemouth';
    const teamName2 = 'Brentford';
    const teamName3 = 'Brighton';
    const teamName4 = 'Chelsea';

    return (
        <React.Fragment>
            <div>Category Awards</div>
            <Jersey teamName={teamName1} height={200}/>
            <Jersey teamName={teamName2} height={200}/>
            <Jersey teamName={teamName3} height={200}/>
            <Jersey teamName={teamName4} height={200}/>
        </React.Fragment>
      );
}

export default CategoryAwards;