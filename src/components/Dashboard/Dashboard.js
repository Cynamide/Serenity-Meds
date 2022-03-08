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
import "./Dashboard.css";

const { Content } = Layout;
const { Title } = Typography;

export const Dashboard = () => {
  const [programme, setProgramme] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((data) => authStateReducer(data));
  const history = useHistory();

  // useEffect(() => {
  //   if (!auth.authStateReducer.access_token) {
  //     history.push("/login");
  //   }
  //   // eslint-disable-next-line
  // }, [auth]);

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
              <Row>
                <Col xxl={6} xl={6} lg={6} xs={6} md={6} sm={6} />
                <Col xxl={12} xl={12} lg={12} xs={12} md={12} sm={12}>
                  <div style={{ marginTop: 30, textAlign: "center" }}>
                    <Link to="/teaching-resources">
                      <Button className="programme-button">
                        Start a new programme{" "}
                      </Button>
                    </Link>
                  </div>
                </Col>
                <Col xxl={6} xl={6} lg={6} xs={6} md={6} sm={6} />
              </Row>
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
                    dataSource={programme}
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
                  dataSource={[
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                    { loading: true },
                  ]}
                  renderItem={(resource) => (
                    <List.Item>
                      <Card
                        className="programme-card"
                        loading={resource.loading}
                      />
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
        </Content>
      </Layout>
    </>
  );
};
