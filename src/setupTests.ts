// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

globalThis.structuredClone = (v: unknown) => JSON.parse(JSON.stringify(v));

// - jsdom does not implement HTMLDialogElement.showModal()/close() yet,
//   so provide the minimum needed to test components using <dialog>
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.show = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function (returnValue?: string) {
    this.open = false;
    if (returnValue !== undefined) {
      this.returnValue = returnValue;
    }
    this.dispatchEvent(new Event("close"));
  };
}
