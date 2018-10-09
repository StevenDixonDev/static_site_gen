export default{
    props: ['templates', 'handle'],
    template: `
    <div id="settings">
        <h3>Settings</h3>
        <label>Template Type: </label>
        <select v-on:change="(e)=>handle.changeTemplate(e.target.value)">
            <option v-for="item of Object.keys(templates)" :value="item">{{item}}</option>
        </select>
        <a href="#" v-on:click="()=>handle.download('html')">Download HTML</a>
    </div>`
}