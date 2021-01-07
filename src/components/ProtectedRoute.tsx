// A wrapper for <Route> that redirects to the login
import React from "react";
import { Route, RouteProps, Switch } from "react-router-dom";
import config from "../config";
import LaunchCountdown from "./LaunchCountdown";
import Page from "./Page";
import PageHeader from "./PageHeader";
import dataImg from "../assets/img/cyberchip.png";

// screen if not launched
export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const isLaunched = Date.now() >= config.wholeSiteLaunchesAt.getTime();

    return (
    <Route
      {...rest}
      render={() =>
        isLaunched ? (
          children
        ) : (
          <Switch>
        <Page>
          <PageHeader
            icon={dataImg}
            title="YSD Launching Countdown"
            subtitle="Deposit Stablecoins, earn YSD and more"
          />
          <LaunchCountdown
            deadline={config.wholeSiteLaunchesAt}
            description="How does the YSD work?"
            descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism#expansionary-policy"
          />
        </Page>
      </Switch>
        )
      }
    />
  );
}