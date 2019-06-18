export const styledTemplates  = {
    cgs: `
    *{
        font-family: Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
    img {
        width: 90%;
    }
    hr{
        width: 100%;
    }
    html{
        margin: 0;
        width: 100%;
    }
    body{
        margin: auto;
        display: flex;
        flex-direction: column;
        padding: 1em;
    }
    p{
        color: #373d49;
        font-size: 1rem;
        padding-left: .3em;
    }
    h1, h2, h3, h4, h5, h6{
        padding-left: .3em;
        font-feature-settings: 'dlig' 1,'liga' 1,'lnum' 1,'kern' 1;
        color: #373d49;
        font-style: normal;
        font-weight: 600;
        margin: 0.2em;
    }
    .body-div{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-top: .5em;
        margin-bottom: .5em;
    }
    .single{
        margin-top: .2em;
        display: flex;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    .single > *{
        width: 100%;
    }
    .double{
        display: flex;
        justify-content: space-around;
    }
    .double *{
        flex-basis: 45%;
        text-align: center;
    }
    .triple{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: row;
    }
    .triple > *{
        flex-basis: 33%;
    }
    .title{
        color: #373d49;
    }
    .title *{
        font-size: 2em;
        margin: 0;
        padding-top: .2em;
        text-align: center;
        font-style: normal;
        font-weight: 600;
    }
    .title::after{
        content: '';
        background-color: #373d49;
        display: block;
        width: 100%;
        height: 3px;
        position: relative;
        bottom: 0;
        left: 0;
        margin: auto;
    }
    table{
        border-collapse: collapse;
        background-color: #e8e8e8;
        border: 1px solid #373d49;
        border-style: hidden;
        border-radius: 5px;
    }
    td, th{
        padding: .5em;
        border: 1px solid #373d49;
    }
    `,
    machines: `
    *{
        font-family: Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
    img {
        width: 90%;
    }
    hr{
        width: 100%;
    }
    html{
        margin: 0;
        width: 100%;
        background-color: black;
    }
    body{
        background-color: white;
        margin: auto;
        max-width: 800px;
        display: flex;
        flex-direction: column;
        padding: 1em;
        border-radius: 5px;
    }
    .nav{
        display: flex;
        flex-flow: row;
        justify-content: center;
    }
    .nav *{
        color: green;
        text-decoration: none;
        margin-left: .5em;
        margin-right: .5em;
    }
    p{
        color: #373d49;
        font-size: 1rem;
        padding-left: .3em;
    }
    h1, h2, h3, h4, h5, h6{
        padding-left: .3em;
        font-feature-settings: 'dlig' 1,'liga' 1,'lnum' 1,'kern' 1;
        color: #373d49;
        font-style: normal;
        font-weight: 600;
        margin: 0.4em;
    }
    .body-div{
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-top: .5em;
        margin-bottom: .5em;
    }
    .single{
        margin-top: .2em;
        display: flex;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    .single > *{
        width: 100%;
    }
    .double{
        display: flex;
        justify-content: space-around;
    }
    .double *{
        flex-basis: 45%;
        text-align: center;
    }
    .triple{
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: row;
    }
    .triple > *{
        flex-basis: 33%;
    }
    .title{
        color: #373d49;
    }
    .title *{
        font-size: 2em;
        margin: 0;
        padding-top: .2em;
        text-align: center;
        font-style: normal;
        font-weight: 600;
        
    }
    .title::after{
        content: '';
        background-color: #373d49;
        display: block;
        width: 100%;
        height: 3px;
        position: relative;
        bottom: 0;
        left: 0;
        margin: auto;
    }
    table{
        border-collapse: collapse;
        background-color: #e8e8e8;
        border: 1px solid #373d49;
        border-style: hidden;
        border-radius: 5px;
    }
    td, th{
        padding: .5em;
        border: 1px solid #373d49;
    }
    `
};
