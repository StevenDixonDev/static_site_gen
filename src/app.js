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
            header: '<head><title>Custom Page</title></head>',
            documentData: {
                name: 'newDocument'
            }
        }
    },
    mounted() {
        this.styledTemplates = style_templates;
        this.currentStyleTemplate = 'cgs';
        this.textTemplates = text_templates;
        this.currentTextTemplate = 'none';

    },
    components: {
        mdViewer,
        mdEditor,
        banner,
        settings
    },
    methods: {
        insertTab(e) {
            if (e.keyCode === 9) {
                e.preventDefault();
            }
        },
        update(e) {
            this.text = document.querySelector('.md-editor').value;
            let test = theMangler(this.text, customElements, this.header, `<style>${this.styledTemplates[this.currentStyleTemplate]}</style>`);
            this.markedText = test;
        },
        openMenu() {
            this.menuStatus = !this.menuStatus;
        },
        changeStyledTemplate(value) {
            this.currentStyleTemplate = value;
            this.update(this.text);
        },
        changeTextTemplate(value) {
            this.currentTextTemplate = value;
            document.querySelector('.md-editor').value = this.textTemplates[value];
            this.update(document.querySelector('.md-editor').value);
        },
        updateDocName(name){
            this.documentData.name = name;
        },
        download(type) {
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
                var file = new File([text], {type: "text/plain;charset=utf-8"});
                saveAs(file, this.documentData.name+'.html')

                /*    console.log(text)
                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                    element.setAttribute('download', this.documentData.name + ".html");
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    */
            });
        },
        makeP() {
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
        <banner :onClick="openMenu"/>
        <div class='page-wrapper'>
            <mdEditor :change="update" :tab="insertTab" :data="this.text"/>
            <mdViewer :data="this.markedText"/>
        </div>
            <settings v-if="this.menuStatus" :docdata='this.documentData' :styled='this.styledTemplates' :text='this.textTemplates' :handle='{updateDocName, changeStyledTemplate, changeTextTemplate, download, makeP}' />
        </div>
    `
}