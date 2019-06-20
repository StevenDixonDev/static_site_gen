export const customElements =  {
    single: (content, classes)=>`<div class='single ${classes}'>${content}</div>`,
    double: (content, classes)=>`<div class='double ${classes}'>${content}</div>`,
    triple: (content, classes)=>`<div class='triple ${classes}' >${content}</div>`,
    title: (content, classes)=>`<div class='title ${classes}'>${content}</div>`,
    body: (content, classes)=>`<div class='body-div ${classes}'>${content}</div>`,
    'nav': (content, classes)=>`<div class='nav ${classes}'>${content}</div>`,
    'flex-1': (content, classes)=>`<div class='flex-1 ${classes}'>${content}</div>`,
    'flex-2': (content, classes)=>`<div class='flex-2 ${classes}'>${content}</div>`,
    'flex-3': (content, classes)=>`<div class='flex-3 ${classes}'>${content}</div>`,
    'container': (content, classes)=>`<div class='container ${classes}'>${content}</div>`,
    'item': (content, classes)=>`<div class='item ${classes}'>${content}</div>`

}

export const quickInsertElement = (tags, className, content) =>{
        //@-> p class content
    return `<${tags} class="${className}">${content}</${tags}>`
}

export const defaultElement = (tags) => {
    return (content, className)=>{
       return `<${tags} class="${className}">${content}</${tags}>`
    }
    
}