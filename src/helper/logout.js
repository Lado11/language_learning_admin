import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteReduxToken } from "../store/slices/auth/login-slice";

export let LogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

   
        localStorage.clear();
        dispatch(deleteReduxToken());
        navigate("/");
   
        return (
        <div>

        </div>
    )
}