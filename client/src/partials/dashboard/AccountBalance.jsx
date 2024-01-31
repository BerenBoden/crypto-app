import { useState, useEffect } from "react";
import RealtimeChart from "../../charts/RealtimeChart";
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { formatCurrency } from "../../utils/Utils";

function AccountBalance({ user, userDataIsLoading }) {
  const [slicedData, setSlicedData] = useState([]);
  const now = new Date();
  useEffect(() => {
    if (user?.accountBalanceHistory) {
      const newData = [...user.accountBalanceHistory].slice(0, 2);
      const newSlicedData = newData
        .slice(Math.max(newData.length - 2, 0))
        .reverse();
      setSlicedData(newSlicedData);
    }
  }, [user]);

  const chartData = {
    labels: [
      `${new Date(now.getTime() - 24 * 60 * 60 * 1000)}`,
      `${new Date()}`,
    ],
    datasets: [
      {
        data: slicedData,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  };
  if (userDataIsLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">
          Total Account Balance
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        <RealtimeChart
          data={chartData}
          width={595}
          height={248}
          currentBalance={formatCurrency(user?.accountBalance)}
        />
      </div>
    </div>
  );
}

export default AccountBalance;
