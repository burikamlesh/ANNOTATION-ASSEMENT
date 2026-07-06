import { render, screen } from "@testing-library/react";
import TaskSummary from "./TaskSummary";

describe("TaskSummary XSS safety", () => {
  it("does not execute or render raw <script>/<img onerror> from the streamed markdown", () => {
    const malicious =
      "## Summary\n\n<img src=x onerror=\"alert('xss-img')\">\n\n<script>alert('xss-script')</script>\n\nDone.";

    const { container } = render(<TaskSummary summary={malicious} loading={false} />);

    // No live <script> or <img onerror> element should ever exist in the DOM.
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("img[onerror]")).toBeNull();
    expect(container.querySelector("img")).toBeNull();

    // The raw markup is shown to the user as escaped, inert text (not executed).
    expect(container.innerHTML).toContain("&lt;script&gt;");
    expect(container.innerHTML).toContain("&lt;img");

    expect(screen.getByText(/Done\./)).toBeInTheDocument();
  });
});
