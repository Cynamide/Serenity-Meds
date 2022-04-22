import { Layout, Row, Col, Typography, Button } from "antd";
import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import "./PaymentSuccess.css";
// import queryString from "query-string";

const { Content } = Layout;
const { Title } = Typography;

export const PaymentSuccess = () => {
  const history = useHistory();
  const redirectToDashboard = () => {
    history.push("/");
  };
  // const [url, setUrl] = useState(null);

  // useEffect(() => {
  //   var query = queryString.parse(window.location.href.split("payment")[1]);
  //   console.log(query);
  //   if (query) {
  //     setUrl(query);
  //   }
  // }, []);

  return (
    <>
      <Layout>
        <Content
          style={{ marginTop: "5%", marginBottom: "10%" }}
          className="payment-content"
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
                <Title className="payment-title payment-top-row">
                  Thank You!
                </Title>
              </Col>
              <Col xxl={3} xl={3} lg={3} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
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
                <div className="payment-top-row">
                  <Title className="payment-subtitle">
                    We have received your order.
                  </Title>
                </div>
              </Col>
              <Col xxl={3} xl={3} lg={3} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row style={{ marginTop: "3rem" }}>
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
                <div className="payment-top-row">
                  <Title className="payment-title">
                    <img
                      src="success.gif"
                      alt="success"
                      style={{ width: "20rem" }}
                    />
                  </Title>
                </div>
              </Col>
              <Col xxl={3} xl={3} lg={3} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row style={{ marginTop: "3rem" }}>
              <Col xxl={9} xl={9} lg={9} xs={9} md={9} sm={9} />
              <Col
                xxl={6}
                xl={6}
                lg={6}
                xs={6}
                md={6}
                sm={6}
                style={{ color: "black" }}
              >
                <div className="payment-top-row">
                  <Button
                    onClick={redirectToDashboard}
                    className="payment-button"
                  >
                    Head back to your Dashboard
                  </Button>
                </div>
              </Col>
              <Col xxl={9} xl={9} lg={9} xs={9} md={9} sm={9} />
            </Row>
          </Fade>
        </Content>
      </Layout>
    </>
  );
};
