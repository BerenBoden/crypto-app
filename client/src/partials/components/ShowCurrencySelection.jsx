import { formatCurrency, formatCoin } from "../../utils/Utils";
import { useGetAccountQuery } from "../../store/services/account/accountService";
import { useSelector } from "react-redux";

function ShowCurrencySelection() {
  const { user } = useSelector((state) => state.auth);
  const { coin, amount, type } = useSelector(
    (state) => state.currencySelection
  );
  const { data: userData, isLoading: userDataIsLoading } = useGetAccountQuery({
    id: user?.id,
  });
  if (userDataIsLoading) return <div>Loading...</div>;
  let cryptoUserValue = userData?.cryptos?.find(
    (crypto) => crypto?.symbol === coin?.symbol
  );
  const purchasePrice = coin?.price * amount;
  const content = (
    <div className="pb-4 border-b w-full">
      <div className="flex flex-col">
        <div className="flex items-center my-1 text-xs font-bold">
          <img src={coin?.link} height={16} width={16} />
          <p className="ml-2 capitalize">
            {coin?.name} @ {formatCurrency(coin?.price)} USD per coin
          </p>
        </div>
        {type != "transfer" && type != "withdraw" ? (
          <div className="my-1">
            <p className="text-xs font-normal mr-2">
              Total account balance:{" "}
              <span className="text-xs font-bold">
                {formatCurrency(userData?.accountBalance)}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="my-1">
          <p className="text-xs font-normal mr-2">
            Total {coin?.symbol} balance:{" "}
            <span className="text-xs font-bold">
              {formatCoin(cryptoUserValue?.amount || 0)}
            </span>
          </p>
        </div>
        <div className="border-b my-3" />

        <div className="my-1">
          <p className="text-xs font-normal mr-2">
            You are about to {type}:{" "}
            <span className="text-xs font-bold">
              {formatCoin(amount)} {coin?.symbol} @{" "}
              {formatCurrency(purchasePrice)}{" "}
            </span>
          </p>
        </div>

        <div className="my-1">
          <p className="text-xs font-normal mr-2">
            Total {coin?.symbol} balance after {type}:{" "}
            <span className="text-xs font-bold">
              {type === "purchase" ? (
                <span className={`${amount != 0 && "text-green-600"}`}>
                  {formatCoin(
                    parseFloat(cryptoUserValue?.amount || 0) +
                      parseFloat(amount)
                  )}{" "}
                  {amount != 0 && "+"}
                </span>
              ) : (
                <span className={`${amount != 0 && "text-red-600"}`}>
                  {formatCoin(
                    parseFloat(cryptoUserValue?.amount || 0) -
                      parseFloat(amount)
                  )}{" "}
                  {amount != 0 && "-"}
                </span>
              )}
            </span>
          </p>
        </div>
        {type != "transfer" && type != "withdraw" ? (
          <div className="my-1">
            <p className="text-xs font-normal mr-2">
              Total account balance after {type}:
              <span className="text-xs font-bold">
                {" "}
                {type === "purchase" ? (
                  <span className={`${amount != 0 && "text-red-600"}`}>
                    {formatCurrency(userData?.accountBalance - purchasePrice)}{" "}
                    {amount != 0 && "-"}
                  </span>
                ) : (
                  <span className={`${amount != 0 && "text-green-600"}`}>
                    {formatCurrency(userData?.accountBalance + purchasePrice)}{" "}
                    {amount != 0 && "+"}
                  </span>
                )}
              </span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
  return <div className="md:flex items-center justify-between">{content}</div>;
}

export default ShowCurrencySelection;
