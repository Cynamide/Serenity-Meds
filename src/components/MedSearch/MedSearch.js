import {
  Layout,
  Row,
  Col,
  Typography,
  // Button,
  // Input,
  Card,
  Popover,
} from "antd";
import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import "./MedSearch.css";
// import { useDispatch } from "react-redux";
// import axios from "axios";

// import { authActions } from "../../redux/actions/authActions";
// import queryString from "query-string";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const MedSearch = () => {
  const history = useHistory();
  const removeMed = <p>Remove from cart</p>;
  const addMed = <p>Add to cart</p>;
  const subMed = <p>Subtract from cart</p>;
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
                  <Title className="search-title">Showing results for: A</Title>
                </div>
              </Col>
              <Col xxl={3} xl={3} lg={3} xs={3} md={3} sm={3} />
            </Row>
          </Fade>
        </Content>
      </Layout>
    </>
  );
};
