export default{
    name: 'box-view',
    props: ['data', 'change'],
    methods: {
        insertTab(e) {
            if (e.keyCode === 9) {
                e.preventDefault();
            }
        },
    },
    template: `
    <textarea class='md-editor'
    v-on:keyup="(e)=>change(e)" 
    v-on:keydown="this.insertTab" :value="data">
    </textarea>`
}