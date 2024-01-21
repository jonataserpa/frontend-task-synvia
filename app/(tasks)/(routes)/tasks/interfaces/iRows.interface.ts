import { ITaskProps } from "./iTask.interface";

export interface IRows {
    rows: ITaskProps[];
    handleDelete: (id: number | undefined) => void;
    handleEdit: (cattles: ITaskProps) => void;
    totalCount: number;
  }