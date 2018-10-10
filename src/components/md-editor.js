export default{
    name: 'box-view',
    props: ['data', 'change', 'tab'],
    template: `<textarea class='md-editor'v-on:keyup="(e)=>change(e)" v-on:keydown="(e)=>tab(e)">{{data}}</textarea>`
}