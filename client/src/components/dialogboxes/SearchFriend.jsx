import React, { useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import { FaSearch } from "react-icons/fa";
import { IoIosAdd, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setselectedUser } from "../../redux/userSlice";

const SearchFriend = ({ Show, setShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setloading] = useState(false);
  const [SearchedUsers, setSearchedUsers] = useState([]);

  const onChangeHandler = async (e) => {
    setSearchTerm(e.target.value);
    setloading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/auth/search-users`, {
        params: { query: searchTerm },
        withCredentials: true,
      });
      setSearchedUsers(response.data.users);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const StartNewChat = (user) => {
    dispatch(setselectedUser(user));
    navigate("/chat");
    setShow(false);
  };

  return (
    <div
      className="h-screen w-full absolute top-0 left-0 bg-black bg-opacity-50 z-50 items-center justify-center"
      style={{ display: Show ? "flex" : "none" }}
    >
      <div className="md:w-[60%] max-lg:px-5 w-full h-full md:h-[70%] md:max-h-[400px] relative py-10 flex items-center flex-col bg-white rounded-lg cursor-pointer">
        <IoMdClose
          onClick={() => setShow(!Show)}
          className="absolute top-0 right-0 mx-4 my-4 text-3xl"
        />
        <div class="w-full max-lg:pt-5 mb-5 max-w-sm md:min-w-[70%]">
          <div class="relative">
            <input
              class="w-full bg-transparent text-sm border-2 border-primary rounded-md pl-3 pr-28 py-2 shadow-sm"
              placeholder="Search Users"
              value={searchTerm}
              onChange={onChangeHandler}
            />
            <button
              class="absolute top-0 right-0 flex items-center rounded bg-primary py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow h-full"
              type="button"
            >
              <FaSearch className="text-white mr-1" />
              Search
            </button>
          </div>
        </div>
        {loading ? (
          <div className="mt-16">
            <Loading />
          </div>
        ) : (
          <ul className={`space-y-2 w-full md:w-[70%] z-50 `}>
            {Array.isArray(SearchedUsers) &&
              SearchedUsers.map((user) => (
                <li className="flex items-center" key={user._id}>
                  <button
                    className={`w-full flex items-center justify-center p-2 max-lg:p-4 rounded-lg `}
                  >
                    <div className="relative">
                      <img
                        src={user.profilePic}
                        alt={user.fullname}
                        className="w-10 h-10 object-cover rounded-full mr-3"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 mr-3 rounded-full bg-green-500 border-2 border-white`}
                      ></div>
                    </div>
                    <div className="flex-1 text-left">
                      <h2 className="text-sm">@{user.username}</h2>
                    </div>
                  </button>
                  <button onClick={() => StartNewChat(user)}>
                    <IoIosAdd className="text-5xl cursor-pointer pr-4" />
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchFriend;
