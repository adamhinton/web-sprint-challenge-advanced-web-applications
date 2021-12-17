import React from 'react';
import '@testing-library/jest-dom';
import Article from './Article';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';


test('renders component without errors', ()=> {
    const article = [];
    render(<Article article={article}/>)
});



test('renders headline, author from the article when passed in through props', ()=> {
    const article = [
        {
            id: 'aMqwd',
            headline: "headline",
            createdOn: '2021-08-09T18:02:38-04:00',
            summary: "summary",
            body: ""
        }
    ];

    render(<Article article = {article}/>);
    const headline = screen.queryByTestId(/headline/i);
    const author = screen.queryByTestId(/author/i);
    const summary = screen.queryByTestId(/summary/i);
    const body =  screen.queryByTestId(/body/i)

    expect(headline).toBeTruthy();
    expect(author).toBeTruthy();
    expect(summary).toBeTruthy();
    expect(body).toBeTruthy()
});



test('renders "Associated Press" when no author is given', async()=> {
    const article = [
        {
            id: 'aMqwd', 
            headline: "headline",
            createdOn: '2021-08-09T18:02:38-04:00',
            summary: "summary",
            body: "" 
        }
    ];

    render(<Article article = {article}/>);
    
    const aP = screen.queryByText(/associated press/i);
    
    expect(aP).toBeTruthy();
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();

    const article = [];
    render(<Article article={article} handleDelete={handleDelete}/>)

    const btn = screen.getByTestId('deleteButton');
    userEvent.click(btn);
    expect(handleDelete).toBeCalled()
});

//Task List:
//1. Complete all above tests. Create test article data when needed.