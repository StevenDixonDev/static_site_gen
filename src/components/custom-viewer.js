
export default {
    props: ['elements', 'toggle'],
    template: `
    <div id='custom-viewer'>
        <div class="custom-header">
        <p class='exit' @click='toggle'>X</p>
        </div>
        <div class="custom-wrapper">
        <p v-for="keys in Object.keys(elements)"> {{keys}}</p>
        </div>
    </div>
    `
}