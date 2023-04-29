import React from "react";
import errorImage from './utils/404.jpg';

const PageNotFound = () => {
    return(
        <div style={{paddingTop: '2%'}}>
            <h1>Oops!</h1>
            <div style={{paddingTop: '1%'}}>
                <p>The page you are looking for has been moved, deleted or possibly never existed!</p>
                <img src={errorImage} alt="404"></img>
            </div>
        </div>
    )
}

export default PageNotFound;