import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";
import "react-toastify/dist/ReactToastify.css";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Home/Login";
import Register from "./pages/Home/Register";
import Index from "./pages/Home/Index";
import Settings from "./pages/Settings";
import Transfer from "./pages/Transfer";
import Withdraw from "./pages/Withdraw";
import Wallet from "./pages/Wallet";
import Layout from "./partials/layouts/Layout";
import Auth from "./partials/auth/Auth";
import BuySell from "./pages/BuySell";
import NotFound from "./pages/Home/404";
import Payment from "./pages/Payment";
import Verify from "./pages/Home/Verify";
import Privacy from "./pages/Home/Privacy";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route element={<Auth />}>
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/dashboard/buy-sell"
            element={
              <Layout>
                <BuySell />
              </Layout>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route
            path="/dashboard/transfer"
            element={
              <Layout>
                <Transfer />
              </Layout>
            }
          />
          <Route
            path="/dashboard/withdraw"
            element={
              <Layout>
                <Withdraw />
              </Layout>
            }
          />
          <Route
            path="/dashboard/wallet"
            element={
              <Layout>
                <Wallet />
              </Layout>
            }
          />
          <Route path="/add-funds/:address" element={<Payment />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register/verify-email/:email" element={<Verify />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/" element={<Index />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
