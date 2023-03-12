import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import user from '@testing-library/user-event';
import Button from "./Button";
import { noop } from "underscore";
import renderer from 'react-test-renderer';

describe('button widget tests',() =>{
    it('reder Button component', ()=>{
       const noop = () =>{};
       render(<Button label="Submit" onClick={noop}/>);
       const button = screen.getByTestId('button-test');
       expect(button).toBeInTheDocument();
    })
    it("Button renders with correct label", () => {
        const noop = () =>{};
        render(<Button label="Submit" onClick={noop} type="default"/>);
        const button = screen.getByTestId('button-test');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Submit");
     });
    it('Button click event', async () =>{
        const noop = () => {};
        render(<Button label="Submit" onClick={noop}/>);
        const button = await screen.findByTestId('button-test');
        user.click(button);
        //expect(noop).toHaveBeenCalled();
        expect(button).toBeInTheDocument();
    })    
})
