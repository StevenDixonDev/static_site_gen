export const codeMenu = {
  methods:{
    openElements(e){
        this.$emit('view-elements', e.target.value);
    },
    // v-on:click="handle.toggleCustomView"
},
template: `
<div class="settings">
  <h3>Code Settings</h3>
  <hr />
  <button @click="openElements">View Custom Elements</button>
</div>`
} 