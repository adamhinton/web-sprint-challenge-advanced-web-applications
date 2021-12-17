import React from 'react';
import '@testing-library/jest-dom';
import Article from './Article';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


test('renders component without errors', ()=> {
    const article = [];
    render(<Article article={article}/>)
});



test('renders headline, author from the article when passed in through props', ()=> {
    const article = 
        {
            id: 'aMqwd',
            headline: "Heyo",
            createdOn: '2021-08-09T18:02:38-04:00',
            summary: "fjklads;fas",
            body: "blah blah blah",
            author: 'James Johsnon'
        };
        //I kept getting confused why this didn't work, then finally figured out I made this an array with only one object which messed up the call.

    render(<Article article = {article}/>);
    const headline = screen.getByText(/heyo/i);
    const author = screen.queryByText(/James Johsnon/i);
    const summary = screen.queryByText(/fjklads;fas/i);
    const body =  screen.queryByText(/blah blah blah/i)

    console.log('headline:', headline)

    expect(headline).toBeTruthy();
    expect(author).toBeTruthy();
    expect(summary).toBeTruthy();
    expect(body).toBeTruthy()
});



test('renders "Associated Press" when no author is given', async()=> {
    const article =
        {
            id: 'aMqwd', 
            headline: "headline",
            createdOn: '2021-08-09T18:02:38-04:00',
            summary: "summary",
            body: "" 
        };

    render(<Article article = {article}/>);
    
    const aP = screen.queryByText(/associated press/i);
    
    expect(aP).toBeTruthy();
});




test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    //This makes a fake handleDelete that doesn't do anything

    const article = [];
    render(<Article article={article} handleDelete={handleDelete}/>)

    const btn = screen.getByTestId('deleteButton');
    userEvent.click(btn);
    expect(handleDelete).toBeCalled()
});



//Task List:
//1. Complete all above tests. Create test article data when needed.