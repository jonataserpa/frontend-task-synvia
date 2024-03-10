export interface ICashFlowProps {
    id?: number;
    description: string;
    observation?: string;
    companyId: number;
    type: string;
    value: string;
    createdAt?: Date;
  }