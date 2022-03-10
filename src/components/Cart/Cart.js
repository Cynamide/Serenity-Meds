import React, { useState } from "react";
// eslint-disable-next-line
import { Drawer, Button, Space } from "antd";
import { ShoppingCartOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "./Cart.css";

function Cart() {
  // eslint-disable-next-line
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  // eslint-disable-next-line
  const onClose = () => {
    setVisible(false);
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
          <Button type="primary" onClick={onClose}>
            Checkout
            <ArrowRightOutlined />
          </Button>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
}

export default Cart;
