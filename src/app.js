import mdViewer from './components/md-box.js';
import mdEditor from './components/md-editor.js';
import banner from './components/banner.js';
import templates from './config/templates.js';
import settings from './components/setting.js';
import theMangler from './components/custom-marker.js';
import customElements from './config/customElements.js';

export default {
    data(){
        return {
            text: '',
            markedText: '',
            templates: {},
            currentTemplate: '',
            menuStatus: false,
            header: '<head><title>Custom Page</title></head>'
        }
    },
    mounted(){
        this.templates = templates;
        this.currentTemplate = 'sleek';
    },
    components: {
        mdViewer,
        mdEditor,
        banner,
        settings
    },
    methods: {
        insertTab(e){
            if(e.keyCode === 9){
                e.preventDefault();
            }
        },
        update(e){
            this.text = e.target.value;
            //console.log(this.templates[this.currentTemplate])
            let test = theMangler(this.text, customElements, this.header, `<style>${this.templates[this.currentTemplate]}</style>`)
            this.markedText = test;
            //data + `<style>${this.templates[this.currentTemplate]}</style>`
            
        },
        generateCode(){

        },
        openMenu(){
            this.menuStatus = !this.menuStatus;
        },
        changeTemplate(value){
            this.currentTemplate = value;
            this.update(this.text);
        },
        download(type){
            let element = document.createElement('a');
            let fileName = 'staticpage.'+type;
            let text = '';
            switch(type){
                case 'html': text = this.markedText; break;
                case 'md' : text = this.text; break;
            }
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', fileName);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    },
    template: `
        <div>
        <banner :onClick="openMenu"/>
        <div class='page-wrapper'>
            <mdEditor :change="update" :tab="insertTab" :data="this.text"/>
            <mdViewer :data="this.markedText"/>
        </div>
            <settings v-if="this.menuStatus" :menu='this.menuStatus' :templates='this.templates' :handle='{changeTemplate, download}' />
        </div>
    `
    }