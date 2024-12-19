import { useContext } from "react";
import { ConstantContext } from "@/context/constant/ConstantContext";

export const useConstantValues = () => useContext(ConstantContext);
