import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { edit } from '../mocks/data';
import axiosWithAuth from '../utils/axiosWithAuth';

import Article from './Article';
import EditForm from './EditForm';

const View = (props) => {
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();

useEffect(() =>{
    axiosWithAuth()

    .get('/articles')
        .then(res =>{
            setArticles(res.data);
        })
        .catch(err =>{
            console.log('View.js useeffect err:', err)
        })
}, [])

console.log('Articles after View.js useEffect:', articles)

    //adding this in
    const deleteArticle = (id) => {
        setArticles(articles.filter(article=> (article.id !== id)));
      }
    

    //need to work on this still, not sure how to update local state with changes
    const handleDelete = (id) => {
        console.log('Yay! Starting Delete!')
        axiosWithAuth()
            .delete(`/articles/${id}`)
            .then(res =>{
                deleteArticle(id);
                console.log('Data after delete:', res.data)
            })
            .catch(err =>{
                console.log('Delete Error AD:', err)
            })
    }



    const handleEdit = (article) => {
        console.log('edit blah')
        axiosWithAuth()
            .put(`articles/${editId}`, article)
                .then(res =>{
                    console.log('Articles after view.js handleEdit:', res.data);
                    setEditing(false)
                    setArticles(res.data)
                })
                .catch(err =>{
                    console.log(err)
                })
    }

    const handleEditSelect = (id)=> {
        setEditing(true);
        setEditId(id);
    }

    const handleEditCancel = ()=>{
        setEditing(false);
    }

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer> <h1>View: Blah BLah Blah</h1> 
            {/* placeholder text so I know at a glance what component I'm on */}
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditCancel={handleEditCancel}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;

//Task List:
//1. Build and import axiosWithAuth module in the utils.
//2. When the component mounts, make an http request that adds all articles to state.
//3. Complete handleDelete method. It should make a request that delete the article with the included id.
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param.


const Container = styled.div`
    padding: 0.5em;
`
const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;