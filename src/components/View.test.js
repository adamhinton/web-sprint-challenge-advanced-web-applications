import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import View from './View';
import Article from './Article';

test("renders zero articles without errors", async () => {
    const article = [];

    render(<Article article={article}/>)
});

test("renders three articles without errors", ()=> {
    const article = [
        {
            id: 'aMqwd', //unique article id
            headline: "headline", //title of article
            createdOn: '2021-08-09T18:02:38-04:00',
            //timestamp of when article was added
            summary: "summary", //short summary statement of article
              body: ""  //paragraph of article text
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


// test("renders three articles without errors", async ()=> {}

//Task List
//1. Complete the above two tests. Make sure to mocking the articleService call before rendering.