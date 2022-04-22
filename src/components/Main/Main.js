import React from "react";
import { Switch, Route } from "react-router-dom";
import { DashboardPage } from "../../pages/DashboardPage";
import { SignUpPage } from "../../pages/SignUpPage";
import { LoginPage } from "../../pages/LoginPage";
import { PaymentSuccessPage } from "../../pages/PaymentSuccessPage";
import { MedComponentPage } from "../../pages/MedComponentPage";
export const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={DashboardPage} />
      <Route exact path="/volunteer-dashboard" component={DashboardPage} />
      <Route exact path="/sign-up" component={SignUpPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/payment-success" component={PaymentSuccessPage} />
      <Route exact path="/medicine" component={MedComponentPage} />
    </Switch>
  );
};
