import React from "react";
import errorImage from './utils/404.jpg';

const PageNotFound = () => {
    return(
        <div>
        <br/><br/>
            <h1>Oops!</h1>
            <br/>
            <p>The page you are looking for has been moved, deleted or possibly never existed!</p>
            <img src={errorImage} alt="404"></img>
        </div>
    )
}

export default PageNotFound;