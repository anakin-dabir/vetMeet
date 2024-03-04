import '../css/SideNavbar.css';
import { useLocation } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';

export const SideNavbar=( props ) => {

  const location=useLocation();


  const userType=localStorage.getItem("userType");


  return (
    // d-flex flex-column flex-shrink-0 
    <>
      <div className="side_bar">
        <ul className="nav nav-pills flex-column mb-auto">
          {
            userType==="veteran" && <li >
              <Link to='/dashboard' className={`nav-link ${location.pathname.endsWith( "dashboard" )||location.pathname.endsWith( '/' )||location.pathname.endsWith( 'd' )? "side_bar_active":'side_bar_link'}`} aria-current="page">
                {/* <i className="fa-solid fa-user side_bar_icon" /> */}
                <span className='side_bar_icon'> <DashboardIcon /> </span>
                Home
              </Link>
            </li>
          }

          {
            (userType==="veteran" || userType==="community")  &&<li>
              <Link to='/dashboard/organizations' className={`nav-link  ${location.pathname.includes( "organizations" )? "side_bar_active":'side_bar_link'}`}>
                <span className='side_bar_icon'> <WorkIcon /> </span>

                Organizations
              </Link>
            </li>
          }

          {
            userType==="veteran" &&<li>
              <Link to='/dashboard/people' className={`nav-link  ${location.pathname.includes( "people" )? "side_bar_active":'side_bar_link'}`}>
                <span className='side_bar_icon'> <PeopleIcon /> </span>
                People
              </Link>
            </li>
          }

          {
           (userType==="veteran" || userType==="community") && <li>
              <Link to='/dashboard/events' className={`nav-link  ${location.pathname.includes( "events" )? "side_bar_active":'side_bar_link'}`}>
                <span className='side_bar_icon'> <PeopleIcon /> </span>
                Events
              </Link>
            </li>
          }
          {
             userType==="veteran" &&<li>
              <Link to='/dashboard/invitations' className={`nav-link  ${location.pathname.includes( "invitations" )? "side_bar_active":'side_bar_link'}`}>
                <span className='side_bar_icon'> <PeopleIcon /> </span>
                Invitations
              </Link>
            </li>
          }
        </ul>
      </div>

    </>

  )
}
