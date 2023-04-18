import React from "react";
import Jersey from '../Jersey';

export const CategoryAwards = (props) => {

    //here we will get 4 players and assign team names to this consts
    const teamName1 = props.topGoalkeeperAward.maxIdTeamName;
    const teamName2 = props.topDefenderAward.maxIdTeamName;
    const teamName3 = props.topMidfielderAward.maxIdTeamName;
    const teamName4 = props.topForwardAward.maxIdTeamName;

    return (
        <React.Fragment>
            <div>Category Awards</div>
            <div style={{display:"inline-flex"}}>
                <div style={{display:"grid"}}>
                    <span>Best Goalkeeper</span>
                    <Jersey teamName={teamName1} height={200}/>
                    <span>{props.topGoalkeeperAward.maxIdPlayerName}</span>
                    <span>({props.topGoalkeeperAward.maxPoints} points)</span>
                </div>
                <div style={{display:"grid"}}>
                    <span>Best Defender</span>
                    <Jersey teamName={teamName2} height={200}/>
                    <span>{props.topDefenderAward.maxIdPlayerName}</span>
                    <span>({props.topDefenderAward.maxPoints} points)</span>
                </div>
                <div style={{display:"grid"}}>
                    <span>Best Midfielder</span>
                    <Jersey teamName={teamName3} height={200}/>
                    <span>{props.topMidfielderAward.maxIdPlayerName}</span>
                    <span> ({props.topMidfielderAward.maxPoints} points)</span>
                </div>
                <div style={{display:"grid"}}>
                    <span>Best Forward</span>
                    <Jersey teamName={teamName4} height={200}/>
                    <span>{props.topForwardAward.maxIdPlayerName}</span>
                    <span> ({props.topForwardAward.maxPoints} points)</span>
                </div>
            </div>
        </React.Fragment>
      );
}

export default CategoryAwards;