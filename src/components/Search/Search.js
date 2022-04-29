import React, { useState, useEffect } from "react";
import { Layout, Typography, Row, Col, Button, Card, List } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Search = () => {
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
  const [alphabet, setAlphabet] = useState("a");
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("DATA:", data.product_list);
  }, [data]);

  const onSearch = (data) => {
    setAlphabet(data.target.outerText);
  };

  const RedirectToMedPage = (med) => {
    history.push("/medicine?id=" + med.id);
  };

  useEffect(() => {
    if (alphabet) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = {
        alphabet: alphabet,
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/product/`, data, config)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  }, [alphabet]);

  return (
    <>
      <Layout style={{ marginTop: "5%" }}>
        <Content className="content-class" style={{ marginBottom: "5%" }}>
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
          <Row style={{ marginTop: "80px" }}>
            <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
            <Col xxl={16} xl={16} lg={16} xs={20} md={20} sm={20}>
              {data.product_list && (
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
                  dataSource={data.product_list}
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
              )}
            </Col>
            <Col xxl={4} xl={4} lg={4} xs={2} md={2} sm={2} />
          </Row>
        </Content>
      </Layout>
    </>
  );
};
