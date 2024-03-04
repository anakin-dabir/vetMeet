import React, { useEffect } from "react";
import "./landingPage.css";
// import Slider from "./Slider";
import { Link, animateScroll as scroll } from "react-scroll";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowRight } from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

const Landing = () => {
  const navigate = useNavigate();

  const changeNavbar = () => {
    $(document).ready(function () {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 200) {
          $(".navbar").addClass("shadow");
        } else {
          $(".navbar").removeClass("shadow");
        }
      });
    });
  };

  const moveToLogin = () => {
    navigate("/login");
  };

  const moveToSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    changeNavbar();
  }, []);

  const cardsContent = [
    {
      img: "img1.png",
      heading: "Talented Organizations",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content",
    },
    {
      img: "img2.png",
      heading: "Smart Search",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content",
    },
    {
      img: "img3.png",
      heading: "Valuable Insights",
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's content",
    },
  ];
  return (
    <>
      {
        //************  NAVBAR **************
      }
      <nav className="navbar navbar-expand-lg navbar-light py-4 fixed-top">
        <div className="container">
          <Link
            className="navbar-brand"
            to="home"
            spy={true}
            smooth={true}
            offset={-90}
            duration={500}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", height: "100%" }}>
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
              <div style={{ fontWeight: 600, color: "#265BC4" }}>VetMeet</div>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-4">
                <Link
                  activeClass="nav_active"
                  className="nav-link nav_links"
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link
                  activeClass="nav_active"
                  className="nav-link nav_links"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                >
                  Services
                </Link>
              </li>

              <li className="nav-item mx-4">
                <Link
                  activeClass="nav_active"
                  className="nav-link nav_links"
                  to="contact_us"
                  spy={true}
                  smooth={true}
                  offset={-90}
                  duration={500}
                >
                  Contact us
                </Link>
              </li>
            </ul>
            <button className="btn add_btn blue_btn" onClick={moveToLogin}>
              {" "}
              Login
            </button>
          </div>
        </div>
      </nav>

      <div className="container landing" id="home">
        <div className="row">
          <div className="col-md-5 first_col">
            <h2 className="landing_text">
              <span className="highlight">VetMeet</span> A Smart
            </h2>
            <h2 className="landing_text">Connection Tool</h2>
            <p className="landing_para">
              VetMeet is web based solution to connect with veterans and engage them into community
              services based on their interests. A veteran (from Latin vetus, meaning "old") is a
              person who has had long service or experience in a particular occupation or field.
            </p>
            <div>
              <button className="btn blue_btn get_start_btn" onClick={moveToSignUp}>
                <span className="me-2">Get Started</span>{" "}
                <FontAwesomeIcon icon={faLongArrowRight} />{" "}
              </button>
              <Link
                className="contact_btn mx-3"
                to="contact_us"
                spy={true}
                smooth={true}
                offset={-90}
                duration={500}
              >
                Contact us
              </Link>
            </div>
          </div>
          <div className="col-md-7">
            <div>
              <img
                src={require("./../../img/illustrations2.png")}
                className="img-fluid"
                alt="landing img"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="services">
        <div className="left_black_img">
          <img
            src={require("./../../img/Group 61.png")}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="right_black_img">
          <img
            src={require("./../../img/Group 1667.png")}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div id="section2" className="container">
          <div className="row text-center fw-bold fs-2">
            <div className="col-4" />
            <div className="col-4">
              <span style={{ color: "#4E79CF" }}>Fast </span>and Relaible{" "}
              <span style={{ color: "#4E79CF" }}>Recruitment</span> Solution
            </div>
            <div className="col-4" />
          </div>
          <div className="row services_bg text-center my-5">
            {cardsContent.map((el, i) => (
              <div key={i} className="col-4 ">
                {" "}
                <Card img={el.img} heading={el.heading} description={el.description} />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="candidate_bg">
        <div className="container my-5">
          <div id="section3">
            <div className="row ">
              <div className="col-6 text-white" style={{ paddingTop: "9rem" }}>
                <h2 className="fw-bold mb-3">Are you a candidate?</h2>
                <small>
                  Are you interested in working for fast growing tech companies? Are you able to
                  work from the Netherlands? Do you have experience and passion for: commercial,
                  tech, product or customer facing roles? Send me your contact details and looking
                  forward to connecting.
                </small>
                <div>
                  <button className="btn get_started_button mt-3 fw-bold">Get Started</button>
                </div>
              </div>
              <div className="col-6 py-5" style={{ paddingLeft: "10rem" }}>
                <div className="girl_img">
                  <img
                    src={require("./../../img/girl.png")}
                    className=" img-fluid ps-5"
                    alt="Candidate"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" container-fluid contact_us" id="contact_us">
        <div className="row mainRow">
          <div className="col-6 contact_us_left">
            <h1>Contact Us</h1>
            <p>
              If you have any question feel free to contact us, our team will get to you in minutes
              and help you with everything you need!
            </p>
          </div>
          <div className="col-6 contact_us_right">
            <form className="row ">
              <div className="col-6">
                <input type="text" id="firstName" placeholder="First name" />
              </div>
              <div className="col-6">
                <input type="text" id="lastName" placeholder="Last name" />
              </div>
              <div className="col-12">
                <input type="text" id="emailAddress" placeholder="Email Address" />
              </div>
              <div className="col-12">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your message here!"
                  defaultValue={""}
                />
              </div>
              <div className="col-12 submit_div">
                <button className="btn btn-primary " type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className=" text-lg-start">
        <div className="container text-md-start">
          <div className="row">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <img src={require("./../../img/Group 1627.png")} alt="linkdin" className="w-50" />
              <p className="pt-4 footer_text">
                Lorem ipsum dolor sit amet, consetetur s sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam{" "}
              </p>
              <div className="pt-3">
                <small className style={{ marginBottom: "0rem !important" }}>
                  Phone
                </small>
                <p className>+85 878 878 787</p>
                <small style={{ marginBottom: "0rem !important" }}>Email Address</small>
                <p className>contact@vetmeet.com</p>
              </div>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className=" fw-bold mb-4">Navigations</h6>
              <p className="pt-2">Home</p>
              <p>Contact us</p>
              <p>FAQ</p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <div className="follow_us">
                <p className="fw-bold" style={{ marginBottom: "0rem !important" }}>
                  Follow us
                </p>
                <img
                  src={require("./../../img/Group 1623.png")}
                  alt="footer img"
                  className="pt-4"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="last_footer text-muted">
          <hr />
          <div className="container pb-3">
            <div className="row text-center">
              <div className="col-4">
                <small>Alright reserved © 2022 </small>
              </div>
              <div className="col-4">
                <small>Any Inquiry ?</small>
              </div>
              <div className="col-4">
                <small>Privacy Policy | Terms &amp; Conditions</small>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
