export default{
    name: 'box-view',
    props: ['data', 'change'],
    template: `<textarea class='md-editor' v-on:keyup="(e)=>change(e.target.value)">{{data}}</textarea>`
}