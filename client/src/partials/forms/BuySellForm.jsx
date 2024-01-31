import { useForm } from "react-hook-form";
import { usePostCryptoTransactionMutation } from "../../store/services/crypto/cryptoService";
import ShowCurrencySelection from "../components/ShowCurrencySelection";
import Receipt from "../components/Receipt";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useFormDisabler } from "../../hooks/forms";
import { useWatchSelect } from "../../hooks/forms";
import {
  setAmount,
  setCoin,
  setType,
} from "../../store/slices/currencySelection/currencySelection";
import { useSelector, useDispatch } from "react-redux";
import { setReceipt } from "../../store/slices/receipt/receiptSlice";

function BuySellForm({ content, cryptos }) {
  const { type } = useSelector((state) => state.currencySelection);
  const { user } = useSelector((state) => state.auth);
  const { title, description } = content;
  const dispatch = useDispatch();
  const [postCryptoTransaction, { isLoading: transactionIsLoading }] =
    usePostCryptoTransactionMutation();
  const formRef = useFormDisabler(transactionIsLoading);
  const {
    resetField,
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sender: user?.id,
      amount: 0,
      symbol: "BTC",
      type: "purchase",
    },
  });
  const onSubmit = async ({ sender, amount, symbol, type }) => {
    try {
      const receipt = await postCryptoTransaction({
        sender,
        amount: Number(amount),
        symbol,
        type,
      }).unwrap();
      resetField("amount");
      dispatch(setReceipt({ ...receipt, isOpen: true }));
    } catch (error) {
      const apiErrors = error.data.errors;
      apiErrors.forEach((error) => {
        setError(error.param, {
          type: "custom",
          message: error.msg,
        });
      });
    }
  };

  useWatchSelect({ control, name: "symbol", dispatchFunction: setCoin });
  useWatchSelect({ control, name: "type", dispatchFunction: setType });
  useWatchSelect({ control, name: "amount", dispatchFunction: setAmount });
  return (
    <div className="w-full my-4">
      <div className="relative h-full md:h-auto">
        <div className="relative p-4 bg-white shadow  sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 border-b ">
            <h3 className="text font-semibold text-gray-900 capitalize">
              {title}
            </h3>
          </div>
          <ShowCurrencySelection />
          <p className="text-xs my-5">{description}</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className={`${transactionIsLoading ? "opacity-50" : ""}`}
          >
            <label
              htmlFor="type"
              className={`
              block mb-2 text-sm font-medium text-gray-900 `}
            >
              Buy or Sell?
            </label>
            <select
              className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    `}
              {...register("type")}
            >
              <option value="purchase">Buy</option>
              <option value="sell">Sell</option>
            </select>

            <div className="">
              <label
                htmlFor="amount"
                className={`${
                  errors.amount && "text-red-500"
                } block my-2 text-sm font-medium text-gray-900 `}
              >
                {errors.amount ? errors.amount.message : "Amount"}
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className={`${
                  errors.amount && "!border-red-500 !ring-transparent"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    `}
                placeholder="0.000000"
                step="0.000000001"
                {...register("amount")}
              />
            </div>
            <div>
              <label
                htmlFor="currency"
                className={`block text-sm font-medium my-2  text-gray-900 `}
              >
                Select Currency
              </label>
              <select
                id="currency"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                {...register("symbol")}
              >
                {cryptos?.length > 0 ? (
                  cryptos?.map(({ symbol }) => {
                    return (
                      <option key={symbol} value={symbol}>
                        {symbol}
                      </option>
                    );
                  })
                ) : (
                  <option disabled value={false}>
                    No Cryptos
                  </option>
                )}
              </select>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className={`w-full cursor-pointer flex items-center justify-center bg-primary-600 hover:bg-primary-700 focus:ring-4 ${
                  type === "sell" ? "bg-red-600" : "bg-green-600"
                } text-white hover:bg-black hover:text-white transition ease-in-out duration-300 font-medium  text-sm px-5 py-2.5 text-center`}
                {...{
                  disabled:
                    transactionIsLoading || errors.amount || errors.symbol,
                }}
              >
                <div className="capitalize"> {type} &nbsp;</div>
                <div>
                  {type === "sell" ? (
                    <AiOutlineMinusCircle />
                  ) : (
                    <AiOutlinePlusCircle />
                  )}
                </div>
              </button>
            </div>
          </form>
          <Receipt />
        </div>
      </div>
    </div>
  );
}

export default BuySellForm;
