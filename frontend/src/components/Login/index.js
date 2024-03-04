import React from "react";
import SideBox from "./../Generic/SideBox";
import InputField from "./../Generic/InputField";
import "./../Generic/credForm.css";
import { Link } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import AppContext from "../../context/appState/AppContext";
import { useVeteranLoginMutation } from "../../services/nodeAPI";
import jwt_decode from "jwt-decode";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [veteranLogin] = useVeteranLoginMutation();

  const navigate = useNavigate();

  const head = "Login to make a smart connection";

  const subHead =
    "VetMeet provide smarter way of connecting with professionals, in few easy steps you can find prefessionals with same interest";

  const { enqueueSnackbar } = useSnackbar();

  const [creds, setCreds] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  const { onChangeGeneric, Cookies } = useContext(AppContext);

  const onChange = onChangeGeneric(creds, setCreds);

  const handleSubmit = async e => {
    setLoading(true);
    try {
      const res = await veteranLogin(creds);

      console.log(res);

      if (res.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setLoading(false);
        Cookies.set("jwt", res.data.token);

        formRef.current.resetFields();
        setCreds({ email: "", password: "" });
        enqueueSnackbar("Logged in successfully!", { variant: "success" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

        localStorage.setItem("userType", "veteran");
      } else {
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <SideBox image="illustrations2.png" width="30rem" heading={head} subHeading={subHead} />
      </div>

      <div className="col-lg-6">
        <div className="container form">
          <div className="form_top_content">
            <h1 className="text-center">Welcome back Veterans</h1>
            <p className="text-center">Please enter your veteran account details to login.</p>

            <Form
              className="row g-2"
              ref={formRef}
              style={{ marginTop: "5rem" }}
              onFinish={handleSubmit}
            >
              <div className="col-md-12">
                <InputField
                  name="email"
                  label="Email Address"
                  onChange={onChange}
                  margin="mx-auto"
                  placeholder="Enter email address"
                  type="email"
                  rules={[{ required: true, message: "Please enter valid email!", type: "email" }]}
                />
              </div>

              <div className="col-md-12">
                <InputField
                  name="password"
                  label="Password"
                  onChange={onChange}
                  margin="mx-auto"
                  placeholder="Enter password"
                  type="password"
                  required={true}
                  rules={[{ required: true, message: "Please enter password!" }]}
                />
              </div>

              <div className="field_width mx-auto d-flex justify-content-between check_input">
                <div className="col-md-4 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                  </label>
                </div>
                <div className="col-md-4 text-end">
                  <a href="/">Forgot Password</a>
                </div>
              </div>

              <div className="col-12 text-center">
                {/* <button className="btn create_account_btn" style={{ width: "70%" }} type="submit">Login</button> */}

                <LoadingButton
                  size="small"
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  className="btn create_account_btn"
                  style={{ width: "70%" }}
                  type="submit"
                >
                  Login
                </LoadingButton>
              </div>
            </Form>
          </div>
        </div>

        <div className="move_signup text-center">
          <p>
            Don't have an vateran account?
            <Link to="/signup" className="ms-2 inline_link">
              Create Veteran Account
            </Link>
          </p>

          <p>
            You can also create Organization
            <Link to="/organization/signup" className="ms-2 inline_link">
              Create Organization
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
