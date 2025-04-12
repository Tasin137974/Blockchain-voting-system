import axios from 'axios';
import { useContext, useState } from 'react';
import { GiPodiumWinner, GiVote } from 'react-icons/gi';
import { SiBlockchaindotcom } from 'react-icons/si';
import { BiHome, BiLogIn, BiLogOut } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import {
   AiFillEdit,
   AiOutlinePlusSquare,
   AiOutlineUserAdd,
   AiFillLinkedin,
   AiFillMail,
} from 'react-icons/ai';
const SideBar = ({ setShowSidebar, showSidebar }) => {
   const { user, setUser, notify, election } = useContext(AuthContext);

   const logoutHandler = async () => {
      try {
         await axios.get('/election/logout', {
            withCredentials: true,
         });
         setUser(null);
         notify('User Logged out', 'success');
      } catch (err) {
         notify(err.response.data.errMessage, 'error');
      }
   };
   return (
      <>
         <svg
            onClick={() => setShowSidebar(!showSidebar)}
            className={`fixed md:hidden  z-50 flex items-center cursor-pointer left-10 top-7 ease-in-out duration-300 ${
               showSidebar && 'left-36 md:left-36 lg:left-48'
            }`}
            fill={`${showSidebar ? 'white' : 'blue'}`}
            viewBox='0 0 100 80'
            width='40'
            height='40'
         >
            <rect width='50' height='5'></rect>
            <rect y='15' width='50' height='5'></rect>
            <rect y='30' width='50' height='5'></rect>
         </svg>
         <div
            className={`grid z-30 md:hidden bg-indigo-500 shadow-2xl h-screen px-3 ease-in-out duration-300 justify-items-center fixed ${
               showSidebar ? 'transform translate-full' : 'transform -translate-x-60'
            }
                `}
         >
            <ul className='relative text-lg'>
               <li>
                  <SiBlockchaindotcom className='h-10 w-10 text-white mx-16 my-5 ' />
                  <br />
               </li>

               <div className='border-t border-gray-400 py-4'></div>
               {/* No user logged in */}
               {!user && (
                  <>
                     <li className='relative'>
                        <div>
                           <BiLogIn className='inline text-white my-4' />
                           <Link
                              to='/login'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              Login
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <BiHome className='inline text-white my-4' />
                           <Link to='/' className='text-gray-200 h-12 px-3  hover:text-indigo-300'>
                              Home Page
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiPodiumWinner className='inline text-white my-4' />
                           <Link
                              to='/results'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All results
                           </Link>
                        </div>
                     </li>
                  </>
               )}
               {/* user logged in but no election ongoing */}
               {user && user.role === 'user' && !user.electionOngoing && (
                  <>
                     <li className='relative'>
                        <div>
                           <BiHome className='inline text-white my-4' />
                           <Link to='/' className='text-gray-200 h-12 px-3  hover:text-indigo-300'>
                              Home Page
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiPodiumWinner className='inline text-white my-4' />
                           <Link
                              to='/results'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All results
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <BiLogOut className='inline text-white my-4' />
                           <button
                              className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                              onClick={logoutHandler}
                           >
                              Logout
                           </button>
                        </div>
                     </li>
                  </>
               )}
               {/* user logged in and election ongoing */}
               {user && user.role === 'user' && user.electionOngoing && (
                  <>
                     <li className='relative'>
                        <div>
                           <BiHome className='inline text-white my-4' />
                           <Link to='/' className='text-gray-200 h-12 px-3  hover:text-indigo-300'>
                              Home Page
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiVote className='inline text-white my-4' />
                           <Link
                              to='/election'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              Vote
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiPodiumWinner className='inline text-white my-4' />
                           <Link
                              to='/results'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All results
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <BiLogOut className='inline text-white my-4' />
                           <button
                              className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                              onClick={logoutHandler}
                           >
                              Logout
                           </button>
                        </div>
                     </li>
                  </>
               )}
               {/* admin logged in and election ongoing */}
               {user && user.electionOngoing && user.role === 'admin' && (
                  <>
                     <li className='relative'>
                        <div>
                           <BiHome className='inline text-white my-4' />
                           <Link to='/' className='text-gray-200 h-12 px-3  hover:text-indigo-300'>
                              Home Page
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiVote className='inline text-white my-4' />
                           <Link
                              to='/election'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              Manage Election
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <GiPodiumWinner className='inline text-white my-4' />
                           <Link
                              to='/results'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All results
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <HiUserGroup className='inline text-white my-4' />
                           <Link
                              to='/users'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              All users
                           </Link>
                        </div>
                     </li>
                     <li className='relative'>
                        <div>
                           <BiLogOut className='inline text-white my-4' />
                           <button
                              className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                              onClick={logoutHandler}
                           >
                              Logout
                           </button>
                        </div>
                     </li>
                  </>
               )}

               {/* Admin , no election ongoing and not added elction yet */}
               {user &&
                  !user.electionOngoing &&
                  user.role === 'admin' &&
                  election === '0x0000000000000000000000000000000000000000' && (
                     <>
                        <li className='relative'>
                           <div>
                              <BiHome className='inline text-white my-4' />
                              <Link
                                 to='/'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Home Page
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <AiOutlinePlusSquare className='inline text-white my-4' />
                              <Link
                                 to='/addElection'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Add Election
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <GiPodiumWinner className='inline text-white my-4' />
                              <Link
                                 to='/results'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 All results
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <HiUserGroup className='inline text-white my-4' />
                              <Link
                                 to='/users'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 All users
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <BiLogOut className='inline text-white my-4' />
                              <button
                                 className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                                 onClick={logoutHandler}
                              >
                                 Logout
                              </button>
                           </div>
                        </li>
                     </>
                  )}
               {/* Admin , no election ongoing and already added elction */}
               {user &&
                  !user.electionOngoing &&
                  user.role === 'admin' &&
                  election !== '0x0000000000000000000000000000000000000000' && (
                     <>
                        <li className='relative'>
                           <div>
                              <BiHome className='inline text-white my-4' />
                              <Link
                                 to='/'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Home Page
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <GiVote className='inline text-white my-4' />
                              <Link
                                 to='/election'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Manage Election
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <AiOutlineUserAdd className='inline text-white my-4' />
                              <Link
                                 to='/addCandidate'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 Add Candidate
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <GiPodiumWinner className='inline text-white my-4' />
                              <Link
                                 to='/results'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 All results
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <HiUserGroup className='inline text-white my-4' />
                              <Link
                                 to='/users'
                                 className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                              >
                                 All users
                              </Link>
                           </div>
                        </li>
                        <li className='relative'>
                           <div>
                              <BiLogOut className='inline text-white my-4' />
                              <button
                                 className='text-gray-200 h-12 px-3 hover:text-indigo-300'
                                 onClick={logoutHandler}
                              >
                                 Logout
                              </button>
                           </div>
                        </li>
                     </>
                  )}
               {user && (
                  <>
                     {/* Ethereum Address {user.eAddress} */}
                     <li className='relative'>
                        <div>
                           <AiFillEdit className='inline text-white my-4' />
                           <Link
                              to='/edituser'
                              className='text-gray-200 h-12 px-3  hover:text-indigo-300'
                           >
                              Edit your address
                           </Link>
                        </div>
                     </li>
                  </>
               )}
            </ul>
            <div className='mt-auto'>
               <div className='border-t border-white py-4'></div>
               <p className='text-gray-200 my-5'>
                  Contact developer{' '}
                  <a href='https://www.linkedin.com/'>
                     <AiFillLinkedin className='inline' />
                  </a>
                  <a href=''>
                     <AiFillMail className='inline' />
                  </a>
               </p>
            </div>
         </div>
      </>
   );
};

export default SideBar;
