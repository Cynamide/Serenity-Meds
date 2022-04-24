import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Button, Card, List } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  VideoCameraOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { authStateReducer } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import MedData from "../../utils/MedData";
import "./Dashboard.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Dashboard = () => {
  const [programme, setProgramme] = useState([]);
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
    localStorage.setItem("med", JSON.stringify(med));
    history.push("/medicine");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/program/list`, config)
      .then((res) => {
        res.data.forEach((element) => {
          element.parent_resource.resource_image =
            `${process.env.REACT_APP_BACKEND_URL}/files` +
            element.parent_resource.resource_image.split("files")[1];
        });
        setProgramme(res.data);
        setLoading(false);
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
          {programme.length > 0 ? (
            <>
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
                    dataSource={MedData}
                    renderItem={(resource) => (
                      <List.Item>
                        <Card
                          className="programme-card"
                          cover={
                            <img
                              className="card-image"
                              alt="example"
                              src={resource.parent_resource.resource_image}
                            />
                          }
                        >
                          <Row>
                            <Col xxl={1} xl={1} lg={1} xs={1} md={1} sm={1} />
                            <Col
                              xxl={21}
                              xl={21}
                              lg={21}
                              xs={21}
                              md={21}
                              sm={21}
                            >
                              <p className="card-title">
                                <b> {resource.program_name}</b>
                              </p>
                            </Col>
                            <Col xxl={2} xl={2} lg={2} xs={2} md={2} sm={2} />
                          </Row>
                          <Row>
                            <Col xxl={1} xl={1} lg={1} xs={1} md={1} sm={1} />
                            <Col
                              xxl={21}
                              xl={21}
                              lg={21}
                              xs={21}
                              md={21}
                              sm={21}
                            >
                              <p className="card-name">
                                {" "}
                                {resource.school_name}
                              </p>
                            </Col>
                            <Col xxl={2} xl={2} lg={2} xs={2} md={2} sm={2} />
                          </Row>
                          <Row style={{ maxHeight: "20px" }}>
                            <Col xxl={1} xl={1} lg={1} xs={1} md={1} sm={1} />
                            <Col
                              xxl={21}
                              xl={21}
                              lg={21}
                              xs={21}
                              md={21}
                              sm={21}
                            >
                              <p className="card-name"> {resource.days}</p>
                            </Col>
                            <Col xxl={2} xl={2} lg={2} xs={2} md={2} sm={2} />
                          </Row>
                          <div className="card-content-div">
                            <p className="card-content">
                              {" "}
                              {resource.parent_resource.content_format ===
                              "Text/PDF Resource" ? (
                                <FileTextOutlined />
                              ) : (
                                <VideoCameraOutlined />
                              )}
                            </p>
                            <p className="card-content">
                              {resource.parent_resource.session_length} minutes
                              x {resource.parent_resource.no_of_sessions}{" "}
                              sessions <ClockCircleOutlined />
                            </p>
                          </div>
                          <Link
                            to={`/programme?id=${resource.id}`}
                            style={{ textAlign: "center" }}
                          >
                            <Button className="plans-button">
                              View plans{" "}
                            </Button>
                          </Link>
                        </Card>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
              </Row>
            </>
          ) : loading ? (
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
                  dataSource={MedData}
                  renderItem={(resource) => (
                    <List.Item>
                      <Card
                        onClick={() => RedirectToMedPage(resource.name)}
                        hoverable
                        className="dash-card"
                      >
                        <div className="dash-card-container">
                          <img
                            src={resource.image}
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
          ) : (
            <>
              <Row style={{ marginTop: "20vh" }}>
                <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
                <Col xxl={16} xl={16} lg={16} xs={20} md={20} sm={20}>
                  <p className="no-session-text">
                    Ongoing Programme will show up here.
                  </p>
                </Col>
                <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
              </Row>
              <Row>
                <Col xxl={8} xl={8} lg={8} xs={4} md={4} sm={4} />
                <Col xxl={8} xl={8} lg={8} xs={16} md={16} sm={16}>
                  <div>
                    <Link to="/teaching-resource">
                      <Button className="create-button">
                        Start a new programme
                      </Button>
                    </Link>
                  </div>
                </Col>
                <Col xxl={8} xl={8} lg={8} xs={4} md={4} sm={4} />
              </Row>
            </>
          )}

          <Row style={{ "margin-top": "10rem" }}>
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
                Didn't find what you were looking for? Search from our extensive
                selection of medicines
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
                    <Button size="large" shape="round" className="search-btn">
                      {resource}
                    </Button>
                  </List.Item>
                )}
              />
            </Col>
            <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
          </Row>
        </Content>
      </Layout>
    </>
  );
};
