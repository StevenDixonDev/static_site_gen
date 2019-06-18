import mdViewer from './components/md-box.js';
import mdEditor from './components/md-editor.js';
import banner from './components/banner.js';
import {settingMenu} from './components/setting.js';
import theMangler from './functions/custom-marker.js';
import customViewer from './components/custom-viewer.js';
import {templates, customElements, styledTemplates} from './config/index.js'

export default { 
    data() {
        return {
            // text located in editor section
            editorText: '',
            // text that is processed for output section
            markedText: '',
            // current css styles
            currentStyleTemplate: 'cgs',
            // curent text template
            currentTextTemplate: 'none',
            // meta data for the output html document
            documentData: {
                name: 'newDocument',
                header: 'Custom Page',
            },
            //list of menus
            menus: {
                customElementView: false,
                settingMenuView: false,
            },
            //imported objects
            templates, 
            customElements, 
            styledTemplates
        }
    },
    watch:{
        //watch the editor text
        editorText: function(e){
            //update the viewer output whenever the editorText is changed
        }
    },
    computed: {
        fixedMarkedText: function(e){
            let head = `<head><title>${this.documentData.header}</title></head>`
            return  theMangler(this.editorText, customElements, head, `<style>${styledTemplates[this.currentStyleTemplate]}</style>`);
        }
    },
    mounted() {
    },
    components: {
        mdViewer,
        mdEditor,
        banner,
        settingMenu,
        customViewer,
        styledTemplates
    },
    methods: {
        update(e) {
            this.editorText = e.target.value;
        },
        toggleMenu() {
            this.menus.settingMenuView = !this.menus.settingMenuView;
        },
        toggleCustomView(){
            this.menus.customElementView = !this.menus.customElementView;
        },
        changeStyledTemplate(value) {
            this.currentStyleTemplate = value;
        },
        changeTextTemplate(value) {
            this.currentTextTemplate = value;
            this.editorText = templates[value];
        },
        updateDocName(value) {
            this.documentData.name = value;
        },
        updatePageTitle(value) {
            this.documentData.header = value;
        },
        generateHTML() {
            let text = this.markedText.slice();
                var file = new File([text], {
                    type: "text/plain;charset=utf-8"
                });
            saveAs(file, this.documentData.name + '.html')
        },
    },
    template: `
        <main>
            <banner :onClick="toggleMenu"/>
            <div class='page-wrapper'>
                <mdEditor :change="update" :data="this.editorText"/>
                <mdViewer :data="this.fixedMarkedText"/>
                <settingMenu 
                v-if="this.menus.settingMenuView" 
                :docdata='this.documentData' 
                :styled='styledTemplates' 
                :text='templates' 
                :handle='{generateHTML, toggleCustomView}' 
                @changeDocTitle="this.updatePageTitle"
                @changeDocName="this.updateDocName"
                @changeTextTemplate="this.changeTextTemplate"
                @changeStyledTemplate="this.changeStyledTemplate"
                />
            </div>
                <customViewer v-if='this.menus.customElementView' :elements='customElements' :toggle='toggleCustomView'/>
        </main>
    `
}