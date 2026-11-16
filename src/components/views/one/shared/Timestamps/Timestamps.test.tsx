import { render, screen } from "@testing-library/react";
import config from "config";
import { i18n_activity as i18n } from "i18n/i18n";
import { longDateString, relativeTimeString } from "utils/format";

import Timestamps from "./Timestamps";

const showTimestamp = config.withTimestamp;

describe("Timestamps widget tests", () => {
  it("shows updated (relative) and created (long date)", () => {
    const t1 = "1789-05-05T08:54:52.673864";
    const t2 = "2023-11-11T08:54:52.673864";
    render(<Timestamps created={t1} updated={t2} />);
    const ts = screen.queryByTestId("timestamps");
    if (showTimestamp) {
      expect(ts).toHaveTextContent(
        i18n.updatedX.replace("{0}", relativeTimeString(t2)),
      );
      expect(ts).toHaveTextContent(
        i18n.createdX.replace("{0}", longDateString(t1)),
      );
    } else {
      expect(ts).not.toBeInTheDocument();
    }
  });
  it("hides updated when never updated", () => {
    const t = "2023-11-11T08:54:52.673864";
    render(<Timestamps created={t} updated={t} />);
    const ts = screen.queryByTestId("timestamps");
    if (showTimestamp) {
      expect(ts).not.toHaveTextContent(i18n.updatedX.replace(" {0}", ""));
      expect(ts).toHaveTextContent(i18n.createdX.replace("{0}", ""));
    }
  });
});
