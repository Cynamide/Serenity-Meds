import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./Cart.css";

function Cart() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button className="view-cart-button" type="primary" onClick={showDrawer}>
        <ShoppingCartOutlined className="cart-icon" />
      </Button>
    </>
  );
}

export default Cart;
