import { LucideIcon } from "lucide-react";

type User = {
  name: string;
}
export interface ITaskProps {
    id?: number;
    title: string;
    description: string;
    userId: number;
    icon?: LucideIcon;
    href?: string;
    color?: string;
    bgColor?: string;
    createAt: Date;
    user?: User;
  }