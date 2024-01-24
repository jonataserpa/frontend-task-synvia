"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { TaskService } from "@/app/(tasks)/(routes)/tasks/gateways/taskService";
import { ITaskProps } from "@/app/(tasks)/(routes)/tasks/interfaces/iTask.interface";
import { statusSelect } from "@/app/constants";
import { useDebounce } from "../hooks";
import { IUserProps } from "@/app/(tasks)/(routes)/tasks/interfaces/iUser.interface";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Título é obrigatório" })
    .refine((name) => name !== "general", {
      message: "Título não pode ser 'generico'",
    }),
  description: z
    .string()
    .min(1, { message: "Descrição é obrigatório" })
    .refine((name) => name !== "general", {
      message: "Descrição não pode ser 'generico'",
    }),
  userId: z.string().min(1, { message: "User é obrigatório" }),
});

export const CreateServiceModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = isOpen && type === "createService";
  const { server } = data;
  const { debounce } = useDebounce();
  const [_, setIsLoading] = useState(true);
  const [users, setUsers] = useState<IUserProps[]>([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: server?.title || "",
      description: server?.description || "",
      userId: server?.userId.toString() || "",
    },
  });

  /**
   * Get all tasks
   */
  function getAllServices() {
    debounce(() => {
      TaskService.getAllUsers().then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setUsers(result.data);
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

  useEffect(() => {
    if (server) {
      form.setValue("title", server.title);
      form.setValue("description", server.description);
      form.setValue("userId", server.userId.toString());
    } else {
      form.setValue("title", "");
    }
  }, [server, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const task: ITaskProps = {
        title: values.title,
        description: values.description,
        userId: Number(values.userId),
      };
      if (server === undefined) {
        await TaskService.create(task);
      } else {
        await TaskService.updateById(server?.id, task);
      }
      form.reset();
      router.refresh();
      router.push("/");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Cadastro de tarefas
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Descrição do título"
                        {...field}
                        data-testid="title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
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
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={isLoading}
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
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="default" disabled={isLoading} data-testid="save">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
