"use client";

import TablePage from "@/components/table";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { ITaskProps } from "./interfaces/iTask.interface";
import { useEffect, useState } from "react";
import { useDebounce } from "@/components/hooks";
import { TaskService } from "./gateways/taskService";
import { ModalData, useModal } from "@/components/hooks/use-modal-store";
import { routes } from "@/app/constants";

const TaskPage = () => {
  const { onOpen } = useModal();
  const { debounce } = useDebounce();
  const [_, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState<ITaskProps[]>([]);

  /**
   * Get all tasks
   */
  function getAllServices() {
    debounce(() => {
      TaskService.getAll("", "", undefined, "").then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }

  /**
   * Define default values list loading
   */
  useEffect(() => {
    setIsLoading(true);
    getAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handle delete item
   * @param id
   */
  const handleDelete = (id: number | undefined) => {
    if (confirm("Realmente deseja apagar?")) {
      TaskService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id !== id),
          ]);
          setTotalCount(rows.length);
          getAllServices();
        }
      });
    }
  };

  /**
   * Edit task modal dialog
   */
  function handleEdit(service: ITaskProps) {
    const serviceValue: ModalData = {
      server: service,
    }
    onOpen("createService", serviceValue);
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar routes={routes} />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        <TablePage
          rows={rows}
          setRows={setRows}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          totalCount={totalCount}
        />
      </main>
    </div>
  );
};

export default TaskPage;
