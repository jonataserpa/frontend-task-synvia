import { Dispatch, SetStateAction } from "react";
import { ITaskProps } from "./iTask.interface";

export interface IRows {
    rows: ITaskProps[];
    setRows: Dispatch<SetStateAction<ITaskProps[]>>;
    handleDelete: (id: number | undefined) => void;
    handleEdit: (cattles: ITaskProps) => void;
    totalCount: number;
  }