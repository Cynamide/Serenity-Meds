import { Layout, Row, Col, Typography, Button, Input } from "antd";
import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [loginError, setLoginError] = useState("");
  const redirectToLanding = (e) => {
    let path = `/`;
    history.push(path);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeContact = (e) => {
    setContact(e.target.value);
  };

  const handleSignUp = () => {
    const body = {
      username: email,
      email: email,
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1],
      profile: { phone: contact, address: address },
      password: password,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/register/`, body)
      .then((res) => {
        setLoginError("Successfully Signed Up");
        console.log(res);
        const body2 = {
          username: email,
          password: password,
        };
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/user/token/`, body2)
          .then((res) => {
            console.log(res);
            localStorage.setItem("refresh-token", res.data.refresh);
            localStorage.setItem("access-token", res.data.access);
            localStorage.setItem("user", JSON.stringify(email));
            redirectToLanding();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setLoginError("There was an error signing up. Try again.");
        console.log(err);
      });
  };

  return (
    <>
      <Layout>
        <Content style={{ marginTop: "5%", marginBottom: "6%" }}>
          <Fade up>
            <Row>
              <Col xxl={3} xl={3} lg={3} xs={3} md={3} sm={3} />
              <Col
                xxl={18}
                xl={18}
                lg={18}
                xs={18}
                md={18}
                sm={18}
                style={{ color: "black" }}
              >
                <div className="login-top-row">
                  <ArrowLeftOutlined
                    onClick={redirectToLanding}
                    className="arrow"
                  />
                  <Title className="login-title">Create your account</Title>
                </div>
              </Col>
              <Col xxl={3} xl={3} lg={3} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row>
              <Col xxl={7} xl={7} lg={7} xs={3} md={3} sm={3} />
              <Col
                xxl={10}
                xl={10}
                lg={10}
                xs={18}
                md={18}
                sm={18}
                style={{ color: "black" }}
              ></Col>
              <Col xxl={7} xl={7} lg={7} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row>
              <Col xxl={8} xl={8} lg={8} xs={3} md={3} sm={3} />
              <Col
                xxl={8}
                xl={8}
                lg={8}
                xs={18}
                md={18}
                sm={18}
                style={{ color: "black" }}
              ></Col>
              <Col xxl={8} xl={8} lg={8} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row style={{ marginTop: "3%" }}>
              <Col xxl={8} xl={8} lg={8} xs={3} md={3} sm={3} />
              <Col
                xxl={8}
                xl={8}
                lg={8}
                xs={18}
                md={18}
                sm={18}
                style={{ color: "black" }}
              >
                <div className="login-text">
                  <Paragraph>
                    Sign up to get started with Serenity Meds
                  </Paragraph>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={8} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row style={{ marginTop: "1%" }}>
              <Col xxl={7} xl={7} lg={7} xs={3} md={3} sm={3} />
              <Col
                xxl={10}
                xl={10}
                lg={10}
                xs={18}
                md={18}
                sm={18}
                style={{ color: "black" }}
              >
                <div>
                  <div style={{ paddingBottom: "1rem" }}>
                    <h3>Full Name</h3>
                    <Input
                      value={name}
                      onChange={onChangeName}
                      placeholder="Eg: Ritesh Kumar"
                      className="input-field"
                    />
                  </div>
                  <div style={{ paddingBottom: "1rem" }}>
                    <h3>Email</h3>
                    <Input
                      value={email}
                      onChange={onChangeEmail}
                      placeholder="Eg: ritesh@google.com"
                      className="input-field"
                    />
                  </div>
                  <div style={{ paddingBottom: "1rem" }}>
                    <h3>Contact Number</h3>
                    <Input
                      value={contact}
                      onChange={onChangeContact}
                      placeholder="Eg: 9834567890"
                      className="input-field"
                    />
                  </div>
                  <div style={{ paddingBottom: "1rem" }}>
                    <h3>Address</h3>
                    <Input
                      value={address}
                      onChange={onChangeAddress}
                      placeholder="Eg: Flat no-6 , Sector-2, Noida"
                      className="input-field"
                    />
                  </div>
                  <div style={{ paddingBottom: "1rem" }}>
                    <h3>Password</h3>
                    <Input.Password
                      value={password}
                      onChange={onChangePassword}
                      iconRender={(visibile) =>
                        visibile ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      className="input-field"
                    />
                  </div>
                </div>
                {loginError && (
                  <Paragraph
                    style={{
                      color: "red",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    {loginError}
                  </Paragraph>
                )}
                <Button onClick={handleSignUp} className="login-button">
                  Sign Up
                </Button>
              </Col>
              <Col xxl={7} xl={7} lg={7} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row style={{ marginTop: "1%" }}>
              <Col xxl={7} xl={7} lg={7} xs={3} md={3} sm={3} />
              <Col
                xxl={10}
                xl={10}
                lg={10}
                xs={18}
                md={18}
                sm={18}
                style={{ color: "black" }}
              >
                <div style={{ textAlign: "center" }}>
                  Already have an account? <Link to={`/login`}>Login</Link>
                </div>
              </Col>
              <Col xxl={7} xl={7} lg={7} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
        </Content>
      </Layout>
    </>
  );
};
