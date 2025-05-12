import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setauthUser, setlogIn } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useAuth = () => {
  // States
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies();

  const ValidateUser = async (url, inputs) => {
    setLoading(true); // Start loading state
    try {
      const res = await axios.post(url, inputs, { withCredentials: true });
      // Handle success or failure based on the response
      if (res.data.success) {
        setResponse(res.data);
        toast.success(res.data.message);
        if (res.data.user) {
          dispatch(setauthUser(res.data.user));
          dispatch(setlogIn(true));
          localStorage.setItem("authUser", JSON.stringify(res.data.user));
          localStorage.setItem("authToken" ,res.data.authToken);
          setCookie("authToken", res.data.authToken);
          navigate("/chat");
        } else {
          navigate("/login");
        }
        setLoading(false);
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response ? error.response.data.message : error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  // Return the data, error, and loading
  return { response, loading, error, ValidateUser };
};

export default useAuth;
