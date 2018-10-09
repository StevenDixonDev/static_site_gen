function custom(markdown, customElements ,header='<head><title>static page</title></head>', styles= ''){
    let matchString = /:{3}\s(\w*)([\w\s\"\-\[\]\(\)\/\.\*\+\_\=\{\}\|\/\\\.\,\<\>\&\^\%\$\#\@\!\~\`\?\d]*):{3}$/gm;
    let matched = markdown.match(matchString) || [];
    let output = [];
    if (matched.length > 0) {
        let text = '';
        matched.forEach(item => {
          text = item.replace(/:::/g, '').split('\n').map(item => item.trim());
          text.splice(0, 1);
          text = text.join('\n');
          let split = item.match(/:{3}(.*)[\s]/g)[0].replace(/:::/, '').trim();
          let test = item;
          output.push({
            element: split,
            data: marked(text),
            item
          });
        })
      }
    return generateHtml(header, replaceCustom(markdown, output, customElements), styles);
}

function replaceCustom(markdown, filtered, customElements){
    let temp = markdown.slice();
    for (let items in filtered) {
        temp = markdown.replace(filtered[items].item, customElements[filtered[items].element](filtered[items].data));
    }
    return temp;
}

function generateHtml(head, body, style){
    return (`
    <html>
    ${head}
    <body>
    ${marked(body)}
    </body>
    ${style}
    </html>
  `)
}

export default custom;

/*
::: key
sdfs
:::
*/