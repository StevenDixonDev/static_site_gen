export default{
    name: 'box-view',
    props: ['data'],
    template: `<iframe class='md-viewer' :srcdoc='data'></iframe>`
}