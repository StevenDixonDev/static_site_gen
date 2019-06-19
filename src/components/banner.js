export default{
    name: 'Banner',
    props: ['onClick'],
    template: `
    <div id="banner">
        <h1>STATIC PAGE GENERATOR</h1>
        <i v-on:click='onClick' class="fas fa-cogs"></i>
    </div>`
}