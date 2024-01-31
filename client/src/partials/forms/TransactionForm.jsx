import { useForm } from "react-hook-form";
import { usePostTransactionMutation } from "../../store/services/transactions/transactionService";
import ShowCurrencySelection from "../components/ShowCurrencySelection";
import {useFormDisabler} from "../../hooks/forms";
import { useSelector, useDispatch } from "react-redux";
import Receipt from "../components/Receipt";
import { setReceipt } from "../../store/slices/receipt/receiptSlice";
import { useWatchSelect } from "../../hooks/forms";
import {
  setAmount,
  setCoin,
  setType,
} from "../../store/slices/currencySelection/currencySelection";

function TransactionForm({ content, cryptos }) {
  const { user } = useSelector((state) => state.auth);
  const { title, description, addressText, addressPlaceholder } = content;
  const dispatch = useDispatch();
  const [postCryptoTransaction, { isLoading }] = usePostTransactionMutation();
  const formRef = useFormDisabler(isLoading);
  const {
    control,
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sender: user.id,
      receiver: "",
      amount: 0,
      symbol: "BTC",
      type: "transfer",
    },
  });
  const onSubmit = async (data) => {
    try {
      const transaction = await postCryptoTransaction(data).unwrap();
      dispatch(setReceipt({ ...transaction, isOpen: true }));
      resetField("amount");
    } catch (error) {
      const apiErrors = error.data.errors;
      apiErrors.map((error) => {
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
          <div className="flex justify-between items-center pb-4 mb-4 border-b dark:border-gray-600">
            <h3 className="text font-semibold text-gray-900  capitalize">
              {title}
            </h3>
          </div>
          <ShowCurrencySelection />
          <p className="text-xs my-5">{description}</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            ref={formRef}
            className={`${isLoading && "opacity-50"}`}
          >
            <input className="hidden" {...register("sender")} />
            <div className="my-3">
              <label
                htmlFor="receiver"
                className={`${
                  errors.receiver && "text-red-500"
                } block mb-2 text-sm font-medium text-gray-900 `}
              >
                {errors.receiver ? errors.receiver?.message : addressText}
              </label>
              <input
                type="text"
                name="receiver"
                id="receiver"
                className={`${
                  errors.receiver && "!border-red-500 !ring-transparent"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      `}
                placeholder={`${addressPlaceholder}`}
                {...register("receiver")}
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="amount"
                className={`${
                  errors.amount && "text-red-500"
                } block mb-2 text-sm font-medium text-gray-900 `}
              >
                {errors.amount ? errors.amount.message : "Amount"}
              </label>
              <input
                type="number"
                name="amount"
                className={`${
                  errors.amount && "!border-red-500 !ring-transparent"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `}
                placeholder="0.000000"
                step="0.000000001"
                {...register("amount")}
              />
            </div>
            <div>
              <label
                htmlFor="symbol"
                className={`${
                  errors.symbol && "text-red-500"
                } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
              >
                Select Currency
              </label>
              <select
                id="currency"
                className={`${
                  errors.symbol && "!border-red-500 !ring-transparent"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `}
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
            <div className="mt-4 ">
              <button
                type="submit"
                className="w-full text-black bg-primary-600 my-2 hover:bg-primary-700 focus:ring-4 border hover:bg-black hover:text-white transition ease-in-out duration-300 font-medium  text-sm px-5 py-2.5 text-center   dark:focus:ring-primary-800"
                {...{
                  disabled:
                    isLoading ||
                    errors.amount ||
                    errors.receiver ||
                    errors.symbol,
                }}
              >
                Send
              </button>
            </div>
          </form>
          <Receipt />
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;
