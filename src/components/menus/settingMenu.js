export const settingMenu = {
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
        },
        downloadText(e){
            this.$emit('downloadText');
        }
    },
    template: `
    <div class="settings">
        <h3>Settings</h3>
        <hr />
        <label>Template Type:
        <select v-on:change="changeStyledTemplate">
            <option v-for="item of Object.keys(styled)" :value="item">{{item}}</option>
        </select>
        </label>

        <label>Template Text:
        <select v-on:change="changeTextTemplate">
            <option v-for="item of Object.keys(text)" :value="item">{{item}}</option>
        </select>
        </label>
        
        <label>Doc Name:
        <input type='text' v-on:keyup='changeDocName' :value='docdata.name'></input>
        </label>

        <label>Page Title:
        <input type='text' v-on:keyup='changeDocTitle' :value='docdata.header'></input>
        </label>
        <button @click="handle.generateHTML">Download HTML</button>
        <button @click="downloadText">Download Text</button>
    </div>`
}