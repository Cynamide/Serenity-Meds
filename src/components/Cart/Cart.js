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
  const onAddMed = (id) => {
    console.log("id:", id);
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
        // const arr = [...cartData];
        // //eslint-disable-next-line
        // let obj = arr.find((o, i) => {
        //   if (o.id === id) {
        //     arr[i]["quantity"] = res.data.quantity;
        //     return true; // stop searching
        //   }
        // });
        // setCartData(arr);
        // console.log(arr);
        console.log(res.data);
        viewCart();
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const onDelete = (id) => {
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
        // const arr = [...cartData];
        // //eslint-disable-next-line
        // let obj = arr.find((o, i) => {
        //   if (o.id === id) {
        //     arr.splice(i, 1);
        //     return true; // stop searching
        //   }
        // });
        // setCartData(arr);
        // console.log(arr);
        viewCart();
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const onSubMed = (id) => {
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
        viewCart();
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const redirectToMedPage = (id) => {
    navigate.push("/medicine?id=" + id);
  };
  // eslint-disable-next-line
  const onClose = () => {
    setVisible(false);
  };

  const checkOutBackend = () => {
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/checkout/`, config)
      .then((res) => {
        setVisible(true);
      })
      .catch((err) => {
        console.log(err.data);
      });
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
          checkOutBackend();
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const total = () => {
    let sum = 0;
    cartData.map((item) => {
      sum += item.price * item.quantity;
    });
    return sum;
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
          <div style={{ display: "flex", marginTop: "0.5rem" }}>
            <p style={{ marginRight: "1rem", fontSize: "1rem" }}>
              Total: ₹ {total()}{" "}
            </p>
            <Button type="primary" onClick={checkOut}>
              Checkout
              <ArrowRightOutlined />
            </Button>
          </div>
        }
      >
        <Row gutter={[16, 16]}>
          {cartData.map(
            (med) =>
              med.quantity > 0 && (
                <Col span={12}>
                  <Card
                    style={{ width: 200 }}
                    className="cart-card"
                    cover={
                      <img
                        alt="example"
                        className="cart-image"
                        onClick={() => redirectToMedPage(med.product)}
                        src={med.image_url}
                      />
                    }
                    actions={[
                      <Popover
                        placement="bottom"
                        content={removeMed}
                        trigger="hover"
                      >
                        <CloseCircleOutlined
                          onClick={() => onDelete(med.product)}
                          key="remove"
                        />
                      </Popover>,
                      <Popover
                        placement="bottom"
                        content={subMed}
                        trigger="hover"
                      >
                        <MinusOutlined
                          onClick={() => onSubMed(med.product)}
                          key="subQty"
                        />
                      </Popover>,
                      <b>{med.quantity}</b>,
                      <Popover
                        placement="bottom"
                        content={addMed}
                        trigger="hover"
                      >
                        <PlusOutlined
                          onClick={() => onAddMed(med.product)}
                          key="addQty"
                        />
                      </Popover>,
                    ]}
                  >
                    {med.name}
                    <br />
                    <br />
                    <p>
                      ₹ {med.price} x {med.quantity} = ₹
                      {med.price * med.quantity}
                    </p>
                  </Card>
                </Col>
              )
          )}
        </Row>
      </Drawer>
    </>
  );
}

export default Cart;
