import { Layout } from "antd";
import "./Footer.css";

const { Footer } = Layout;

export const FooterComp = () => {
  return (
    <>
      <Layout>
        <Footer className="footer-div">
          <div style={{ textAlign: "center" }}>
            <br />
            <h1 className="footer-copyright">
              Serenity Meds Copyrighted @ 2022. All Rights Reserved
            </h1>
          </div>
        </Footer>
      </Layout>
    </>
  );
};
