# Static Page/Site Generator 2019

Static Page/Site generator is a project page built using vue, I wanted to learn more about what went into generating static sites.
Most tutorials cover the back-end and using ejs and build scripts to compile a page. I do want to learn about this in the future 
however I though to myself wouldn't it be cool to be able to write small static pages with mark down and beable to use custom markdown
components. It was decided that the custom tags would target the layout of the page.

### Uses

The Idea was to be able to generate self contained static pages that included html, css, and images all bundled into a neat package.
Users are able to write webpages using predefined templates and markdown. 

### Libraries Used
 - Vue.js
 - Marked.js
 - Filesaver.js

### Tool Compatibility
 - Firefox
 - Chrome

### Webpage Compatibility

- Depending how the CSS is written may affect how the webpages are displayed in the browser of your choice.


### Documentation

#### Marked/MarkDown

This tool uses the standard markdown language. emojis are not supported currently.

#### Custom tags

All custom layout tags start with ::: and end with :::

Tags can be nested to create advanced layouts.

```

::: customtagname

  ::: nestedTag

  :::

:::

```

***Extra classes on custom tags***

Any extra data after the tag name will be interpretted as class names.

::: nav `fixed-width` `wide`

:::


**Current custom tags**

The follow will create divs with a class name related to the name

- single 
- double
- triple
- title 
- body
- nav
- flex-1
- flex-2
- flex-3
- container
- item

**Quick inserts**

Users are able to insert small single line elements with @->.

syntax is `@-> element className content`

``` 

@-> h1 red I am a h1 with a red class 

```

#### CSS

CSS can be added to the page through style tags, all styles are moved to the head tag no matter where they are. 

Template css that is specified is moved to the top of the styles in order to make overwriting 

```

<style>
p{
  color: red;
}
</style>

```

or through import tags, font familys will still need to be specified in style tags

```

@import url('https://fonts.googleapis.com/css?family=Noto+Sans+HK&display=swap');

```

#### JavaScript

script tags are actively removed from the page as to not execute malicious js.

Buttons can still execute javascript through onclick events by using html tags

#### 


---


### Acknowledgements

- Marked.js for inspiring me.
 
 ---

## Demo

I am hosting the project live [here](https://stevendixondev.github.io/static_site_gen/) on my github

