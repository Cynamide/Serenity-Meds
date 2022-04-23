import { Layout, Row, Col, Typography, Button, Input } from "antd";
import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import "./Login.css";
// import { authActions } from "../../redux/actions/authActions";
// import queryString from "query-string";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Login = () => {
  const history = useHistory();

  const [loginError, setLoginError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [url, setUrl] = useState(null);

  // useEffect(() => {
  //   var query = queryString.parse(window.location.href.split("login")[1]);
  //   console.log(query);
  //   if (query) {
  //     setUrl(query);
  //   }
  // }, []);
  const redirectToLanding = (e) => {
    let path = `/`;
    history.push(path);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const normalLogin = () => {
    const body = {
      username: email,
      password: password,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/token/`, body)
      .then((res) => {
        console.log(res);
        localStorage.setItem("access-token", res.data.access);
        localStorage.setItem("refresh-token", res.data.refresh);
        localStorage.setItem("user", JSON.stringify(email));
        redirectToLanding();
        // const data = {
        //   access_token: res.data.access,
        //   refresh_token: res.data.refresh,
        //   type: "SET",
        // };
        // dispatch(authActions(data));
      })
      .catch((err) => {
        setLoginError("Invalid email or password!");
        console.log(err);
      });
  };

  return (
    <>
      <Layout>
        <Content
          style={{ marginTop: "5%", marginBottom: "10%" }}
          className="login-content"
        >
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
                    onClick={history.goBack}
                    className="arrow"
                  />
                  <Title className="login-title">Log in</Title>
                </div>
              </Col>
              <Col xxl={3} xl={3} lg={3} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row>
              <Col xxl={7} xl={7} lg={7} xs={7} md={7} sm={7} />
              <Col
                xxl={10}
                xl={10}
                lg={10}
                xs={10}
                md={10}
                sm={10}
                style={{ color: "black" }}
              ></Col>
              <Col xxl={7} xl={7} lg={7} xs={7} md={7} sm={7} />
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
                  <Paragraph>Login with your e-mail ID</Paragraph>
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
                    <h3>Your e-mail id</h3>
                    <Input
                      value={email}
                      onChange={onChangeEmail}
                      placeholder="Eg: ritesh@NGOGroup.com"
                      className="input-field"
                    />
                  </div>
                  <div style={{ paddingBottom: "1rem" }}>
                    <h3 style={{ marginTop: "5%" }}>Your password</h3>
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
                <Button onClick={normalLogin} className="login-button">
                  Log in
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
                  Don't have an account yet?{" "}
                  <Link to={`/sign-up`}>Create an account</Link>
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
