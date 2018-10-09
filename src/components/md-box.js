export default{
    name: 'box-view',
    props: ['data'],
    template: `<div class='md-viewer' v-html='data'></div>`
}