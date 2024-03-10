import { render, screen } from "@testing-library/react";
import { ICashFlowProps } from "@/app/(cash)/(routes)/cash/interfaces/iCashFlow.interface";
import HomePage from "../page";
import "@testing-library/jest-dom";

const mockTodos: ICashFlowProps[] = [
  {
    id: 1,
    observation: "TEST",
    description: "Luz",
    type: "ENTRY",
    value: 1,
    companyId: 1
  },
  {
    id: 2,
    observation: "TEST",
    description: "Aluguel",
    type: "ENTRY",
    value: 1,
    companyId: 1
  },
];

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("HomePage - List services", () => {
  it('should render "No services" when the array is empty', () => {
    // ARRANGE
    render(<HomePage rows={[]}/>);

    //ACT
    const message = screen.getByText("Carregando serviços...");

    // ASSERT
    expect(message).toBeInTheDocument();
  });

  it("should render a list services with the correct number of items", async () => {
    // ARRANGE
    render(<HomePage rows={mockTodos} />);

    // ACT
    const firstItem = screen.getAllByTestId("SERPRO")[0];

    // ASSERT
    expect(firstItem).toHaveTextContent("SERPRO");
  });
});
