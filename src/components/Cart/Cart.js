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
import displayRazorpay from "../../utils/PaymentGateway";

function Cart() {
  // eslint-disable-next-line
  const removeMed = <p>Remove from cart</p>;
  const addMed = <p>Add to cart</p>;
  const subMed = <p>Subtract from cart</p>;
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  // eslint-disable-next-line
  const onClose = () => {
    setVisible(false);
  };
  const checkOut = () => {
    displayRazorpay();
    onClose();
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
          <Col span={12}>
            <Card
              style={{ width: 200 }}
              className="cart-card"
              cover={
                <img
                  alt="example"
                  className="cart-image"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Popover placement="bottom" content={removeMed} trigger="hover">
                  <CloseCircleOutlined key="remove" />
                </Popover>,
                <Popover placement="bottom" content={subMed} trigger="hover">
                  <MinusOutlined key="subQty" />
                </Popover>,
                <Popover placement="bottom" content={addMed} trigger="hover">
                  <PlusOutlined key="addQty" />
                </Popover>,
              ]}
            >
              This the name of the medicine
              <br />
              <br />
              <div style={{ display: "Flex", justifyContent: "space-around" }}>
                <p>Tablets: 6</p>
                <p>Qty: 8</p>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              style={{ width: 200 }}
              className="cart-card"
              cover={
                <img
                  alt="example"
                  className="cart-image"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Popover placement="bottom" content={removeMed} trigger="hover">
                  <CloseCircleOutlined key="remove" />
                </Popover>,
                <Popover placement="bottom" content={subMed} trigger="hover">
                  <MinusOutlined key="subQty" />
                </Popover>,
                <Popover placement="bottom" content={addMed} trigger="hover">
                  <PlusOutlined key="addQty" />
                </Popover>,
              ]}
            >
              This the name of the medicine
              <br />
              <br />
              <div style={{ display: "Flex", justifyContent: "space-around" }}>
                <p>Tablets: 6</p>
                <p>Qty: 8</p>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              style={{ width: 200 }}
              className="cart-card"
              cover={
                <img
                  alt="example"
                  className="cart-image"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Popover placement="bottom" content={removeMed} trigger="hover">
                  <CloseCircleOutlined key="remove" />
                </Popover>,
                <Popover placement="bottom" content={subMed} trigger="hover">
                  <MinusOutlined key="subQty" />
                </Popover>,
                <Popover placement="bottom" content={addMed} trigger="hover">
                  <PlusOutlined key="addQty" />
                </Popover>,
              ]}
            >
              This the name of the medicine
              <br />
              <br />
              <div style={{ display: "Flex", justifyContent: "space-around" }}>
                <p>Tablets: 6</p>
                <p>Qty: 8</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}

export default Cart;
