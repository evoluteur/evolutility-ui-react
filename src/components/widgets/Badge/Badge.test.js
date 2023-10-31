/* eslint-disable testing-library/no-await-sync-query */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/await-async-query */
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";
import renderer from 'react-test-renderer';

describe('badge props test', ()=>{
    let badgeToTest;
    const props ={
    text: 'My Badge!'
    }
    beforeEach(async () =>{
        const testInstance = await renderer.create(<Badge {...props} />);
        badgeToTest = testInstance.root;
    });
    it('should render text My Badge in span',()=>{
    const spanRender = badgeToTest.findByType('span');
    expect(spanRender.children).toEqual([props.text]);
    });
});

describe('badge text tests', () => {
    it('badge shows text string correctly', async ()=>{
    render(<Badge text="You got a badge!" />);
    const badge = await screen.getByTestId("badge-test");
    expect(badge).toHaveTextContent("You got a badge!");
    });
    it('badge shows number correctly', async ()=>{
    render(<Badge text={4152341234} />);
    const badge = await screen.getByTestId("badge-test");
    expect(badge).toHaveTextContent(4152341234);
    });
    it('badge shows double byte text correctly', async ()=>{
    render(<Badge text="美味しい" />);
    const badge = await screen.getByTestId("badge-test");
    expect(badge).toHaveTextContent("美味しい");
    });
    it('badge shows special character text correctly', async ()=>{
    render(<Badge text="Ça va? #@$%" />);
    const badge = await screen.getByTestId("badge-test");
    expect(badge).toHaveTextContent("Ça va? #@$%");
    });
    // it('negative case: badge text cannot have boolean values', async ()=>{
    // render(<Badge text={true} />);
    // const badge = await screen.getByTestId("badge-test");
    // expect(badge).not.toHaveTextContent(true);
    // });
})