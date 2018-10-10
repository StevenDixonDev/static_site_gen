export default{
    props: ['styled', 'text', 'handle', 'docdata'],
    template: `
    <div id="settings">
        <h3>Settings</h3>
        <hr />
        <label>Template Type:
        <select v-on:change="(e)=>handle.changeStyledTemplate(e.target.value)">
            <option v-for="item of Object.keys(styled)" :value="item">{{item}}</option>
        </select>
        </label>

        <label>Template Text:
        <select v-on:change="(e)=>handle.changeTextTemplate(e.target.value)">
            <option v-for="item of Object.keys(text)" :value="item">{{item}}</option>
        </select>
        </label>
        
        <label>Doc Name:
        <input type='text' :value='docdata.name'></input>
        </label>

        <button v-on:click="handle.makeP()">Generate PDF</button>
        <button v-on:click="()=>handle.download('html')">Download HTML</button>
    </div>`
}