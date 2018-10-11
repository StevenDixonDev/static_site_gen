
export default {
    props: ['elements'],
    template: `
    <div>
        <p v-for="keys in Object.keys(elements)"> ::: {{keys}} :::</p>
    </div>
    `
}