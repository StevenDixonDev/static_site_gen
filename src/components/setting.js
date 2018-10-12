export default{
    props: ['styled', 'text', 'handle', 'docdata'],
    template: `
    <div id="settings">
        <h3>Settings</h3>
        <hr />
        <label>Template Type:
        <select v-on:change="handle.changeStyledTemplate">
            <option v-for="item of Object.keys(styled)" :value="item">{{item}}</option>
        </select>
        </label>

        <label>Template Text:
        <select v-on:change="handle.changeTextTemplate">
            <option v-for="item of Object.keys(text)" :value="item">{{item}}</option>
        </select>
        </label>
        
        <label>Doc Name:
        <input type='text' v-on:keyup='handle.updateDocName' :value='docdata.name'></input>
        </label>

        <label>Page Title:
        <input type='text' v-on:keyup='handle.updatePageTitle' :value='docdata.header'></input>
        </label>

        <button v-on:click="handle.generatePDF">Generate PDF</button>
        <button v-on:click="handle.generateHTML">Download HTML</button>
        <button v-on:click="handle.toggleCustomView">View Custom Elements</button>
    </div>`
}