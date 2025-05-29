import React, { useState } from "react";
import { Alert, Form, Input, message } from "antd";
import { LoadingOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { BASE_URL } from "../../utils/baseURL";
import { getResponseError } from "../../utils/getResponseError";
import Header1 from "../../components/Layout/Header1";
import Footer from "../../components/Layout/Footer";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      // Email validation
      if (!values.email.includes("@") || !values.email.includes(".")) {
        setForgotPasswordError(
          "Please enter a valid email address. Include '@' and ' . '"
        );
        return;
      }
      setLoading(true);
      await axios.post(
        `${BASE_URL}/api/v1/users/send-reset-password-email`,
        values
      );
      setLoading(false);
      message.success("Forgot Password Email sent Successfully...");
      navigate("/forgot-email-sent");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setForgotPasswordError(getResponseError(error));
      message.error("Something went wrong in sending reset password email...!");
    }
  };
  return (
    <>
      <Header1 />
      <div className="forgot-password-content mt-4 layout">
        <div className="forgot-password-page ">
          {loading && <Spinner />}
          <div className="col-md-5 forgot-password-form">
            <Form
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={submitHandler}
              autoComplete="off"
            >
              <h3>Forgot Password?</h3>
              <p>
                Please enter your email address you use to sign in. You will
                receive a link to create a new password via email.
              </p>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your valid email...!",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  className="pass-input"
                  type="text"
                  placeholder="Email"
                  style={{
                    height: 40,
                  }}
                />
              </Form.Item>
              {forgotPasswordError && (
                <Alert
                  message={forgotPasswordError}
                  type="error"
                  showIcon
                  style={{ marginBottom: 15 }}
                />
              )}

              <div className="pb-2 mt-2 d-flex justify-content-center">
                <button className="btn" disabled={loading}>
                  {loading ? <LoadingOutlined /> : "Get Password Reset Link"}
                </button>
              </div>
              <div className="link1  pt-2 d-flex justify-content-center">
                Remember your password?
                <Link to="/login">Login!</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
