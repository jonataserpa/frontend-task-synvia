import { LucideIcon } from "lucide-react";

export interface ITaskProps {
    id?: number;
    title: string;
    description: string;
    userId: number;
    icon?: LucideIcon;
    href?: string;
    color?: string;
    bgColor?: string;
    createAt?: Date;
  }