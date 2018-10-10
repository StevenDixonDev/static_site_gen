

const templates  = {
    sleek: `
    
    *{
        font-family: Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
    img {
        width: 100%;
    }
    hr{
        width: 100%;
        color: red;
        
        background-color: #373d49;
    }
    html, body{
        margin: 0;
    }
    body{
        display: flex;
        flex-direction: column;
    }
    p{
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
    .green {
        color: green;
    }
    .double{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .double > * {
        width: 50%;
    }
    .triple{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .triple > * {
        width: 33%;
    }
    .title  {
        text-align: center;
        color: white;
        background-color: black;
        
    }
    .title *{
        font-size: 2em;
    }
    pre{
        border: 1px solid black;
        color: white;
        background-color: black;
        border-radius: 8px;
        width: auto;
        padding: 1em;
    }

    `,
    smooth: `
    p{color: blue}
    h1, h2, h3, h4, h5, h6 {font-family: sans-serif;}
    .title  {
        text-align: center;
        color: blue;
        background-color: black;
        
    }
    .title *{
        font-size: 2em;
    }
    `
}

export default templates