import { connect, set } from "mongoose";

export const Connection = () => {
  const dataBase_URL = process.env.DATABASE_URL;
  try {
    connect(dataBase_URL);
    console.log("Database connection Successful");
  } catch (error) {
    console.log("Database connection failed");
    console.log("error :>> ", error);
    throw new Error(error.message);
  }
};
