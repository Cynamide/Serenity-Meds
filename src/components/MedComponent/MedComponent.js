import {
  Layout,
  Row,
  Col,
  Typography,
  // Button,
  // Input,
  Button,
  notification,
  Card,
  Popover,
} from "antd";
import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import "./MedComponent.css";
import {
  // ShoppingCartOutlined,
  // ArrowRightOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

// import { authActions } from "../../redux/actions/authActions";
// import queryString from "query-string";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const queryString = require("query-string");

export const MedComponent = () => {
  const history = useHistory();
  const removeMed = <p>Remove from cart</p>;
  const addMed = <p>Add to cart</p>;
  const subMed = <p>Subtract from cart</p>;
  const [med, setMed] = useState(null);
  const [qty, setQty] = useState(0);

  const redirectToLogin = () => {
    history.push("/login");
  };

  const addMedNotif = (type) => {
    if (qty > 0) {
      notification[type]({
        message: `Success`,
        description: `${med.name} added to cart. Total quantity: ${qty + 1}`,
      });
    } else {
      notification[type]({
        message: `Success`,
        description: `${med.name} added to cart`,
      });
    }
  };
  useEffect(() => {
    console.log(qty);
  }, [qty]);
  const subMedNotif = (type) => {
    notification[type]({
      message: `Success`,
      description: `1 ${med.name} removed from cart. Total quantity: ${qty}`,
    });
  };

  const removeMedNotif = (type) => {
    notification[type]({
      message: `Success`,
      description: `${med.name} removed from cart`,
    });
  };

  const onAddMed = () => {
    const id = queryString.parse(history.location.search).id;
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
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/add_to_cart/${id}`,
        {},
        config
      )
      .then((res) => {
        setQty(res.data.quantity);
        console.log(res.data);
        addMedNotif("success");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const onDelete = () => {
    const id = queryString.parse(history.location.search).id;
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
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/user/remove_from_cart/${id}`,
        config
      )
      .then((res) => {
        setQty(res.data.quantity);
        removeMedNotif("success");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const onSubMed = () => {
    const id = queryString.parse(history.location.search).id;
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
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/remove_from_cart/${id}`,
        {},
        config
      )
      .then((res) => {
        setQty(res.data.quantity);
        subMedNotif("success");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  useEffect(() => {
    const id = queryString.parse(history.location.search).id;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/product/${id}/`, config)
      .then((res) => {
        setMed(res.data);
        setQty(res.data.quantity);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [history.location.search]);

  const inCartAction = [
    <Popover placement="bottom" content={removeMed} trigger="hover">
      <CloseCircleOutlined onClick={onDelete} key="remove" />
    </Popover>,
    <Popover placement="bottom" content={subMed} trigger="hover">
      <MinusOutlined onClick={onSubMed} key="subQty" />
    </Popover>,
    <b>{qty}</b>,
    <Popover placement="bottom" content={addMed} trigger="hover">
      <PlusOutlined onClick={onAddMed} key="addQty" />
    </Popover>,
  ];

  const notInCartAction = [
    <Button onClick={onAddMed} className="signup-header-button">
      Add to Cart
    </Button>,
  ];

  const logInCartAction = [
    <Button onClick={redirectToLogin} className="signup-header-button">
      Log In to add to cart
    </Button>,
  ];

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
                    actions={
                      localStorage.getItem("access-token")
                        ? qty > 0
                          ? inCartAction
                          : notInCartAction
                        : logInCartAction
                    }
                  >
                    <div className="card-container">
                      <img
                        src={med.image_url}
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
