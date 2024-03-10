"use client";

import { ICashFlowProps } from "@/app/(cash)/(routes)/cash/interfaces/iCashFlow.interface";
import { useRouter } from "next/navigation";
import { ArrowRight, ScreenShare } from "lucide-react";

export type IHomeProps = {
  rows?: ICashFlowProps[];
};

const HomePage = ({ rows }: any) => {
  const router = useRouter();

  /**
   * Validate Color
   * @param status
   * @returns
   */
  const validateColorText = (status: string) => {
    if (status === "up") {
      return <label className="text-green-600">{status}</label>;
    } else if (status === "warning") {
      return <label className="text-yellow-500">{status}</label>;
    } else if (status === "error") {
      return <label className="text-rose-600">{status}</label>;
    } else {
      return <label className="text-sky-800">{status}</label>;
    }
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Fluxo de caixa
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Listagem das entradas e saídas
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {rows && rows.length === 0 && (
          <div className="text-muted-foreground font-light text-sm md:text-lg text-center">
            <strong>Carregando...</strong>
          </div>
        )}

        {rows &&
          rows.map((tool: ICashFlowProps) => (
            <div
              onClick={() => router.push("/cash")}
              key={tool.id}
              className="p-4 border-black/5 border-r-4 ring-1 rounded-lg flex items-center justify-between hover:shadow-md transition cursor-pointer"
              data-testid={tool.description}
              id="card"
            >
              <div className="flex items-center gap-x-4">
                <div className="p-2 w-fit rounded-md bg-violet-500/10">
                  <ScreenShare className="w-8 h-8 text-violet-500" />
                </div>
                <div className="flex flex-col ...">
                  <div className="font-semibold">
                    ID: <label className="text-neutral-500">{tool.id}</label>
                  </div>
                  <div className="font-semibold">
                    Observação:
                    <label className="text-neutral-500">{tool.observation}</label>
                  </div>
                  <div className="font-semibold">
                    Descrição: {validateColorText(tool.description)}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
