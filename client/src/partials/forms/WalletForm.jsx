import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePostAddFundsMutation } from "../../store/services/account/accountService";
import { formatCurrency } from "../../utils/Utils";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useFormDisabler } from "../../hooks/forms";
import DropDown from "../components/DropDown";
import Modal from "react-modal";
import { SiBitcoin, SiCoinbase, SiLitecoin } from "react-icons/si";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { generateQueryString } from "../../utils/Utils";
import { useGetAccountQuery } from "../../store/services/account/accountService";
import { useWatchSelect } from "../../hooks/forms";
import {
  setAmount,
  setType,
} from "../../store/slices/currencySelection/currencySelection";

const prices = [{ price: 20 }, { price: 50 }, { price: 100 }, { price: 250 }];

function WalletForm({ content }) {
  const { title, description } = content;
  const [modalIsOpen, setIsOpen] = useState(false);
  const setModalIsOpen = () => {
    if (getValues("symbol") == "cryptocurrency") {
      clearErrors("symbol");
      setIsOpen(!modalIsOpen);
    }
  };
  const [postAddFunds, { isLoading: addFundsIsLoading }] =
    usePostAddFundsMutation();
  const formRef = useFormDisabler(addFundsIsLoading);
  const { id } = useSelector((state) => state.auth.user);
  const { data: userData, isLoading: userDataIsLoading } = useGetAccountQuery({
    id,
  });
  const { amount, type } = useSelector((state) => state.currencySelection);
  const {
    clearErrors,
    getValues,
    register,
    control,
    setError,
    setValue,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: prices[0].price,
      symbol: "cryptocurrency",
      type: "deposit",
    },
  });

  const onSubmit = async ({ amount, symbol, type }) => {
    try {
      const body = {
        amount,
        symbol,
        type,
        id,
      };
      const transaction = await postAddFunds(body).unwrap();
      const queryString = generateQueryString(transaction);
      resetField("amount");
      window.open(`${transaction.redirect}?${queryString}`, "_blank");
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
  useWatchSelect({ control, name: "type", dispatchFunction: setType });
  useWatchSelect({ control, name: "amount", dispatchFunction: setAmount });
  if (userDataIsLoading) return <div>Loading...</div>;
  return (
    <div className="w-full my-4">
      <div className="relative h-full md:h-auto">
        <div className="relative p-4 bg-white shadow  sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 border-b ">
            <h3 className="text font-semibold text-gray-900 capitalize">
              {title}
            </h3>
          </div>
          <div className="my-1">
            <p className="text-xs font-normal mr-2">
              Total account balance:{" "}
              <span className="text-xs font-bold">
                {formatCurrency(userData?.accountBalance)}
              </span>
            </p>
          </div>
          <div className="border-b my-3" />
          <div className="my-1">
            <p className="text-xs font-normal mr-2">
              Total Account balance after {type}:{" "}
              <span className="text-xs font-bold text-green-600">
                {formatCurrency(
                  parseFloat(userData?.accountBalance || 0) + parseFloat(amount)
                )}{" "}
                +
              </span>
            </p>
          </div>
          <div className="border-b my-3" />
          <p className="text-xs my-5">{description}</p>
          <div>
            <label
              htmlFor="order"
              className="block mb-2 text-sm font-medium text-gray-900 capitalize"
            >
              Add funds to your account
            </label>
            <div className="flex flex-col md:flex-row w-full">
              {prices.map(({ price }, index) => {
                const isFirstMiddleElement =
                  index === prices.length / 2 - 1 && prices.length % 2 === 0;
                const isSecondMiddleElement =
                  index === prices.length / 2 && prices.length % 2 === 0;
                return (
                  <label
                    key={price}
                    htmlFor={price}
                    className={`w-full h-10 md:w-1/2 my-1  md:my-0 flex items-center justify-center text-white hover:text-black bg-blue-600 cursor-pointer hover:bg-gray-200 transition-colors duration-200
        ${index === 0 ? "" : "md:ml-2"}
        ${index === prices.length - 1 ? "" : "md:mr-2"}
        ${index === prices.length / 2 ? "md:mx-2" : ""}
        ${isFirstMiddleElement ? "md:ml-2" : ""}
        ${isSecondMiddleElement ? "md:mr-2" : ""}
      `}
                  >
                    <input
                      type="radio"
                      id={price}
                      name="options"
                      className="sr-only "
                      value={price}
                      onClick={(e) => setValue("amount", e.target.value)}
                    />
                    <span className=" font-medium">
                      {formatCurrency(price)}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="">
              <label
                htmlFor="amount"
                className={` block my-2 text-sm font-medium text-gray-900 `}
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    `}
                placeholder="0.000000"
                step="0.000000001"
                {...register("amount")}
              />
            </div>

            <DropDown
              setValue={setValue}
              selectedValue={getValues("symbol")}
              amount={amount}
            />
            <div className="mt-5">
              <button
                {...{
                  disabled:
                    (errors.symbol &&
                      getValues("symbol") != "cryptocurrency") ||
                    amount < 20,
                }}
                className="w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 focus:ring-4 border bg-blue-600 text-white hover:bg-black hover:text-white transition ease-in-out duration-300 font-medium  text-sm px-5 py-2.5 text-center"
                onClick={(e) => {
                  e.preventDefault();
                  setModalIsOpen();
                }}
              >
                <div>Add Funds&nbsp;</div>
                <div>
                  <AiOutlinePlusCircle />
                </div>
              </button>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            contentLabel="Example Modal"
            onRequestClose={() => {
              setIsOpen(false);
              setValue("symbol", "cryptocurrency");
            }}
            style={{ overlay: { zIndex: 50 } }}
            className="h-full w-full sm:w-144 ml-auto bg-gray-100 rounded-sm p-4 !border-none !outline-none "
          >
            <p
              className="absolute top-28 text-sm font-bold cursor-pointer flex items-center"
              onClick={() => {
                setIsOpen(false);
                setValue("symbol", "cryptocurrency");
              }}
            >
              <BsArrowLeft />
              &nbsp;&nbsp;&nbsp;Go Back
            </p>
            <form
              className={`${
                addFundsIsLoading && "opacity-50"
              } flex items-center justify-center h-3/4 w-full`}
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="p-4 w-full shadow-sm border rounded-sm h-112">
                <div className="border-b ">
                  <SiCoinbase className=" h-24 w-24 text-blue-500" />
                </div>
                <h1 className="font-bold my-5">Payment Method</h1>
                <h1 className="font-bold my-5">
                  Total: {formatCurrency(Number(getValues("amount")))}
                </h1>
                <p className="text-sm my-5">Express checkout</p>
                <p className="text-xs mb-5">
                  After clicking "Add Funds" you will be redirected to a
                  Coinbase payment processor to complete your purchase securely.
                </p>
                <div className="flex justify-evenly items-center">
                  <div
                    onClick={() => {
                      setValue("symbol", "BTC", { shouldValidate: true });
                    }}
                    className={`h-12 w-full flex mr-2 ${
                      getValues("symbol") === "BTC" && "bg-black text-white"
                    } hover:bg-black hover:text-white cursor-pointer transition duration-300  items-center justify-between px-4 border`}
                  >
                    <div className="flex items-center">
                      <SiBitcoin className="text-orange-400 mr-2" />
                      <p className="font-bold text-xs">Bitcoin</p>
                    </div>
                    <p>BTC</p>
                  </div>
                  <div
                    onClick={() =>
                      setValue("symbol", "LTC", { shouldValidate: true })
                    }
                    className={`h-12 w-full flex mr-2 ${
                      getValues("symbol") === "LTC" && "bg-black text-white"
                    } hover:bg-black hover:text-white cursor-pointer transition duration-300  items-center justify-between px-4 border`}
                  >
                    <div className="flex items-center">
                      <SiLitecoin className="text-blue-600 mr-2" />
                      <p className="font-bold text-xs">Litecoin</p>
                    </div>
                    <p>LTC</p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full h-12  my-4 flex items-center justify-center bg-primary-600 hover:bg-primary-700 focus:ring-4 border bg-blue-600 text-white hover:bg-black hover:text-white transition ease-in-out duration-300 font-medium  text-sm px-5 py-2.5 text-center"
                >
                  <div>Add Funds&nbsp;</div>
                  <div>
                    <AiOutlinePlusCircle />
                  </div>
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default WalletForm;
