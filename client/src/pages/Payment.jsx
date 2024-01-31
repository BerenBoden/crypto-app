import { GrBitcoin } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FiCopy } from "react-icons/fi";
import { useHostname } from "../hooks/utility";
import { useToastNotificationsRedirect } from "../hooks/toast";

function Payment() {
  const [state, setState] = useState({});
  const hostname = useHostname();
  const location = useLocation();
  useToastNotificationsRedirect();
  const queryParams = new URLSearchParams(location.search);
  const textRef = useRef(null);
  const addressRef = useRef(null);
  const handleCopyClick = () => {
    toast.success("Copied!");
    textRef.current.select();
    document.execCommand("copy");
  };
  const handleAddressClick = () => {
    toast.success("Copied!");
    addressRef.current.select();
    document.execCommand("copy");
  };
  function removeSpaces(str) {
    return str.replace(/\s+/g, "");
  }
  useEffect(() => {
    const params = Object.fromEntries(
      [...queryParams.entries()].map(([k, v]) => [k, removeSpaces(v)])
    );
    setState(params);
  }, [location.search]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center overflow-x-hidden">
      <ToastContainer className="text-xs font-bold mt-14" />
      <div className="xl:w-3/4 xl:p-0 lg:px-8 px-4 w-full md:flex md:flex-row flex-col items-center h-152">
        <div className="xl:w-3/4 lg:w-2/4 md:w-full h-full 0 rounded-sm shadow-lg">
          <div className="flex items-center h-1/4 bg-gray-200 rounded-t-sm">
            <GrBitcoin className="text-gray-400 h-8 w-8 mx-5 " />
            <h1 className="font-bold text-xl">{hostname}</h1>
          </div>
          <div className="bg-white h-2/4 flex items-center">
            <div>
              <div className="pl-4">
                <h1 className="font-bold" onClick={handleCopyClick}>
                  <div className="flex items-center">
                    <input
                      defaultValue={state.paymentPrice}
                      ref={textRef}
                      className="!outline-none"
                      readOnly
                    />
                    <FiCopy />
                  </div>
                  ${state.amount} USD
                </h1>
                <p className="text-gray-400 text-xs flex items-center">
                  Please make payment to the {state.symbol} address below
                </p>
                <h1 onClick={handleAddressClick} className="w-96">
                  <div className="flex items-center">
                    <input
                      defaultValue={state.address}
                      ref={addressRef}
                      readOnly
                      className="!outline-none w-full"
                    />
                    <FiCopy />
                  </div>
                </h1>
              </div>
              <p className="font-normal text-xs text-black pl-4 pb-2">
                An initial deposit of $20 will automatically verify your
                account. Verified accounts can transfer, withdraw, purchase and
                sell.
              </p>
              <img src={decodeURIComponent(state.code)} className="h-42 w-42" />
            </div>
          </div>
          <div className="bg-gray-200 h-2/4 md:h-1/4 rounded-b-sm md:flex md:flex-row flex-col items-center space-y-2 pt-2 pb-4 px-4">
            <div className="h-12 flex flex-col items-center">
              <div className="flex items-center">
                <div className="rounded-full h-2 flex items-center border-b w-2 border-gray-600 animate-spin" />
              </div>
              <p className="text-xs text-center text-gray-600 mt-2 px-4">
                Waiting for payment
              </p>
            </div>
            <div className="h-12 flex flex-col items-center">
              <div className="flex items-center">
                <div className="rounded-full h-2 flex items-center border w-2 border-gray-600" />
              </div>
              <p className="text-xs text-center text-gray-400 mt-2 px-4">
                Confirming on blockchain
              </p>
            </div>
            <div className="h-12 flex flex-col items-centerflex items-center ">
              <div className="flex items-center">
                <div className="rounded-full h-2 border w-2 border-gray-600 mr-2" />
              </div>
              <p className="text-xs text-center text-gray-400 mt-2 px-4">
                Confirmed on block chain
              </p>
            </div>
            <div className="h-12 flex flex-col items-center">
              <div className="flex items-center">
                <div className="rounded-full h-2 border w-2 border-gray-600" />
              </div>
              <p className="text-xs text-center text-gray-400 mt-2 px-4">
                Sending payment to seller
              </p>
            </div>
            <div className="h-12 flex flex-col items-center">
              <div className="flex items-center">
                <div className="rounded-full h-2 border w-2 border-gray-600" />
              </div>
              <p className="text-xs text-gray-400 text-center mt-2 px-4">
                Payment received!
              </p>
            </div>
          </div>
        </div>

        <div className="md:pl-8 xl:w-2/4 lg:w-2/4 md:w-full h-full">
          <div className="md:h-1/2 mt-48 md:mt-0 flex flex-col justify-between">
            <div className="">
              <p className="text-xs font-bold">Payment ID: {state.orderId}</p>
              <p className="text-xs font-bold">Order ID: {state.orderId}</p>
              <p className="text-xs font-bold">Username: {state.username}</p>
            </div>
            <div className="text-xs my-4">
              <p>
                Leave your email and we'll notify you when the transaction has
                been completed.
              </p>
              <form className="w-full my-6">
                <input className="w-full  pl-2 h-12" value={state.email} />
                <button
                  className="w-full my-4 h-12 bg-gray-600 hover:bg-blue-500 transition duration-300 text-white text-sm"
                  onClick={(e) => e.preventDefault()}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
