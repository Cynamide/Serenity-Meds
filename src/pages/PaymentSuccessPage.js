import { FooterComp } from "../components/Footer/FooterComp";
import { Header } from "../components/Header/Header";
import { PaymentSuccess } from "../components/PaymentSuccess/PaymentSuccess";

export const PaymentSuccessPage = () => {
  return (
    <>
      <Header />
      <PaymentSuccess />
      <FooterComp />
    </>
  );
};
