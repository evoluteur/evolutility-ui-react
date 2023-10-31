import { render, screen } from "@testing-library/react";
import Field from "./Field";

describe("field tests", () => {
  it("Field text shows", async () => {
    render(
      <Field
        fieldDef={{ id: "name", type: "text", label: "Firstname" }}
        value="Olivier"
        callbacks={{ change: () => {} }}
      />
    );
    expect(screen.getByDisplayValue("Olivier")).toBeInTheDocument();
    const fLabel = screen.getByTestId("fieldlabel");
    expect(fLabel).toHaveTextContent("Firstname");
  });
});
