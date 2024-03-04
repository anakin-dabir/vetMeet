import React, { useState, useRef, useContext } from "react";
import SideBox from "../Generic/SideBox";
import InputField from "../Generic/InputField";
import "./../Generic/credForm.css";
import { Link } from "react-router-dom";
import { Form } from "antd";
import { VariantType, useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import AppContext from "../../context/appState/AppContext";
import { useNavigate } from "react-router-dom";

import { useCommunitySignupMutation } from "../../services/nodeAPI";
import { Select } from "antd";

const { Option } = Select;

const SignUpForm = () => {
  const head = "Introducing smart ways to connect Professionals";
  const subHead =
    "VetMeet provide smarter way of connecting with professionals, in few easy steps you can find prefessionals with same interest";

  const [communitySignup] = useCommunitySignupMutation();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const confirmPass = useRef(null);

  const { onChangeGeneric } = useContext(AppContext);

  const onChange = onChangeGeneric(creds, setCreds);

  const handleSubmit = async values => {
    console.log(values);

    setLoading(true);

    if (creds.password !== creds.passwordConfirm) {
      setLoading(false);
      enqueueSnackbar("Password and Confirm Password are not same", { variant: "error" });
    } else {
      const res = await communitySignup(values);

      console.log(res);

      if (res.data.status === "success") {
        setLoading(false);
        formRef.current.resetFields();
        setCreds({ name: "", email: "", password: "", passwordConfirm: "", phone: "", type: "" });
        enqueueSnackbar("Account has been created successfully!", { variant: "success" });

        setTimeout(() => {
          navigate("/organization/login");
        }, 2000);
      } else {
        setLoading(false);

        enqueueSnackbar("something went wrong!", { variant: "error" });
      }
    }
  };

  return (
    <div className="row">
      <div className="col-lg-6">
        <SideBox image="illustrations2.png" width="320px" heading={head} subHeading={subHead} />
      </div>

      <div className="col-lg-6">
        <div className="container form">
          <div className="form_top_content">
            <h1 className="text-center">Create Community</h1>
            <p className="text-center">Please provide all the required information</p>

            <Form className="row g-2 mt-3" ref={formRef} onFinish={handleSubmit}>
              <div className="col-md-6">
                <InputField
                  name="name"
                  label="Name"
                  type="text"
                  margin="ms-auto"
                  placeholder="Enter name"
                  rules={[{ required: true, message: "Please enter name!" }]}
                  onChange={onChange}
                />
              </div>

              <div className="col-md-6">
                <InputField
                  name="phone"
                  label="Enter phone no"
                  type="phone"
                  margin="me-auto"
                  placeholder="Enter phone no"
                  rules={[{ required: true, message: "Please enter phone!" }]}
                  onChange={onChange}
                />
              </div>

              <div className="col-md-6">
                <InputField
                  name="email"
                  label="Email Address"
                  type="email"
                  margin="ms-auto"
                  placeholder="Enter email address"
                  rules={[{ required: true, message: "Please enter valid email!", type: "email" }]}
                  onChange={onChange}
                />
              </div>
              <div className="col-md-6">
                <div className="me-auto" style={{ width: "70%" }}>
                  <label className="form-label">Type</label>
                </div>

                <Form.Item
                  name="type"
                  style={{ width: "70%" }}
                  rules={[{ required: true, message: "Please select type!" }]}
                >
                  <Select placeholder="select type of community">
                    <Option value="organization">Organization</Option>
                    <Option value="education institue">Education Institue</Option>
                    <Option value="NGO">NGO</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="col-md-12">
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  margin="mx-auto"
                  placeholder="Enter password"
                  rules={[{ required: true, message: "Please enter password!" }]}
                  onChange={onChange}
                />
              </div>

              <div className="col-md-12">
                <InputField
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  margin="mx-auto"
                  onChange={onChange}
                  placeholder="Confirm your password"
                  rules={[
                    { required: true, message: "Confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("The two passwords that you entered do not match!")
                        );
                      },
                    }),
                  ]}
                />
              </div>

              <div className="col-12 text-center">
                {/* <button className="btn create_account_btn" style={{ width: "70%" }} type="submit">Create Account</button> */}

                <LoadingButton
                  size="small"
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  className="btn create_account_btn"
                  style={{ width: "70%" }}
                  type="submit"
                >
                  Create Account
                </LoadingButton>
              </div>

              <div className=" mx-auto mt-4" style={{ width: "74%" }}>
                <p className="Pricay_msg text-muted">
                  By clicking create account, you aggreed to{" "}
                  <a href="/" className="Links">
                    {" "}
                    Terms of Services
                  </a>{" "}
                  and acknowledge you have read the{" "}
                  <a href="/" className="Links">
                    Privacy Policy.
                  </a>
                </p>
              </div>
            </Form>
          </div>
        </div>

        <div className="move_login text-center">
          <p>
            Already have an community?
            <Link to="/organization/login" className="ms-2 inline_link">
              Login
            </Link>
          </p>

          <p>
            Login to Veteran account
            <Link to="/login" className="ms-2 inline_link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
