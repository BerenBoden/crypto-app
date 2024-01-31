import { formatCurrency, formatCoin } from "../../utils/Utils";

function Cryptocurrencies({ title, cryptos }) {

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Crypto</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Amount Owned</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Current USD Value
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Live Price</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {cryptos?.map(({ link, price, symbol, amountValue, amount }) => {
                return (
                  <tr key={symbol}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <img
                          src={link}
                          height={20}
                          width={20}
                          className="mr-2"
                        />
                        <div className="text-slate-800">{symbol}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{formatCoin(amount)}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">
                        {formatCurrency(amountValue)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{formatCurrency(price)}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cryptocurrencies;
