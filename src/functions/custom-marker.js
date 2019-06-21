import { customElements, quickInsertElement, defaultElement } from '../config/index.js';

export function updatedCustom(textToConvert, header = '<head><title>static page</title></head>', styles = '') {
  // start with just plain text
  // get all css tags
  const css = textToConvert.match(/<style[\s\S]*?(<\/style>|\/>)/g) || [];
  // get all import tags
  const imports = textToConvert.match(/@import[\S\s]+?(\));?/g) || [];
  // look for script tags and remove them 
  let outPut = textToConvert.replace(/<script[\s\S]*?(<\/script>|\/>)/g, '');
  //remove all css tags
  outPut = outPut.replace(css, '');
  //remove all import tags
  outPut = outPut.replace(imports, '');
  // find all ::: id   :::, (layout tags)
  let Check = new RegExp(/:{3} [\s\S]*?:{3}\n(?!:{3})/);
  // match one at a time
  let current = outPut.match(Check);
  // todo find a way to recursively do this so we can embed items inside
  while (current !== null) {
    // split the first element in the match 
    let split = current[0].split('\n');
    // split the first string into parts so that we can get the tag and classes
    let splitTag = split[0].split(' ');
    // get the rest of the data as classes
    let classes = splitTag.slice(2, splitTag.length).join(" ") || '';
    // first tag should always be the replacer
    let tag = splitTag[1];
    // get replacer function from custom elements
    let replacer = customElements[tag];
    // if there is not defined function use the defualt element function
    if (!replacer) replacer = defaultElement(tag);
    // select the data inside of the tags
    let trimmed = '\n\n' + split.slice(1, split.length - 2).join('\n') + '\n\n';
    // run replacer function
    let out = replacer(trimmed, classes) + '\n';
    // replace the current output with the returned replacer function
    outPut = outPut.replace(current, out);
    // check for any matches
    current = outPut.match(Check);
  }
  // meta insert replacement section
  let allTags = []
  // match one at a time
  let metaTags = outPut.match(/\@meta[\s\S]*?\n/);
  while (metaTags !== null) {
    // store all the tags to be processed
    allTags.push(metaTags[0])
    // remove the tags
    outPut = outPut.replace(metaTags[0], '');
    // check for more tags
    metaTags = outPut.match(/\@meta[\s\S]*?\n/);
  }
  //pass all meta tags into their handler
  handleMetaTags(allTags);
  // quick insert replacement section 
  let quickInserts = outPut.match(/\@\-\>[\s\S]*?\n/g) || [];
  // replace changed inserts in output
  outPut = formatInserts(outPut, quickInserts);
  // throw result into marked.js
  return generateHtml(header, outPut, formatCSS(css, styles, imports));
  // look for style tags or @[] tags move them into a variable and remove them from text
}

function handleMetaTags(tagArr) {
  //sends meta data to the app
  tagArr.forEach(tag => {
    let splitTag = tag.split(" ");
    // check for ill formatted tags
    if (splitTag.length > 1) {
      let meta = splitTag[1];
      let data = splitTag.slice(2, splitTag.length).join(" ");
      let event = new CustomEvent("meta-trigger", { detail: { type: meta, data: data } });
      document.querySelector('body').dispatchEvent(event);
    } else {
      throw `tag ${tag.replace('\n', '')} is not formatted correctly`
    }
  })
}

function formatInserts(content, qi) {
  let outPut = content;
  if (qi.length > 0) {
    qi.forEach(item => {
      //remove the tag
      let removedInsert = item.replace(/@->[\s]*/, '');
      //split r by spaces
      let elementTag = removedInsert.match(/\(.+\)/) || null;
      if (elementTag) {
        elementTag = elementTag[0];
        // strip paranthesis from the element tag
        let strippedElement = elementTag.replace(/\(|\)/g, '');
        // update removed insert
        removedInsert = removedInsert.replace(elementTag, '');

        let splitR = removedInsert.split(/(?<=\])/);

        let classes = splitR[0].replace(/\[|\]/g, '');

        let content = splitR.slice(1, splitR.length).join("");

        let replacer = quickInsertElement(strippedElement, classes, content);

        outPut = outPut.replace(item, replacer);
      } else {
        throw `Error with insert tag ${item}`;
      }
    })
  }
  return outPut;
}

function formatCSS(cssMatch, css, imports) {
  let totalCSS = '';
  if (cssMatch.length > 0) {
    cssMatch.forEach(item => {
      let t = item.replace(/<style[\s\S]*?>/g, '');
      t = t.replace(/<\/style[\s\S]*?>/g, '');
      totalCSS += t;
    });
  }
  return `<style>${imports.join("\n")}${css}${totalCSS}</style>`
}

function generateHtml(head, body, style) {
  return (`
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
