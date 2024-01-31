import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePostWithdrawMutation } from "../../store/services/withdraw/withdrawService";
import ShowCurrencySelection from "../components/ShowCurrencySelection";
import { useWatchSelect } from "../../hooks/forms";
import { useFormDisabler } from "../../hooks/forms";
import {
  setAmount,
  setCoin,
  setType,
} from "../../store/slices/currencySelection/currencySelection";
import { useSelector } from "react-redux";

function WithdrawForm({ content, cryptos }) {
  const { title, description } = content;
  const [
    postWithdraw,
    { error: postWithdrawError, isLoading: postWithdrawIsLoading },
  ] = usePostWithdrawMutation();
  const { coin } = useSelector((state) => state.currencySelection);
  const { user } = useSelector((state) => state.auth);
  const formRef = useFormDisabler(postWithdrawIsLoading);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      amount: 0,
      symbol: "BTC",
      type: "withdraw",
    },
  });

  const onSubmit = async () => {
    await postWithdraw({ id: user?.id });
  };
  useEffect(() => {
    if (postWithdrawError) {
      const apiErrors = postWithdrawError.data.errors;
      apiErrors.map((error) => {
        setError(error.param, {
          type: "custom",
          message: error.msg,
        });
      });
    }
  }, [postWithdrawError]);
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
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className={`${postWithdrawIsLoading ? "opacity-50" : ""}`}
          >
            <div className="my-3">
              <label
                htmlFor="id"
                className={`${
                  errors.id && "text-red-500"
                } block mb-2 text-sm font-medium text-gray-900 `}
              >
                {errors.id
                  ? errors.id.message
                  : `Enter your ${coin.symbol} wallet address`}
              </label>
              <input
                type="text"
                name="id"
                id="id"
                className={`${
                  errors.id && "!border-red-500 !ring-transparent"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                placeholder={`Enter your ${coin.symbol} wallet address`}
                {...register("id")}
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
                id="amount"
                className={`${
                  errors.amount && "!border-red-500 !ring-transparent"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5      `}
                placeholder="0.000000"
                step="0.00000001"
                {...register("amount")}
              />
            </div>
            <div>
              <label
                htmlFor="currency"
                className={`${
                  errors.amount && "text-red-500"
                } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
              >
                Select Currency
              </label>
              <select
                id="currency"
                className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `}
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
                {...{ disabled: errors.amount || errors.id }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WithdrawForm;
