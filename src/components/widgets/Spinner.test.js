import { render, screen, fireEvent } from "@testing-library/react";
import Spinner from "./Spinner";
import renderer from 'react-test-renderer';

describe('Spinner widget tests', () => {
    it('check children', () =>{;
    render(<Spinner message={"I am Spinner"} />);
    const spinner = screen.getByTestId("spinner-test");
    expect(spinner).toHaveTextContent("I am Spinner");

    });
});