export default `
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

html, body{
  margin: 0;
  padding: 0;
}

p, h1, h2, h3, h4, h5, h6, li{
  font-family: 'Roboto', sans-serif;
}

a{
  font-size: 1.2em;
  font-weight: 500;
}

hr{
  border-color: #364763;
  background-color: #364763;; height: 2px; border: 0;
  width: 100%;
}

.container{
  margin: 1em 1em;
  display: flex;
  flex-direction: column;
}

.container hr{
  width: 100%;
}


.header{
  text-align: center;
  background-color: #6c727c;
}

.head{
    color: white;
    
    margin: 0 auto;
    padding: .5em;
    border-bottom: 5px solid #364763;
}

.nav{
  margin: 0 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.nav a{
  color: #364763;

}

.video{
  width: 80%;
  height: auto;
  align-self: center;
}

`