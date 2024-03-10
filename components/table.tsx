import { IRows } from "@/app/(cash)/(routes)/cash/interfaces/iRows.interface";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Pencil, Plus } from "lucide-react";
import { ActionTooltip } from "./action-tooltip";
import { useModal } from "./hooks/use-modal-store";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import moment from 'moment';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CashFlowService,
} from "@/app/(cash)/(routes)/cash/gateways/cashService";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks";
import { Button } from "./ui/button";

const formSchema = z.object({
  observation: z
    .string()
    .optional()
    .refine((name) => name !== "general", {
      message: "Observação não pode ser 'generico'",
    }),
  description: z
    .string()
    .optional()
    .refine((name) => name !== "general", {
      message: "Descrição não pode ser 'generico'",
    }),
    createdAt: z.string().optional(),
});

const TablePage = ({
  rows,
  setRows,
  handleDelete,
  handleEdit,
  totalCount,
}: IRows) => {
  const { onOpen } = useModal();
  const { debounce } = useDebounce();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      observation: "",
      description: "",
      createdAt: "",
    },
  });

  if (rows && rows.length === 0) {
    return <div style={{ marginLeft: 20 }}>Nenhum caixa cadastrado...</div>;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const filter = {
        observation: values.observation?.trim() || "",
        description: values.description?.trim() || "",
        createdAt: values.createdAt?.toString() || "",
      };
      const result: any = await CashFlowService.getAll(
        filter.observation,
        filter.description,
        filter.createdAt
      );
      setRows(result.data);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  function validateDate(date: Date | undefined) {

    if (date) {
      return moment(date.toString()).format('DD/MM/YYYY')
    }

    return ""
  }

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="px-4  md:px-20 text-4xl md:text-2xl gap-4 font-bold text-left">
          Cadastro financeiro
        </h2>
        <p className="px-4 md:px-20 text-muted-foreground font-light text-sm md:text-lg text-left">
          Listagem das entradas e saídas
          <div className="flex w-full justify-end px-12 -my-5">
            <ActionTooltip
              side="right"
              align="center"
              label="Cadastrar tarefa ?"
            >
              <button
                onClick={() => onOpen("createService")}
                className="group flex items-center "
                data-testid="create-service"
              >
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all items-center justify-center group-hover:bg-black bg-current	">
                  <Plus
                    className="group-hover:text-white transition text-white"
                    size={25}
                  />
                </div>
              </button>
            </ActionTooltip>
          </div>
        </p>
      </div>
      <div className="mb-2 space-y-2">
        <h2 className="px-4 md:px-20 text-4xl md:text-2xl gap-2 font-bold text-left">
          Filtros:
        </h2>
        <div className="px-4  md:px-20 text-4xl md:text-2xl gap-4 font-bold text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="grid grid-cols-5 gap-4">
                <div className="relative mb-4">
                  <FormField
                    control={form.control}
                    name="observation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observação</FormLabel>
                        <FormControl>
                          <Input
                            disabled={false}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Observação"
                            {...field}
                            data-testid="observation"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="relative mb-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Input
                            disabled={false}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Descrição"
                            {...field}
                            data-testid="description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="relative mb-4">
                  <FormField
                    control={form.control}
                    name="createdAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de criação</FormLabel>
                        <FormControl>
                          <Input
                            disabled={false}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            placeholder="Data de criação"
                            {...field}
                            data-testid="createAt"
                            type="date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/*<div className="relative mb-4">
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Úsuario</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          data-testid="userId"
                          name="userId"
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem key={0}  id="Selecione" value="Selecione">
                              Nenhum Úsuario
                            </SelectItem>
                            {users.map((type) => (
                              <SelectItem
                                key={type.id}
                                id={type.id.toString()}
                                value={type.id.toString()}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                            </div>*/}

                <div className="relative mb-4">
                  <Button
                    variant="default"
                    disabled={false}
                    data-testid="filter"
                    className="mt-10"
                  >
                    Buscar
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="px-4 md:px-20 lg:px-13">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Observação</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data de criação</TableHead>
              <TableHead className="w-[10px]"></TableHead>
              <TableHead className="w-[10px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows &&
              rows.length > 0 &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.observation}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{validateDate(row.createdAt)}</TableCell>

                  <TableCell className="text-right">
                    <ActionTooltip
                      side="right"
                      align="center"
                      label="Editar task ?"
                    >
                      <Pencil
                        className="text-teal-700"
                        onClick={() => handleEdit(row)}
                      />
                    </ActionTooltip>
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionTooltip
                      side="right"
                      align="center"
                      label="Excluir task ?"
                    >
                      <Delete
                        className="text-red-500"
                        onClick={() => handleDelete(row.id)}
                      />
                    </ActionTooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableCaption>
            <div className="flex flex-row gap-2">
              <p>Total: </p>
              <strong>{totalCount}</strong>
            </div>
          </TableCaption>
        </Table>
      </div>
    </div>
  );
};

export default TablePage;
