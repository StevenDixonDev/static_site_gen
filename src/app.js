import mdViewer from './components/md-box.js';
import mdEditor from './components/md-editor.js';
import banner from './components/banner.js';
import style_templates from './config/styletemplates.js';
import text_templates from './config/template.js';
import settings from './components/setting.js';
import theMangler from './components/custom-marker.js';
import customElements from './config/customElements.js';
import makePDF from './components/pdfMaker.js';
import uriConvert from './components/urlReplacer.js';
import customViewer from './components/custom-viewer.js';

export default {
    data() {
        return {
            text: '',
            markedText: '',
            styledTemplates: {},
            textTemplates: {},
            currentStyleTemplate: '',
            currentTextTemplate: '',
            menuStatus: false,
            documentData: {
                name: 'newDocument',
                header: 'Custom Page',
            },
            elements: {},
            cview: false
        }
    },
    mounted() {
        this.styledTemplates = style_templates;
        this.currentStyleTemplate = 'cgs';
        this.textTemplates = text_templates;
        this.currentTextTemplate = 'none';
        this.elements = customElements;
    },
    components: {
        mdViewer,
        mdEditor,
        banner,
        settings,
        customViewer
    },
    methods: {
        insertTab(e) {
            if (e.keyCode === 9) {
                e.preventDefault();
            }
        },
        update(e) {
            this.text = document.querySelector('.md-editor').value;
            let head = `<head><title>${this.documentData.header}</title></head>`
            let test = theMangler(this.text, customElements, head, `<style>${this.styledTemplates[this.currentStyleTemplate]}</style>`);
            this.markedText = test;
        },
        toggleMenu() {
            this.menuStatus = !this.menuStatus;
        },
        toggleCustomView(){
            this.cview = !this.cview;
        },
        changeStyledTemplate(e) {
            this.currentStyleTemplate = e.target.value;
            this.update(this.text);
        },
        changeTextTemplate(e) {
            this.currentTextTemplate = e.target.value;
            document.querySelector('.md-editor').value = this.textTemplates[e.target.value];
            this.update(document.querySelector('.md-editor').value);
        },
        updateDocName(e) {
            this.documentData.name = e.target.value;
        },
        updatePageTitle(e) {
            this.documentData.header = e.target.value;
        },
        generateHTML(type) {
            uriConvert(this.markedText).then((data) => {
                let text = this.markedText.slice();
                if (data !== 'done') {
                    if (data.length > 0) {
                        data.forEach(item => {
                            text = text.replace(`src="${item.url}"`, `src="${item.uri}"`);
                        })
                    } else {
                        text = text.replace(data.url, data.uri)
                    }
                }
                var file = new File([text], {
                    type: "text/plain;charset=utf-8"
                });
                saveAs(file, this.documentData.name + '.html')
            });
        },
        generatePDF() {
            uriConvert(this.markedText).then((data) => {
                let text = this.markedText.slice();
                if (data !== 'done') {
                    if (data.length > 0) {
                        data.forEach(item => {
                            text = text.replace(item.url, item.uri);
                        })
                    } else {
                        text = text.replace(data.url, data.uri)
                    }
                }
                makePDF(text, this.documentData.name);
            });
        }
    },
    template: `
        <div>
        <banner :onClick="toggleMenu"/>
        <div class='page-wrapper'>
            <mdEditor :change="update" :tab="insertTab" :data="this.text"/>
            <mdViewer :data="this.markedText"/>
        </div>
            <customViewer v-if='this.cview' :elements='this.elements' :toggle='toggleCustomView'/>
            <settings v-if="this.menuStatus" :docdata='this.documentData' :styled='this.styledTemplates' :text='this.textTemplates' :handle='{updateDocName, updatePageTitle, changeStyledTemplate, changeTextTemplate, generateHTML, generatePDF, toggleCustomView}' />
        </div>
    `
}