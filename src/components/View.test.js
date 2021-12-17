import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import View from './View';
import Article from './Article';

test("renders zero articles without errors", async () => {
    const article = [];

    render(<Article article={article}/>)
});

// test("renders three articles without errors", async ()=> {
// });

//Task List
//1. Complete the above two tests. Make sure to mocking the articleService call before rendering.