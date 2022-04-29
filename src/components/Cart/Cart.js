import React, { useState } from "react";
// eslint-disable-next-line
import { Drawer, Button, Card, Row, Col, Popover } from "antd";
import {
  ShoppingCartOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./Cart.css";
// import DisplayRazorpay from "../../utils/PaymentGateway";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Cart() {
  // eslint-disable-next-line
  const removeMed = <p>Remove from cart</p>;
  const addMed = <p>Add to cart</p>;
  const subMed = <p>Subtract from cart</p>;
  const [visible, setVisible] = useState(false);
  const [cartData, setCartData] = useState([]);
  let navigate = useHistory();
  const showDrawer = () => {
    viewCart();
    setVisible(true);
  };
  // eslint-disable-next-line
  const onClose = () => {
    setVisible(false);
  };
  const checkOut = () => {
    // const data = await fetch("http://localhost:1337/razorpay", {
    //   method: "POST",
    // }).then((t) => t.json());
    const data = { currency: "INR", amount: "1000" };
    console.log(data);

    const options = {
      key: "rzp_test_RoWkvu9j4djJnF",
      currency: data.currency,
      amount: data.amount,
      name: "Serenity Meds",
      description: "Wallet Transaction",
      image: "https://serenitymeds.ml/logo.png",
      order_id: data.id,
      handler: function (response) {
        // alert("PAYMENT ID ::" + response.razorpay_payment_id);
        // alert("ORDER ID :: " + response.razorpay_order_id);
        if (!response.razorpay_payment_id || response.razorpay_payment_id < 1) {
          navigate.push("/payment-failed");
        } else {
          navigate.push("/payment-success");
        }
        console.log(response);
      },
      prefill: {
        name: "Arjit Agarwal",
        email: "arjitagarwal123@gmail.com",
        contact: "9860901274",
      },
      theme: {
        color: "#2ab7ca",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const viewCart = () => {
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/cart/`, config)
      .then((res) => {
        setCartData(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <>
      <Button className="view-cart-button" type="primary" onClick={showDrawer}>
        <ShoppingCartOutlined className="cart-icon" />
      </Button>
      <Drawer
        title="Your cart"
        placement="right"
        width={500}
        onClose={onClose}
        visible={visible}
        extra={
          <Button type="primary" onClick={checkOut}>
            Checkout
            <ArrowRightOutlined />
          </Button>
        }
      >
        <Row gutter={[16, 16]}>
          {cartData.map((med) => (
            <Col span={12}>
              <Card
                style={{ width: 200 }}
                className="cart-card"
                cover={
                  <img alt="example" className="cart-image" src={med.image} />
                }
                actions={[
                  <Popover
                    placement="bottom"
                    content={removeMed}
                    trigger="hover"
                  >
                    <CloseCircleOutlined key="remove" />
                  </Popover>,
                  <Popover placement="bottom" content={subMed} trigger="hover">
                    <MinusOutlined key="subQty" />
                  </Popover>,
                  <b>6</b>,
                  <Popover placement="bottom" content={addMed} trigger="hover">
                    <PlusOutlined key="addQty" />
                  </Popover>,
                ]}
              >
                {med.name}
                <br />
                <br />
                <p>₹ {med.price}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Drawer>
    </>
  );
}

export default Cart;
