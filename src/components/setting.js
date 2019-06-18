export const settingMenu ={
    props: ['styled', 'text', 'handle', 'docdata'],
    methods:{
        changeDocName(e){
            this.$emit('changeDocName', e.target.value);
        },
        changeDocTitle(e){
            this.$emit('changeDocTitle', e.target.value);
        },
        changeTextTemplate(e){
            this.$emit('changeTextTemplate', e.target.value);
        },
        changeStyledTemplate(e){
            this.$emit('changeStyledTemplate', e.target.value);
        }
    },
    template: `
    <div id="settings">
        <h2>Settings</h2>
        <hr />
        <label>Template Type:
        <select v-on:change="this.changeStyledTemplate">
            <option v-for="item of Object.keys(styled)" :value="item">{{item}}</option>
        </select>
        </label>

        <label>Template Text:
        <select v-on:change="this.changeTextTemplate">
            <option v-for="item of Object.keys(text)" :value="item">{{item}}</option>
        </select>
        </label>
        
        <label>Doc Name:
        <input type='text' v-on:keyup='this.changeDocName' :value='docdata.name'></input>
        </label>

        <label>Page Title:
        <input type='text' v-on:keyup='this.changeDocTitle' :value='docdata.header'></input>
        </label>
        <button v-on:click="handle.generateHTML">Download HTML</button>
        <button v-on:click="handle.toggleCustomView">View Custom Elements</button>
    </div>`
}