export default{
    name: 'Banner',
    props: ['onClick'],
    template: `
    <div id="banner">
        <h1>Static Page Gen</h1>
        <div class="banner-icons">
        <i id="code" @click='onClick' class="fas fa-code"></i>
        <i id="settings" @click='onClick' class="fas fa-cogs"></i>
        </div>
    </div>`
}