import { Response } from "express";
import jwt, { Jwt } from "jsonwebtoken";


type Cryptos = {
  name: string;
  symbol: string;
  link: string;
};

type Addresses = {
  address: string;
};

export const populateCrypto = (cryptos: Cryptos[]) => {
  function getCryptoSymbols(cryptos: Cryptos[]) {
    const symbols = cryptos.map((crypto) => {
      return crypto.symbol;
    });
    return symbols.join(",");
  }
  const symbols = getCryptoSymbols(cryptos);
  return symbols;
};

export function getRandomAddress(addresses: Addresses[]) {
  const randomIndex = Math.floor(Math.random() * addresses.length);
  return addresses[randomIndex].address.replace(/["/]/g, "");
}

export const sendResponseWithDelay = (
  res: Response,
  data: any,
  delay = 3000,
  status = 200
) => {
  setTimeout(() => {
    res.status(status).send(data);
  }, delay);
};

export function generateID() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 12; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

export const generateVerificationToken = (email: any) => {
  const expirationTime = 60 * 60; // 1 hour from now
  const token = jwt.sign({ email }, process.env.EMAIL_SECRET, {
    expiresIn: expirationTime,
  });
  return token;
};

export const removeFullStopsAndSpaces = (value: string) => {
  // Replace any full stops and spaces in the value with an empty string
  const sanitizedValue = value.replace(/[.\s]/g, "");
  // Return the sanitized value
  return sanitizedValue;
};