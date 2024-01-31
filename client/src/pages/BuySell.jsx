import React from "react";
import PaginateChevron from "../partials/dashboard/PaginateChevron";
import BuySellForm from "../partials/forms/BuySellForm";
import { useGetAllCryptosQuery } from "../store/services/crypto/cryptoService";
import Cryptocurrencies from "../partials/dashboard/Cryptocurrencies";
import { useSelector } from "react-redux";

function BuySell() {
  const { user } = useSelector((state) => state.auth);
  const { data: allCryptos, isLoading: allCryptosIsLoading } =
    useGetAllCryptosQuery({ id: user?.id });

  const content = {
    title: `Buy & Sell Crypto Currency Instantly`,
    description: `Buy & Sell crypto currency instantly with no extra fees.`,
  };

  if (allCryptosIsLoading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <PaginateChevron />
        <BuySellForm content={content} cryptos={allCryptos} />
        <Cryptocurrencies title={"All Cryptocurrencies"} cryptos={allCryptos} />
      </div>
    </main>
  );
}

export default BuySell;
