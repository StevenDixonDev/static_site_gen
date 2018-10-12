
export default {
    props: ['elements', 'toggle'],
    template: `
    <div id='custom-viewer'>
        <p v-for="keys in Object.keys(elements)"> ::: {{keys}} :::</p>
        <p class='exit' @click='toggle'>X</p>
    </div>
    `
}