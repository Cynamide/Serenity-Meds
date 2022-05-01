import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Card, List, Collapse } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Orders.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  // eslint-disable-next-line
  const history = useHistory();

  const RedirectToMedPage = (med) => {
    history.push("/medicine?id=" + med.product_fk);
  };

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/order/history/`, config)
      .then((res) => {
        setOrderHistory(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, []);

  const getOrder = (key) => {
    if (key === undefined) {
      setOrders([]);
    } else {
      const token = localStorage.getItem("access-token");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/order/history/${key}`,
          config
        )
        .then((res) => {
          setOrders(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

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
              <Title className="title">Your Orders</Title>
            </Col>
            <Col xxl={3} xl={3} lg={3} xs={2} md={2} sm={2} />
          </Row>
          <Row>
            <Col xxl={4} xl={4} lg={4} xs={4} md={4} sm={4} />
            <Col
              xxl={16}
              xl={16}
              lg={16}
              xs={16}
              md={16}
              sm={16}
              style={{ color: "black" }}
            >
              <br />
              <br />
              <br />
              <Collapse
                className="faq-text"
                accordion
                ghost
                expandIconPosition="right"
                onChange={(key) => getOrder(key)}
              >
                {orderHistory.map((order) => {
                  const date = new Date(order.date_time);
                  const weekday = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ];
                  console.log(date);
                  return (
                    <>
                      <Panel
                        className="panel faq-text"
                        header={
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <b style={{ float: "left" }}>
                              {weekday[date.getDay()] +
                                " " +
                                date.getDate() +
                                "/" +
                                date.getMonth() +
                                "/" +
                                date.getFullYear()}
                            </b>
                            <b style={{ marginLeft: "4rem" }}>
                              Total: ₹ {order.total_price}
                            </b>
                          </div>
                        }
                        key={order.id}
                      >
                        <List
                          grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 2,
                            xxl: 2,
                          }}
                          dataSource={orders}
                          renderItem={(item) => (
                            <List.Item>
                              <Card
                                className="card-class"
                                hoverable
                                onClick={() => RedirectToMedPage(item)}
                              >
                                <div
                                  className="card-container"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <img
                                    src={item.image_url}
                                    alt="medicine"
                                    className="order-image"
                                  />
                                  <div className="order-info">
                                    <Title level={4}>
                                      <b className="order-title">{item.name}</b>
                                    </Title>
                                    <Paragraph className="order-details">
                                      ₹ {item.price}
                                      <br />
                                      Quantity: {item.quantity}
                                    </Paragraph>
                                  </div>
                                </div>
                              </Card>
                            </List.Item>
                          )}
                        />
                      </Panel>
                    </>
                  );
                })}
              </Collapse>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};
