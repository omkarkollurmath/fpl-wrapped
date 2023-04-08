import React from "react";
import "./Home.css";
const Home = () => {

    return(
        <div className="home-page-div">
            <span>Enter the team ID : </span>
            <input
                type="text"
                placeholder={'1234567'}
                // onChange={this.handleChange}
            />
        </div>
    )
}

export default Home;