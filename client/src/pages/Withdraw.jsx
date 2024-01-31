import PaginateChevron from "../partials/dashboard/PaginateChevron";
import WithdrawForm from "../partials/forms/WithdrawForm";
import { useGetAllCryptosQuery } from "../store/services/crypto/cryptoService";
import { useGetWithdrawQuery } from "../store/services/withdraw/withdrawService";
import { useSelector } from "react-redux";
import WithdrawTable from "../partials/tables/WithdrawTable";

function Withdraw() {
  const { user } = useSelector((state) => state.auth);
  const { data: cryptoData, isLoading: cryptoDataIsLoading } =
    useGetAllCryptosQuery({ id: user?.id });
  const { data: withdrawData, isLoading: withdrawDataIsLoading } =
    useGetWithdrawQuery({ id: user?.id });
  const content = {
    title: `Withdraw Your Cryptocurrency`,
    description: `Send your crypto to any wallet.`,
    addressText: "Enter Wallet Address",
    addressPlaceholder: "Enter your wallet address",
  };
  if (cryptoDataIsLoading || withdrawDataIsLoading)
    return <div>Loading...</div>;
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <PaginateChevron />
        <WithdrawForm content={content} cryptos={cryptoData} />
        <WithdrawTable title={"Latest Withdrawals"} withdraws={withdrawData} />
      </div>
    </main>
  );
}

export default Withdraw;
