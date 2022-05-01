import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Button, Card, List } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { authStateReducer } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import "./Dashboard.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Dashboard = () => {
  const [dataBoard, setDataBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const auth = useSelector((data) => authStateReducer(data));
  // eslint-disable-next-line
  const history = useHistory();
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const RedirectToMedPage = (med) => {
    history.push("/medicine?id=" + med.id);
  };

  const onSearch = (data) => {
    localStorage.setItem("search", JSON.stringify(data.target.outerText));
    history.push("/search");
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      alphabet: "a",
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/product/`, data, config)
      .then((res) => {
        setDataBoard(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);
  return (
    <>
      <Layout style={{ marginTop: "5%" }}>
        <Content className="content-class" style={{ marginBottom: "5%" }}>
          <Row>
            <Col xxl={3} xl={3} lg={3} xs={2} md={2} sm={2} />
            <Col
              xxl={18}
              xl={18}
              lg={18}
              xs={20}
              md={20}
              sm={20}
              style={{ color: "black", textAlign: "center" }}
            >
              <Title className="title">
                Find the meds of your choice from our assorted list below!
              </Title>
            </Col>
            <Col xxl={3} xl={3} lg={3} xs={2} md={2} sm={2} />
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
            <Col xxl={16} xl={16} lg={16} xs={20} md={20} sm={20}>
              <List
                grid={{
                  gutter: 16,
                  xs: 6,
                  sm: 6,
                  md: 6,
                  lg: 13,
                  xl: 13,
                  xxl: 13,
                }}
                dataSource={alphabets}
                renderItem={(resource) => (
                  <List.Item>
                    <Button
                      onClick={onSearch}
                      size="large"
                      shape="round"
                      id={resource}
                      className="search-btn"
                    >
                      {resource}
                    </Button>
                  </List.Item>
                )}
              />
            </Col>
            <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
          </Row>
          {dataBoard && (
            <Row style={{ marginTop: "80px" }}>
              <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
              <Col xxl={16} xl={16} lg={16} xs={20} md={20} sm={20}>
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 2,
                    xl: 2,
                    xxl: 3,
                  }}
                  loading={loading}
                  dataSource={dataBoard.product_list}
                  renderItem={(resource) => (
                    <List.Item>
                      <Card
                        onClick={() => RedirectToMedPage(resource)}
                        hoverable
                        className="dash-card"
                      >
                        <div className="dash-card-container">
                          <img
                            src={resource.image_url}
                            alt="medicine"
                            className="dash-med-image"
                          />
                          <div className="dash-med-info">
                            <Title level={3}>
                              <b className="dash-med-title">{resource.name}</b>
                            </Title>
                            <Paragraph className="dash-med-details">
                              ₹ {resource.price}
                            </Paragraph>
                          </div>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </Col>
              <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
            </Row>
          )}
        </Content>
      </Layout>
    </>
  );
};
