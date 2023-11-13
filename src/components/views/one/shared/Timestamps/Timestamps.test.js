/* eslint-disable jest/no-conditional-expect */
import { render, screen } from "@testing-library/react";
import config from "../../../../../config";
import { i18n_activity as i18n } from "../../../../../i18n/i18n";
import { datetimeString } from "../../../../../utils/format";

import Timestamps from "./Timestamps";

const showTimestamp = config.withTimestamp;

describe("Timestamps widget tests", () => {
  it("check children", () => {
    const t1 = "1789-05-05T08:54:52.673864";
    const t2 = "2023-11-11T08:54:52.673864";
    render(<Timestamps created={t1} updated={t2} />);
    const ts = screen.queryByTestId("timestamps");
    if (showTimestamp) {
      expect(ts).toHaveTextContent(i18n.created);
      expect(ts).toHaveTextContent(datetimeString(t1));
      expect(ts).toHaveTextContent(i18n.updated);
      expect(ts).toHaveTextContent(datetimeString(t2));
    } else {
      expect(ts).not.toBeInTheDocument();
    }
  });
});
