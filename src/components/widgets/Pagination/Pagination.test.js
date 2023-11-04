import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
import config from "../../../config";

const { pageSize } = config;
const noOp = () => {};

describe("Pagination tests", () => {
  it("Pagination shows if fullCount > pageSize", async () => {
    render(
      <Pagination count={pageSize} fullCount={pageSize + 1} onClick={noOp} />
    );
    const pagination = screen.queryByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
  it("Pagination doesn't shows if fullCount = pageSize", async () => {
    render(<Pagination count={pageSize} fullCount={pageSize} onClick={noOp} />);
    const pagination = screen.queryByTestId("pagination");
    expect(pagination).not.toBeInTheDocument();
  });
  it("Pagination doesn't shows if fullCount < pageSize", async () => {
    render(
      <Pagination count={pageSize} fullCount={pageSize - 1} onClick={noOp} />
    );
    const pagination = screen.queryByTestId("pagination");
    expect(pagination).not.toBeInTheDocument();
  });
});
