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
import React, { useEffect, useState } from "react";
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
import MedData from "../../utils/MedData";

// import { authActions } from "../../redux/actions/authActions";
// import queryString from "query-string";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const MedComponent = () => {
  const history = useHistory();
  const removeMed = <p>Remove from cart</p>;
  const addMed = <p>Add to cart</p>;
  const subMed = <p>Subtract from cart</p>;
  const [med, setMed] = useState(null);
  useEffect(() => {
    for (var i in MedData) {
      console.log(MedData[i].name.length, localStorage.getItem("med").length);
      if (
        MedData[i].name ===
        localStorage.getItem("med").replace(/^["'](.+(?=["']$))["']$/, "$1")
      ) {
        setMed(MedData[i]);
        console.log(MedData[i]);
        break; // If you want to break out of the loop once you've found a match
      }
    }
  }, []);

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
            <Row style={{ marginTop: "5rem", marginBottom: "5rem" }}>
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
                {med && (
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
                        src={med.image}
                        alt="medicine"
                        className="med-image"
                      />
                      <div className="med-info">
                        <Title level={3}>
                          <b className="med-title">{med.name}</b>
                        </Title>
                        <Paragraph className="med-details">
                          ₹ {med.price}
                        </Paragraph>
                        <Paragraph>
                          <ul>{med.description}</ul>
                        </Paragraph>
                      </div>
                    </div>
                  </Card>
                )}
              </Col>
              <Col xxl={5} xl={5} lg={5} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
        </Content>
      </Layout>
    </>
  );
};
