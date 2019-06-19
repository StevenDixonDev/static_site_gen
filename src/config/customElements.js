export const customElements =  {
    single: (data, classes)=>`<div class='single ${classes}'>${data}</div>`,
    double: (data, classes)=>`<div class='double ${classes}'>${data}</div>`,
    triple: (data, classes)=>`<div class='triple ${classes}' >${data}</div>`,
    title: (data, classes)=>`<div class='title ${classes}'>${data}</div>`,
    body: (data, classes)=>`<div class='body-div ${classes}'>${data}</div>`,
    'nav': (data, classes)=>`<div class='nav ${classes}'>${data}</div>`,
    'flex-1': (data, classes)=>`<div class='flex-1 ${classes}'>${data}</div>`,
    'flex-2': (data, classes)=>`<div class='flex-2 ${classes}'>${data}</div>`,
    'flex-3': (data, classes)=>`<div class='flex-3 ${classes}'>${data}</div>`,
    'container': (data, classes)=>`<div class='container ${classes}'>${data}</div>`,
    'item': (data, classes)=>`<div class='item ${classes}'>${data}</div>`

}

export const quickInsertElement = (tags, className, content) =>{
        //@-> p class content
    return `<${tags} class="${className}">${content}</${tags}>`
}