import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="not-found">
            <h2>404 Not Found</h2>
            <br></br>
            <p>The requested page could not be found</p>
            <br></br>
            <Link to="/">Go Back to Home</Link>
        </div>
    )
}
