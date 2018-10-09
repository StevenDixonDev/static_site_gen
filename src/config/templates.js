

const templates  = {
    sleek: `
    *{
        font-family: Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif;
        color: #373d49;
    }
    hr{
        width: 100%;
        color: red;
        
        background-color: #373d49;
    }
    body{
        display: flex;
        flex-direction: column;
    }
    p{
        font-family: Georgia,Cambria,serif;
        font-size: 1rem;
        padding-left: .3em;
    }
    h1, h2, h3, h4, h5, h6{
        padding-left: .3em;
        font-feature-settings: 'dlig' 1,'liga' 1,'lnum' 1,'kern' 1;
        font-style: normal;
        font-weight: 600;
        
        margin: .2em;
    }
    .green{
        color: green;
    }
    `,
    smooth: `
    p{color: blue}
    h1, h2, h3, h4, h5, h6 {font-family: sans-serif;}
    `
}

export default templates