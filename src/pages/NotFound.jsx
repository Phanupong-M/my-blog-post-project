import { useNavigate } from "react-router-dom";

function NotFound () {
    const navigate = useNavigate();

    return(
        <div>
            Start Not Found page !!
            <button onClick={() => navigate("/")} >Go to Home Page</button>
        </div>
)}

export default NotFound