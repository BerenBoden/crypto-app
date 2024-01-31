import Modal from "react-modal";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { formatCurrency, formatCoin } from "../../utils/Utils";
import { useSelector, useDispatch } from "react-redux";
import { resetReceipt } from "../../store/slices/receipt/receiptSlice";

function Receipt() {
  const dispatch = useDispatch();
  const receipt = useSelector((state) => state.receipt);
  return (
    <Modal
      isOpen={receipt.isOpen}
      contentLabel="Example Modal"
      className="absolute top-0 shadow-xl right-0 left-0 bottom-0 h-96 w-96 m-auto bg-gray-100 bg-opacity-90 rounded-sm p-4 !border-none !outline-none flex justify-center"
    >
      <div className="flex flex-col justify-evenly items-center">
        <AiOutlineCheckCircle className=" text-green-500 h-12 w-12" />
        <h1 className="text-lg capitalize text-center text-green-500 font-bold">
          {receipt.message}
        </h1>
        <p className="text-xs text-center">
          An email confirming your {receipt.type} has been sent to:{" "}
          {receipt.email}
        </p>
        <div className="flex flex-col justify-evenly">
          <p className="text-xs font-bold">
            Transaction ID: <span className="!font-normal">{receipt.id}</span>
          </p>
          <div className="flex items-center">
            <p className="text-xs font-bold mr-2">
              Currency: <span className="!font-normal">{receipt.symbol}</span>
            </p>
            <img src={receipt.symbolLink} height={12} width={12} />
          </div>
          <p className="text-xs font-bold">
            Amount:{" "}
            <span className="!font-normal">{formatCoin(receipt.amount)}</span>
          </p>
          <p className="text-xs font-bold">
            USD Amount Value:{" "}
            <span className="!font-normal">
              {formatCurrency(receipt.amountValue)}
            </span>
          </p>
          {receipt?.receiverUsername && (
            <p className="text-xs font-bold">
              Sent to:{" "}
              <span className="!font-normal">{receipt.receiverUsername}</span>
            </p>
          )}
          <p className="text-xs font-bold">
            Price of {receipt.symbol} at time of {receipt.type}:{" "}
            <span className="!font-normal">
              {formatCurrency(Number(receipt.symbolPrice))}
            </span>
          </p>
        </div>
        <button
          onClick={() => dispatch(resetReceipt({ isOpen: false }))}
          className="w-full h-12 bg-green-600 rounded-sm text-white hover:bg-black transition duration-300"
        >
          Continue
        </button>
      </div>
    </Modal>
  );
}

export default Receipt;
