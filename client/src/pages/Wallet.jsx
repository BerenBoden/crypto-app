import React from "react";
import PaginateChevron from "../partials/dashboard/PaginateChevron";
import WalletForm from "../partials/forms/WalletForm";
import { useGetAllCryptosQuery } from "../store/services/crypto/cryptoService";
import { useSelector } from "react-redux";
import { useGetAccountQuery } from "../store/services/account/accountService";
import { useHostname } from "../hooks/utility";

function Wallet() {
  const hostname = useHostname();
  const { user } = useSelector((state) => state.auth);
  const { data: allCryptos, isLoading: allCryptosIsLoading } =
    useGetAllCryptosQuery({ id: user?.id });
  const { data: userData, isLoading: userDataIsLoading } = useGetAccountQuery({
    id: user?.id,
  });
  const content = {
    title: `Add Funds To Your Account Balance`,
    description: `Add funds to your account balance to buy & sell crypto currency with ${hostname}. Your account will automatically be verified with a $20 deposit.`,
  };
  if (allCryptosIsLoading || userDataIsLoading) return <div>Loading...</div>;
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <PaginateChevron />
        <div className="text-red-500 font-bold">DO NOT SEND ANY CRYPTOCURRENCY TO THE SPECIFICED ADDRESSES. THIS IS ONLY A TOY APPLICATION</div>

        <WalletForm content={content} cryptos={allCryptos} user={userData} />
        
      </div>
    </main>
  );
}

export default Wallet;
