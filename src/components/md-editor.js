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
    v-on:keyup="change" 
    v-on:keydown="insertTab" :value="data">
    </textarea>
    `
}