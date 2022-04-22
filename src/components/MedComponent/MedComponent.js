import {
  Layout,
  Row,
  Col,
  Typography,
  // Button,
  // Input,
  Card,
  Popover,
} from "antd";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import "./MedComponent.css";
// import { useDispatch } from "react-redux";
// import axios from "axios";
import {
  // ShoppingCartOutlined,
  // ArrowRightOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

// import { authActions } from "../../redux/actions/authActions";
// import queryString from "query-string";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const MedComponent = () => {
  const history = useHistory();
  const removeMed = <p>Remove from cart</p>;
  const addMed = <p>Add to cart</p>;
  const subMed = <p>Subtract from cart</p>;
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
                </div>
              </Col>
              <Col xxl={3} xl={3} lg={3} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
          <Fade up>
            <Row style={{ marginTop: "5rem" }}>
              <Col xxl={5} xl={5} lg={5} xs={3} md={3} sm={3} />
              <Col
                xxl={14}
                xl={14}
                lg={14}
                xs={18}
                md={18}
                sm={18}
                style={{ color: "black" }}
              >
                <Card
                  className="card"
                  actions={[
                    <Popover
                      placement="bottom"
                      content={removeMed}
                      trigger="hover"
                    >
                      <CloseCircleOutlined key="remove" />
                    </Popover>,
                    <Popover
                      placement="bottom"
                      content={subMed}
                      trigger="hover"
                    >
                      <MinusOutlined key="subQty" />
                    </Popover>,
                    <b>6</b>,
                    <Popover
                      placement="bottom"
                      content={addMed}
                      trigger="hover"
                    >
                      <PlusOutlined key="addQty" />
                    </Popover>,
                  ]}
                >
                  <div className="card-container">
                    <img
                      src="https://www.netmeds.com/images/product-v1/600x600/919949/dr_vaidyas_herbo_24_turbo_plus_capsule_30s_0_0.jpg"
                      alt="medicine"
                      className="med-image"
                    />
                    <div className="med-info">
                      <Title level={3}>
                        <b className="med-title">Herbo 24 Turbo Plus Capsule</b>
                      </Title>
                      <Paragraph className="med-details">
                        ₹ 200
                        <br />
                        Pack of: 6
                      </Paragraph>
                      <Paragraph>
                        <ul>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Morbi convallis justo ac orci semper, ut
                          fringilla mi malesuada. Donec augue velit, placerat
                          sed convallis in, suscipit ac lacus
                        </ul>
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xxl={5} xl={5} lg={5} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
        </Content>
      </Layout>
    </>
  );
};
