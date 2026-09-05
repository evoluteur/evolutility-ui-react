import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

const props = {
  isOpen: true,
  onClose: () => {},
  title: "Delete task",
  children: "Are you sure?",
};

describe("modal widget tests", () => {
  it("opens the native dialog when isOpen is true", () => {
    render(<Modal {...props} />);
    const modal = screen.getByTestId("modal") as HTMLDialogElement;
    expect(modal.open).toBe(true);
    expect(modal).toHaveTextContent("Delete task");
    expect(modal).toHaveTextContent("Are you sure?");
  });

  it("keeps the dialog closed when isOpen is false", () => {
    render(<Modal {...props} isOpen={false} />);
    const modal = screen.getByTestId("modal") as HTMLDialogElement;
    expect(modal.open).toBe(false);
  });

  it("labels the dialog w/ its title", () => {
    render(<Modal {...props} />);
    const modal = screen.getByTestId("modal");
    const titleId = modal.getAttribute("aria-labelledby");
    expect(titleId).toBeTruthy();
    expect(
      modal.querySelector("#" + CSS.escape(titleId as string)),
    ).toHaveTextContent("Delete task");
  });

  it("shows no header without a title", () => {
    render(<Modal {...props} title={undefined} />);
    const modal = screen.getByTestId("modal");
    expect(modal.querySelector(".modal-header")).toBeNull();
  });

  it("shows the footer when provided", () => {
    render(<Modal {...props} footer={<button>OK</button>} />);
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
  });

  it("calls onClose when clicking the close icon", async () => {
    let closed = 0;
    render(<Modal {...props} onClose={() => (closed += 1)} />);
    const modal = screen.getByTestId("modal");
    await userEvent.click(modal.querySelector(".close") as HTMLElement);
    expect(closed).toBe(1);
  });

  it("calls onClose when the dialog is dismissed", () => {
    let closed = 0;
    render(<Modal {...props} onClose={() => (closed += 1)} />);
    const modal = screen.getByTestId("modal") as HTMLDialogElement;
    modal.close();
    expect(closed).toBe(1);
  });
});
