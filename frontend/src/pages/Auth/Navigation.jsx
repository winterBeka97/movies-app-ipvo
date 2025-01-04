import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";


const Navigation = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();

  return (
  <div className="fixed bottom-20 left-[30rem] transform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] px-[4rem] mb-[2rem] rounded">
    <section className="flex justify-between items-center mb-[0.25rem] mt-[-2rem] ml-[0.05rem] mr-[em]">
      {/* Section 1 */}
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[2rem] text-white" size={30} />
            <span className="hidden nav-item-name mt-[3rem]">Home</span>
          </Link>

          <Link to='/movies' className="flex items-center transition-transform transform hover:translate-x-2 ml-[0.125rem]">
            <MdOutlineLocalMovies className="mr-2 mt-[2rem] text-white" size={30} />
            <span className="hidden nav-item-name mt-[2rem]">SHOP</span>
          </Link>
      {/* Section 2 */}
      <div className="relative">
        <button onClick={toggleDropdown} className="text-gray-800 focus:outline-none">
          {userInfo ? (
           <span className="text-white">{userInfo.username}</span>  
          ):(
            <></>
          )}

          {userInfo && (<svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>)}
        </button>

          {dropdownOpen && userInfo && (
            <ul className={`absolute right-0 mt-2 mr-14 w-[10rem] space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-24"}`}>
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link to='/admin/movies/dashboard' className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to='/profile' className="block px-4 py-2 hover:bg-gray-100">
                Profile
                </Link>
            </li>

            <li>
              <button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hove:bg-gray-100">
                Logout
              </button>
            </li>
            </ul>
          )}

            {!userInfo && ( 
              <ul className="flex">
                <li>
                <Link to='/login' className="flex items-center mt-8 transition-transform transform hover:translate-x-2 mb-[2rem]">
                  <AiOutlineLogin className="ml-5 mr-2 mt-[4px] text-white" size={30} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
                </li>
                <li>
                  <Link to='/register' className="flex items-center mt-8 transition-transform transform hover:translate-x-2 ml-[2rem]">
                    <AiOutlineUserAdd className="ml-[-1rem] mr-5 mt-[4px] text-white" size={30} />
                    <span className="hidden nav-item-name">REGISTER</span>
                  </Link>
                </li>
              </ul>
            )}
      </div>
      </section>
  </div>)
  
};

export default Navigation