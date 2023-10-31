/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable import/no-extraneous-dependencies */
import {   render, screen,  cleanup } from "@testing-library/react";
import Alert from "./Alert";
import renderer from 'react-test-renderer';

afterEach(cleanup);

describe('alert props test', ()=>{
    let alertToTest;
    const props ={
    title: 'Alert!',
    message: 'You got alert!',
    type: 'success'
    }
    beforeEach( async () =>{
    const testInstance = await renderer.create(<Alert {...props} />);
    alertToTest = testInstance.root;
    });
    it('should render title in strong',()=>{
    const strongRender = alertToTest.findByType('strong');
    expect(strongRender.children).toEqual([props.title]);
    });
    it('should render message in p',()=>{
    const pRender = alertToTest.findByType('p');
    expect(pRender.children).toEqual([props.message]);
    });
  });
describe('alert widget tests',  () => {
    it("alert has title and message", async () => {
     render(<Alert title ="Hello!" message="you have alert" type="danger" />);
     const alert = await screen.getByTestId("alert-test");
     expect(alert).toHaveTextContent("Hello!");
     expect(alert).toHaveTextContent("you have alert");
    });
    it("alert has null title and message", async () => {
    render(<Alert title ="" message="you have alert" type="danger" />);
    const alert = await screen.getByTestId("alert-test");
    expect(alert).toHaveTextContent("you have alert");
    });
    it("test type: info", async () => {
    render(<Alert title ="" message="info alert" type="info" />);
    const alert = await screen.getByTestId("alert-test");
    expect(alert).toHaveTextContent("info alert");
    });
    it("test type: success", async () => {
    render(<Alert title ="" message="success alert" type="success" />);
    const alert = await screen.getByTestId("alert-test");
    expect(alert).toHaveTextContent("success alert");
    });
    it("test type: warning", async () => {
    render(<Alert title ="" message="warning alert" type="warning" />);
    const alert = await screen.getByTestId("alert-test");
    expect(alert).toHaveTextContent("warning alert");
    });
  })

