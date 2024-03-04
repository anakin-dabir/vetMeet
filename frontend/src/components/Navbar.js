import "../css/Navbar.css";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const Navbar = props => {
  console.log(JSON.parse(localStorage.getItem("user")));

  const user = JSON.parse(localStorage.getItem("user"));
  const userType = localStorage.getItem("userType");

  return (
    <nav className="navbar navbar-expand nav_bar fixed-top">
      <div className="container-fluid">
        <Link
          className="navbar-brand nav_bar_name"
          to={userType === "veteran" ? "/dashboard" : "/dashboard/organizations"}
        >
          <svg
            height="28px"
            width="28px"
            fill="#265BC4"
            viewBox="0 -2.5 29 29"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="m28.595 23.062c-.38.374-.86.649-1.395.781l-.021.004c-.408.08-.878.126-1.358.126-1.172 0-2.281-.274-3.264-.762l.043.019c-4.365-1.92-3.401-6.785-1.486-10.139.575-1.007 1.142-2.022 1.713-3.04.449-.8 1.421-2.155 1.04-3.136-.4-1.029-1.467-1.035-2.168-.168-.634.868-1.206 1.855-1.669 2.901l-.04.102c-.507 1.058-3.04 6.618-3.04 6.618-.553 1.133-1.26 2.101-2.107 2.925l-.002.002c-.375.302-.857.484-1.381.484-.441 0-.851-.129-1.196-.351l.009.005c-.388-.278-.638-.727-.638-1.234 0-.144.02-.284.058-.416l-.003.011c.527-3.022 5.111-10.054 1.95-10.55-1.212-.19-1.541 1.158-1.914 2.019-.618 1.422-1.089 2.902-1.749 4.307-.695 1.434-1.293 3.111-1.706 4.858l-.034.169c-.32 1.386-.731 3.151-2.308 3.573-4.32 1.154-5.63-1.696-5.63-1.697-.705-2.24-.037-4.26.64-6.417.525-1.666.838-3.385 1.502-5.006 1.185-2.89 2.366-8.922 6.64-8.536 1.224.188 2.321.61 3.287 1.221l-.035-.021c.856.499 1.508.766 2.505.228.97-.522 1.414-1.495 2.57-1.829 1.238-.358 2.053.171 2.979.917 1.298 1.04 1.44.572 2.511.298.553-.155 1.189-.244 1.846-.244.37 0 .733.028 1.087.083l-.04-.005c5.01.858 1.819 7.254.624 9.824-.778 1.672-4.49 8.396-1.2 9.299.992.272 2.271.148 3.098.86.838.722.755 1.404.282 1.915z"></path>
            </g>
          </svg>
          VetMeet
        </Link>
        <div className id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item notify_item">
              <a className="notify position-relative">
                <i className="fas fa-bell" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill num_badge">
                  99+
                </span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav_bar_user"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="nav_img_div">
                  <Avatar size="small" icon={<UserOutlined />} />
                </div>

                {userType === "veteran" ? user.firstName + " " + user.lastName : user.name}
                <i className="fa-solid fa-angle-down user_down" />
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                {userType === "veteran" ? (
                  <li>
                    <Link className="dropdown-item" to="/dashboard/settings">
                      {" "}
                      <span className="me-2">
                        <SettingsIcon />
                      </span>{" "}
                      Profile settings
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link className="dropdown-item" to="/dashboard/settings">
                      {" "}
                      <span className="me-2">
                        <SettingsIcon />
                      </span>{" "}
                      Profile settings
                    </Link>
                  </li>
                )}

                <li>
                  <Link className="dropdown-item" to="/login">
                    <span className="me-2">
                      <LogoutIcon />
                    </span>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
