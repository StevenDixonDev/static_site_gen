import {customElements, quickInsertElement} from '../config/index.js';

// todo remove
function custom(markdown, header='<head><title>static page</title></head>', styles= ''){
    let matchString = /:{3}\s[a-z]*\n[\s\S]*?\n:{3}/gm;
    let matched = markdown.match(matchString) || [];
    let output = [];
    if (matched.length > 0) {
        let text = '';
        matched.forEach(item => {
          text = item.replace(/:::/g, '').split('\n').map(item => item.trim());
          text.splice(0, 1);
          text = text.join('\n');
          let split = item.match(/:{3}(.*)[\s]/g)[0].replace(/:::/, '').trim();
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
        temp = temp.replace(filtered[items].item, customElements[filtered[items].element](filtered[items].data));
    }
    return temp;
}

export function updatedCustom(textToConvert, header='<head><title>static page</title></head>', styles='' ){
  // @ todo handle error where no custom elements exist
   
  // start with just plain text
  const css = textToConvert.match(/<style[\s\S]*?(<\/style>|\/>)/g) || [];

  const imports = textToConvert.match(/@import[\S\s]+?(\));?/g) || [];
  // look for script tags and remove
  let outPut = textToConvert.replace(/<script[\s\S]*?(<\/script>|\/>)/g, '');

  outPut = outPut.replace(css, '');
  outPut = outPut.replace(imports, '');
  // find in text all ::: id   :::, (layout tags) and convert them bases on
  let Check = new RegExp(/:{3} [\s\S]*?:{3}\n(?!:{3})/);
  
  let current = outPut.match(Check);
  
  // todo find a way to recursively do this so we can embed items inside
  while(current !== null){
    let split = current[0].split('\n');
    
    let splitTag = split[0].split(' ');
    
    // add parameters to ::: id  :::
    let directive = splitTag.slice(2, splitTag.length).join(" ") || '';
    let tag = splitTag[1];
    let replacer = customElements[tag];
    if (!replacer) break;
  
    let trimmed = '\n\n'+split.slice(1, split.length-2).join('\n')+'\n\n';
    
    let out = replacer(trimmed , directive) +'\n';
    outPut = outPut.replace(current, out);
    current = outPut.match(Check);
  }
  
  // quick insert replacement section 
  let quickInserts = outPut.match(/\@\-\>[\s\S]*?\n/g) || [];
  outPut = formatInserts(outPut, quickInserts);

  // throw result into marked.js
  return generateHtml(header, outPut, formatCSS(css, styles, imports));
 // look for style tags or @[] tags move them into a variable and remove them from text
}

function formatInserts(content, qi){
  let outPut = content;
  if(qi.length > 0){
    qi.forEach(item =>{
      //remove the tag
      let r = item.replace('@-> ', '');
      //split r by spaces
      let splitR = r.split(' ');
      let replacer = quickInsertElement(splitR[0], splitR[1], splitR.slice(2, splitR.length).join(" "))
      outPut = outPut.replace(item, replacer);
    
    })
  }
  return outPut;
}

function formatCSS(cssMatch, css, imports){
  let totalCSS = '';
  if(cssMatch.length > 0){
    cssMatch.forEach(item =>{
      let t = item.replace(/<style[\s\S]*?>/g, '');
      t = t.replace(/<\/style[\s\S]*?>/g, '');
      totalCSS+=t;
    });
  }
  return `<style>${imports.join("\n")}${css}${totalCSS}</style>`
}

function replaceSpecialHTML(){

}

function generateHtml(head, body, style){
    return (`
    <DOCTYPE html />
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${head}
    ${style}
    </head>
    <body>
    ${marked(body)}
    </body>
    </html>
  `)
}

export default custom;
