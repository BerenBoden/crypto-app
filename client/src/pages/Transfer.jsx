import PaginateChevron from "../partials/dashboard/PaginateChevron";
import TransactionForm from "../partials/forms/TransactionForm";
import Transactions from "../partials/dashboard/Transactions";
import { useSelector } from "react-redux";
import { useGetTransactionsQuery } from "../store/services/transactions/transactionService";
import { useGetAllCryptosQuery } from "../store/services/crypto/cryptoService";
import { useHostname } from "../hooks/utility";

function Transfer() {
  const hostname = useHostname();
  const { user } = useSelector((state) => state.auth);
  const { data: transactionData, isLoading: transactionDataIsLoading } =
    useGetTransactionsQuery({
      id: user?.id,
      username: user?.username,
      limit: 12,
    });
  const { data: cryptoData, isLoading: cryptoDataIsLoading } =
    useGetAllCryptosQuery({ id: user?.id });
  const content = {
    title: `Transfer Your Cryptocurrency`,
    description: `Transfer your crypto to other ${hostname} members. Enter the user's username and send your crypto to them instantly. Transfers to ${hostname} members are instant with no extra fees.`,
    addressText: `Enter Reciever's Username`,
    addressPlaceholder: `Username of another ${hostname} member `,
  };
  if (cryptoDataIsLoading || transactionDataIsLoading)
    return <div>Loading...</div>;
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <PaginateChevron />
        <TransactionForm
          content={content}
          cryptos={cryptoData}
        />
        <Transactions
          title={"Latest Transfers"}
          transactionData={transactionData}
        />
      </div>
    </main>
  );
}

export default Transfer;
