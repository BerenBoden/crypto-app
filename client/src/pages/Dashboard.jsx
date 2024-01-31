import AccountBalance from "../partials/dashboard/AccountBalance";
import CryptoBalance from "../partials/dashboard/CryptoBalance";
import Cryptocurrencies from "../partials/dashboard/Cryptocurrencies";
import Transactions from "../partials/dashboard/Transactions";
import { useGetAccountQuery } from "../store/services/account/accountService";
import { useSelector } from "react-redux";
import { useGetAllCryptosQuery } from "../store/services/crypto/cryptoService";
import { useGetTransactionsQuery } from "../store/services/transactions/transactionService";
import { ToastContainer } from "react-toastify";
import { useToastNotificationsRedirect } from "../hooks/toast";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { data: userData, isLoading: userDataIsLoading } = useGetAccountQuery({
    id: user?.id,
  });
  const { data: cryptoData } = useGetAllCryptosQuery({ id: user?.id });
  const { data: transactionData, isLoading: transactionDataIsLoading } =
    useGetTransactionsQuery({
      id: user?.id,
      username: user?.username,
      limit: 9,
    });
  useToastNotificationsRedirect();
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <ToastContainer className="text-xs font-bold mt-14" />
        <div className="grid grid-cols-12 gap-6">
          <AccountBalance
            user={userData}
            userDataIsLoading={userDataIsLoading}
          />
          <CryptoBalance
            user={userData}
            userDataIsLoading={userDataIsLoading}
          />
          <Cryptocurrencies title={"Cryptocurrencies"} cryptos={cryptoData} />
          <Transactions
            title={"Latest Transfers"}
            transactionData={transactionData}
            transactionDataIsLoading={transactionDataIsLoading}
          />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
