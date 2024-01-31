import resolveConfig from "tailwindcss/resolveConfig";

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig("./src/css/tailwind.config.js");
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export function convertSecondsToDHMS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  return {
    days,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  };
}
export function getSecondsSinceDate(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const elapsedSeconds = Math.round((now - target) / 1000);
  return elapsedSeconds;
}
export function formatCurrency(value) {
  if (value <= 0 || !value) return "$0.00";
  const formattedValue = Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return `$${formattedValue}`;
}
export function formatCoin(amount) {
  amount = Number(amount);
  if (amount < 0) {
    return "0.0000000000";
  }
  return amount.toFixed(7);
}

export const generateQueryString = (transaction) => {
  let queryString = "";

  for (const key in transaction) {
    if (key !== "redirect") {
      queryString += `${key}=${encodeURIComponent(transaction[key])}&`;
    }
  }

  return queryString.slice(0, -1); // Remove the last '&'
};
