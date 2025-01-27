import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";


const Navigation = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try{
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error){
      console.error(error)
    }
  }

  return (
  <div className="fixed bottom-10 left-[32rem] transform translate-x/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] px-[7rem] mb-[2rem] rounded">
    <section className="flex items-centers">
      {/* Section 1 */}
      <div className="flex justify-center items-center">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[1rem] mb-[0.5rem] text-white" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">Home</span>
          </Link>

          <Link to='/movies' className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]">
            <MdOutlineLocalMovies className="mr-2 mt-[1rem] mb-[0.5rem] text-white" size={26} />
          </Link>
      </div>
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
              <button 
              onClick={logoutHandler} 
              className="block w-full px-4 py-2 text-left hove:bg-gray-100">
                Logout
              </button>
            </li>
            </ul>
          )}

            {!userInfo && ( 
              <ul className="flex">
                <li>
                <Link to='/login' className="flex items-center transition-transform transform hover:translate-x-2 mb-[1rem]">
                  <AiOutlineLogin className="ml-5 mr-2S text-white" size={24} />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
                </li>
                <li>
                  <Link to='/register' className="flex items-center transition-transform transform hover:translate-x-2 ml-[2rem]">
                    <AiOutlineUserAdd className="ml-[-1rem] mr-5 text-white" size={25} />
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