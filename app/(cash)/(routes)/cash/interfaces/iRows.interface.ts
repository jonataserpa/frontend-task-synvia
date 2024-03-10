import { Dispatch, SetStateAction } from "react";
import { ICashFlowProps } from "./iCashFlow.interface";

export interface IRows {
    rows: ICashFlowProps[];
    setRows: Dispatch<SetStateAction<ICashFlowProps[]>>;
    handleDelete: (id: number | undefined) => void;
    handleEdit: (cattles: ICashFlowProps) => void;
    totalCount: number;
  }