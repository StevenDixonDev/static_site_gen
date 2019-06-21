import mdViewer from "./components/md-box.js";
import mdEditor from "./components/md-editor.js";
import banner from "./components/banner.js";
import { settingMenu, codeMenu } from "./components/menus/index.js";
import { updatedCustom } from "./functions/custom-marker.js";
import customViewer from "./components/custom-viewer.js";
import { templates, customElements, styledTemplates } from "./config/index.js";

// @todo found bug editor loses focus when updating js or css tags

export default {
  data() {
    return {
      // text located in editor section
      editorText: "",
      // text that is processed for output section
      markedText: "",
      // current css styles
      currentStyleTemplate: "none",
      //
      styleTemplateText: '',
      // curent text template
      currentTextTemplate: "none",
      // timer for updates so they don't fire too quickly
      updateClock: null,
      // meta data for the output html document
      documentData: {
        name: "newDocument",
        header: "Custom Page"
      },
      //list of menus
      menus: {
        customElementView: false,
        settingMenuView: false,
        codeSettings: false
      },
      //imported objects
      templates,
      customElements,
      styledTemplates
    };
  },
  watch: {
    //changes the template text when current style is updated
    currentStyleTemplate: function(){
      this.styleTemplateText = this.styledTemplates[this.currentStyleTemplate.trim()];
    }
  },
  computed: {
    // updates output window when editor text is updated
    fixedMarkedText: function(e) {
      let head = `<title>${this.documentData.header}</title>`;
      this.markedText = updatedCustom(
        this.editorText,
        head,
        this.styleTemplateText
      );
      return this.markedText;
    },
  },
  mounted() {
      // get previous sesssion information from storage
    let previousSessionFetch = localStorage.getItem("editorText");
    // check if the previous session had any data
    if (previousSessionFetch) {
        // get the user to confirm the load
        // todo replace with custom confirm box
      let userConfirm = confirm(
        "Previous session found, would you like to load the data?"
      );
      // if user wants the previous data load it into the editor
      if (userConfirm) {
        this.editorText = previousSessionFetch;
      }
    }
    //events dispatched from custom marker for meta tags
    document.querySelector('body').addEventListener('meta-trigger', (e)=>{
      switch(e.detail.type){
        case 'type': this.changeStyledTemplate(e.detail.data); break;
        case 'docname': this.updateDocName(e.detail.data); break;
        case 'title': this.updatePageTitle(e.detail.data); break;
      }
    })
  },
  methods: {
    //sets a timer so that updates don't happen to quickly
    update(e) {
        // if clock is not null the clock needs to be cleared
      if (this.updateClock) {
        clearTimeout(this.updateClock);
      }
      // create a new clock 
      this.updateClock = setTimeout(() => {
        this.editorText = e.target.value;
        // set updated editor text to the new value
        localStorage.setItem("editorText", this.editorText);
      }, 300);
    },
    // toggles the code menu and the settings menu
    toggleMenu(e) {
      if (e.target.id === "settings") {
        this.menus.settingMenuView = !this.menus.settingMenuView;
        this.menus.codeSettings = false;
      }
      if (e.target.id === "code") {
        this.menus.codeSettings = !this.menus.codeSettings;
        this.menus.settingMenuView = false;
      }
    },
    // opens the custom element viewer
    toggleCustomView() {
      this.menus.customElementView = !this.menus.customElementView;
    },
    // menu item to that sets the css for the page
    changeStyledTemplate(value) {
      this.currentStyleTemplate = value;
      //styleTemplateText = [value];
      //this.update(this.editorText);
    },
    // pregenerated page layouts
    changeTextTemplate(value) {
      this.currentTextTemplate = value;
      this.editorText = templates[value];
    },
    // sets the name of the html doc
    updateDocName(value) {
      this.documentData.name = value;
    },
    // sets the page title for the html page
    updatePageTitle(value) {
      this.documentData.header = value;
    },
    // creates and downloads the html when the setting button is clicked
    generateHTML() {
      let text = this.markedText.slice();
      // create a file in the browser
      let file = new File([text], {
        type: "text/plain;charset=utf-8"
      });
      // save the created file
      saveAs(file, this.documentData.name + ".html");
    },
    downloadText() {
      // properly format text file for windows
      let formatedText = this.editorText.replace(/\n/g, "\r\n");
      //create a file in the browser
      let file = new File([formatedText], {
        type: "text/plain;charset=utf-8"
      });
      //save the created file
      saveAs(file, this.documentData.name + ".txt");
    }
  },
  components: {
    mdViewer,
    mdEditor,
    banner,
    settingMenu,
    customViewer,
    codeMenu,
  },
  template: `
        <main>
            <banner :onClick="toggleMenu"/>
            <div class='page-wrapper'>
                <mdEditor :change="update" :data="editorText" />
                <mdViewer :data="fixedMarkedText"/>
                <settingMenu 
                v-if="menus.settingMenuView" 
                :current="currentStyleTemplate"
                :docdata='documentData' 
                :styled='this.styledTemplates' 
                :text='templates' 
                :handle='{generateHTML}' 
                @changeDocTitle="updatePageTitle"
                @changeDocName="updateDocName"
                @changeTextTemplate="changeTextTemplate"
                @changeStyledTemplate="changeStyledTemplate"
                @downloadText="downloadText"
                />
                <codeMenu 
                v-if="menus.codeSettings"
                @view-elements="toggleCustomView"

                />
            </div>
                <customViewer 
                v-if='menus.customElementView' 
                :elements='customElements' 
                :toggle='toggleCustomView'
                />
        </main>
    `
};
