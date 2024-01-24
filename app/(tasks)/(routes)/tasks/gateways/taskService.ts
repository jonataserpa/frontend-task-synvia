import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ITaskProps } from "../interfaces/iTask.interface";
import { ApiService } from "@/components/axios/axios-config";
import { IUserProps } from "../interfaces/iUser.interface";

export type TTasksWithTotalCount = {
  data: ITaskProps[];
  totalCount: number;
};

export type TUserWithTotalCount = {
  data: IUserProps[];
  totalCount: number;
};

export type directionOfSort = "ASC" | "DESC" | undefined;

/**
 * Handle api errors
 * @param error
 */
export const handleApiErrors = (error: AxiosError, message: string) => {
  if (error && error.response && error.response.data) {
    switch (error.response.data.statusCode) {
      case 400:
        toast.error(
          "Erro ao processar a requisição, verifique os dados enviados e tente novamente!"
        );
        break;
      case 401:
        toast.error("Unauthorized, por favor realize o login!!!");
        break;
      case 404:
        toast.error("Tarefa não encontrado");
        break;
      case 500:
        toast.error(
          "Erro, o servidor não conseguiu processar a requisição, por favor tente novamente mais tarde ou contate o suporte!"
        );
        break;
      default:
        toast.error(message);
        break;
    }
  }
};

const getAll = async (
  title: string,
  description: string,
  userId: number | undefined,
  createAt: string,
): Promise<TTasksWithTotalCount | Error> => {
  try {
    const url = "/task";
    const { data } = await ApiService.get(url, {
      params: { skip: 0, take: 10, title, description, userId, createAt },
    });

    if (data) {
      return {
        data: data.data,
        totalCount: data.headers,
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao listar os registros.");
    throw error;
  }
};

const getAllUsers = async (): Promise<TUserWithTotalCount | Error> => {
  try {
    const url = "/user";
    const { data } = await ApiService.get(url);

    if (data) {
      return {
        data: data.data,
        totalCount: data.headers,
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao listar os registros.");
    throw error;
  }
};

const getById = async (id: number): Promise<ITaskProps | Error> => {
  try {
    const { data } = await ApiService.get(`/task/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao consultar o registro.");
    throw error;
  }
};

const create = async (
  dados: Omit<ITaskProps, "id">
): Promise<string | Error> => {
  try {
    const { data } = await ApiService.post("/task", dados);

    if (data) {
      toast.success("Tarefa criado com sucesso.");
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao criar o registro.");
    throw error;
  }
};

const updateById = async (
  id: number | undefined,
  data: ITaskProps
): Promise<void | Error> => {
  try {
    await ApiService.put(`/task/${id}`, data);
    toast.success("Tarefa atualizado com sucesso.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao atualizar o registro.");
    throw error;
  }
};

const deleteById = async (id: number | undefined): Promise<void | Error> => {
  try {
    await ApiService.delete(`/task/${id}`, id);
    toast.success("Tarefa removido com sucesso.");
  } catch (error) {
    handleApiErrors(error as AxiosError, "Erro ao apagar o registro.");
    throw error;
  }
};

export const TaskService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  getAllUsers,
};
