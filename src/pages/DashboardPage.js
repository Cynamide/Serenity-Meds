import { Header } from "../components/Header/Header";
import { FooterComp } from "../components/Footer/FooterComp";
import { useEffect } from "react";
import { Dashboard } from "../components/Dashboard/Dashboard";

export const DashboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Dashboard />
      <FooterComp />
    </>
  );
};
