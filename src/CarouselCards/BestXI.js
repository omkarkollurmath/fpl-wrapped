import React, { useEffect } from "react";
import Jersey from '../Jersey';
import { useState } from "react";
import Share from "../components/Share"

export const BestXI = (props) => {

    const [fourthDefender, setFourthDefender] = useState(false);
    const [fifthDefender, setFifthDefender] = useState(false);
    const [fourthMidfielder, setFourthMidfielder] = useState(false);
    const [fifthMidfielder, setFifthMidfielder] = useState(false);
    const [secondForward, setSecondForward] = useState(false);
    const [thirdForward, setThirdForward] = useState(false);

    //here we will get 15 players and assign team names to this consts
    const teamName1 = props.top2Goalkeepers[0].Team_Name;
    const teamName2 = props.top2Goalkeepers[1].Team_Name;
    const teamName3 = props.top5Defenders[0].Team_Name;
    const teamName4 = props.top5Defenders[1].Team_Name;
    const teamName5 = props.top5Defenders[2].Team_Name;
    const teamName6 = props.top5Defenders[3].Team_Name;
    const teamName7 = props.top5Defenders[4].Team_Name;
    const teamName8 = props.top5Midfielders[0].Team_Name;
    const teamName9 = props.top5Midfielders[1].Team_Name;
    const teamName10 = props.top5Midfielders[2].Team_Name;
    const teamName11 = props.top5Midfielders[3].Team_Name;
    const teamName12 = props.top5Midfielders[4].Team_Name;
    const teamName13 = props.top3Forwards[0].Team_Name;
    const teamName14 = props.top3Forwards[1].Team_Name;
    const teamName15 = props.top3Forwards[2].Team_Name;


    function playerFunction(teamName, playerName, totalPoints){
        return(
            <div style={{display:"grid"}}>
                <Jersey teamName={teamName} height={100}/>
                <span>{playerName}</span>
                <span>({totalPoints} points)</span>
            </div>
        );
    }

    useEffect(() => {
        function sortRemainingPlayers () {
            const selectingRemainingOutfieldPlayer = [];
            selectingRemainingOutfieldPlayer.push(props.top5Defenders[3]);
            selectingRemainingOutfieldPlayer.push(props.top5Defenders[4]);
            selectingRemainingOutfieldPlayer.push(props.top5Midfielders[3]);
            selectingRemainingOutfieldPlayer.push(props.top5Midfielders[4]);
            selectingRemainingOutfieldPlayer.push(props.top3Forwards[1]);
            selectingRemainingOutfieldPlayer.push(props.top3Forwards[2]);
    
            const top3OutfieldPlayers = selectingRemainingOutfieldPlayer
            .sort((a, b) => b["Total_Points"] - a["Total_Points"])
            .slice(0, 3) 
            .map((player) => [{
              "Player_Name": player["Player_Name"],
              "Team_Name": player["Team_Name"],
              "Position": player["Position"],
              "Total_Points": player["Total_Points"]
              }][0]
            );
    
            //logic for second remaining outfield player
            switch (top3OutfieldPlayers[0]["Position"])
            {
                case "DEF":
                    setFourthDefender(true);
                    break;
                case "MID":
                    setFourthMidfielder(true);
                    break;
                case "FWD":
                    setSecondForward(true);
                    break;
                default:
                    setSecondForward(true);
            }
    
            //logic for second remaining outfield player
            if(top3OutfieldPlayers[1]["Position"] === "DEF")
            {
                if(top3OutfieldPlayers[0]["Position"] === "DEF") 
                {
                    setFifthDefender(true);
                }
                else
                {
                    setFourthDefender(true);
                }
            }
            else if(top3OutfieldPlayers[1]["Position"] === "MID")
            {
                if(top3OutfieldPlayers[0]["Position"] === "MID") 
                {
                    setFifthMidfielder(true);
                }
                else
                {
                    setFourthMidfielder(true);
                }
            }
            else if(top3OutfieldPlayers[1]["Position"] === "FWD")
            {
                if(top3OutfieldPlayers[0]["Position"] === "FWD") 
                {
                    setThirdForward(true);
                }
                else
                {
                    setSecondForward(true);
                }
            }
    
            //logic for third remaining outfield player
            if(top3OutfieldPlayers[2]["Position"] === "DEF")
            {
                if(top3OutfieldPlayers[0]["Position"] === "DEF" || top3OutfieldPlayers[1]["Position"] === "DEF") 
                {
                    setFifthDefender(true);
                }
                else
                {
                    setFourthDefender(true);
                }
            }
            else if(top3OutfieldPlayers[2]["Position"] === "MID")
            {
                if(top3OutfieldPlayers[0]["Position"] === "MID" || top3OutfieldPlayers[1]["Position"] === "MID") 
                {
                    setFifthMidfielder(true);
                }
                else
                {
                    setFourthMidfielder(true);
                }
            }
            else if(top3OutfieldPlayers[2]["Position"] === "FWD")
            {
                if(top3OutfieldPlayers[0]["Position"] === "FWD" || top3OutfieldPlayers[1]["Position"] === "FWD") 
                {
                    setThirdForward(true);
                }
                else
                {
                    setSecondForward(true);
                }
            }
    
        }

        sortRemainingPlayers();
    });

    const shareText = "My FPL 2022-23 Best XI brought to you by FPL-Wrapped!\n\n" + 
                       props.top2Goalkeepers[0].Player_Name.substring(props.top2Goalkeepers[0].Player_Name.indexOf(' ') + 1) + '\n' +
                       props.top5Defenders[0].Player_Name.substring(props.top5Defenders[0].Player_Name.indexOf(' ') + 1) + '\n' +
                       props.top5Defenders[1].Player_Name.substring(props.top5Defenders[1].Player_Name.indexOf(' ') + 1) + '\n' +
                       props.top5Defenders[2].Player_Name.substring(props.top5Defenders[2].Player_Name.indexOf(' ') + 1) + '\n'

    return (
        <React.Fragment>
            <div style={{display: "inline-flex"}}>
                <div>
                <Share description={shareText}/>
                    <span>Best XI</span> 
                    <div>
                        <div style={{display:"inline-flex"}}>
                            {playerFunction(teamName1, props.top2Goalkeepers[0].Player_Name, props.top2Goalkeepers[0].Total_Points)}
                        </div>
                    </div>
                    <div>
                        <div style={{display:"inline-flex"}}>
                            {playerFunction(teamName3, props.top5Defenders[0].Player_Name, props.top5Defenders[0].Total_Points)}
                            {playerFunction(teamName4, props.top5Defenders[1].Player_Name, props.top5Defenders[1].Total_Points)}
                            {playerFunction(teamName5, props.top5Defenders[2].Player_Name, props.top5Defenders[2].Total_Points)}
                            {fourthDefender && 
                                playerFunction(teamName6, props.top5Defenders[3].Player_Name, props.top5Defenders[3].Total_Points)
                            }
                            {fifthDefender && 
                                playerFunction(teamName7, props.top5Defenders[4].Player_Name, props.top5Defenders[4].Total_Points)
                            }
                        </div>
                    </div>
                    <div>
                        <div style={{display:"inline-flex"}}>
                            {playerFunction(teamName8, props.top5Midfielders[0].Player_Name, props.top5Midfielders[0].Total_Points)}
                            {playerFunction(teamName9, props.top5Midfielders[1].Player_Name, props.top5Midfielders[1].Total_Points)}
                            {playerFunction(teamName10, props.top5Midfielders[2].Player_Name, props.top5Midfielders[2].Total_Points)}
                            {fourthMidfielder && 
                                playerFunction(teamName11, props.top5Midfielders[3].Player_Name, props.top5Midfielders[3].Total_Points)
                            }
                            {fifthMidfielder && 
                                playerFunction(teamName12, props.top5Midfielders[4].Player_Name, props.top5Midfielders[4].Total_Points)
                            }
                        </div>
                    </div>
                    <div>
                        <div style={{display:"inline-flex"}}>
                            {playerFunction(teamName13, props.top3Forwards[0].Player_Name, props.top3Forwards[0].Total_Points)}
                            {secondForward && 
                                playerFunction(teamName14, props.top3Forwards[1].Player_Name, props.top3Forwards[1].Total_Points)
                            }
                            {thirdForward &&
                                playerFunction(teamName15, props.top3Forwards[2].Player_Name, props.top3Forwards[2].Total_Points)
                            }
                        </div>
                    </div>
                </div>
                <div style={{paddingLeft: "50px"}}>
                    <div>
                        <span>Bench</span> 
                        <div>
                            {playerFunction(teamName2, props.top2Goalkeepers[1].Player_Name, props.top2Goalkeepers[1].Total_Points)}
                            {!fourthDefender && 
                                playerFunction(teamName6, props.top5Defenders[3].Player_Name, props.top5Defenders[3].Total_Points)
                            }
                            {!fifthDefender && 
                                playerFunction(teamName7, props.top5Defenders[4].Player_Name, props.top5Defenders[4].Total_Points)
                            }
                            {!fourthMidfielder && 
                                playerFunction(teamName11, props.top5Midfielders[3].Player_Name, props.top5Midfielders[3].Total_Points)
                            }
                            {!fifthMidfielder && 
                                playerFunction(teamName12, props.top5Midfielders[4].Player_Name, props.top5Midfielders[4].Total_Points)
                            }
                            {!secondForward && 
                                playerFunction(teamName14, props.top3Forwards[1].Player_Name, props.top3Forwards[1].Total_Points)
                            }
                            {!thirdForward &&
                                playerFunction(teamName15, props.top3Forwards[2].Player_Name, props.top3Forwards[2].Total_Points)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
      );
}

export default BestXI;