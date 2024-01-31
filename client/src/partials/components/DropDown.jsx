import { GrBitcoin } from "react-icons/gr";
import { BsPaypal } from "react-icons/bs";
import { FaCreditCard, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { SiLitecoin, SiBitcoin } from "react-icons/si";
import { BsArrowRightCircle } from "react-icons/bs";

function DropDown({ setValue, selectedValue, amount }) {
  const handleInputChange = (e) => {
    setValue("symbol", e.target.value, { shouldValidate: true });
  };

  return (
    <>
      <div className="mt-4">
        <p className="text-xs mt-2 mb-4">
          All transactions are secure and encrypted.
        </p>
      </div>
      
      <div>
        <label
          htmlFor="cryptocurrency"
          className={`flex items-center ${
            selectedValue === "cryptocurrency" ? "border-b-0 rounded-none" : ""
          } cursor-pointer pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700`}
        >
          <input
            id="cryptocurrency"
            type="radio"
            value="cryptocurrency"
            checked={
              selectedValue === "cryptocurrency" ||
              selectedValue === "BTC" ||
              selectedValue === "LTC"
            }
            onChange={(e) => handleInputChange(e)}
            name="bordered-radio"
            className="mr-2 w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="flex justify-between w-full">
            <div className="w-full h-14 ml-2 text-sm flex items-center font-medium text-gray-900 dark:text-gray-300">
              <GrBitcoin className="w-7 h-7 text-blue-600 mr-2" />
              Cryptocurrency
            </div>
            <div className="flex items-center h-14 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <SiLitecoin className="w-7 h-7 text-blue-600 mr-4" />
              <SiBitcoin className="w-7 h-7 text-blue-600 mr-4" />
            </div>
          </div>
        </label>
        <div
          className={`${
            selectedValue === "cryptocurrency"
              ? "h-52 border border-t-0 bg-gray-50"
              : "hidden"
          } flex items-center justify-center`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              <SiBitcoin className="w-20 h-20 mr-5" />
              <BsArrowRightCircle className="w-10 h-10" />
            </div>
            <p className="text-xs text-center mt-5 mx-4">
              After clicking "Add Funds" you will be redirected to Coinbase to
              complete your purchase succesfully.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DropDown;
