/* eslint-disable import/no-extraneous-dependencies */
import { getAllByTitle, getByTitle, getByText, render, screen, TestRenderer } from "@testing-library/react";
import Alert from "./Alert";
import renderer from 'react-test-renderer';
import { Fragment } from "react";
import { isExportDeclaration } from "typescript";

describe('alert widget tests', () => {
  it('component renders correctly', () =>{;
    const tree = renderer.create(<Alert title="Alert" message = "hello" type="danger"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("alert has title and message", () => {
     render(<Alert title ="Hello!" message="you have alert" type="danger" />);
     const alert = screen.getByTestId("alert-test");
     expect(alert).toHaveTextContent("Hello!");
     expect(alert).toHaveTextContent("you have alert");
   });
   it("alert has null title and message", () => {
    render(<Alert title ="" message="you have alert" type="danger" />);
    const alert = screen.getByTestId("alert-test");
    expect(alert).toHaveTextContent("you have alert");
  });
  it("test type: info", () => {
    render(<Alert title ="" message="info alert" type="info" />);
    const alert = screen.getByTestId("alert-test");
    expect(alert).toHaveTextContent("info alert");
  });
  it("test type: success", () => {
    render(<Alert title ="" message="success alert" type="success" />);
    const alert = screen.getByTestId("alert-test");
    expect(alert).toHaveTextContent("success alert");
  });
  it("test type: warning", () => {
    render(<Alert title ="" message="warning alert" type="warning" />);
    const alert = screen.getByTestId("alert-test");
    expect(alert).toHaveTextContent("warning alert");
  });
})

