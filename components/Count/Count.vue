<template>
    <span :class="moreClass | moreClass">
        <button class="count-btn count-btn-minus"
                @click="minus">-</button>
        <input type="text" class="count-input" v-model="val">
        <button class="count-btn count-btn-plus"
                @click="plus">+</button>
    </span>
</template>

<script>
    import './index.scss';

    export default {
        name: "Count",
        data () {
            return {
                val: this.$props.startValue
            }
        },
        watch: {
            /// val
            val (value) { Number.isInteger(value * 1) && this.$props.callback(value * 1) },
            /*----------------------*/

            /// startValue
            startValue (value) { (Number.isInteger(value * 1) && this.val !== value * 1) && (this.val = value * 1) }
            /*----------------------*/
        },
        props: {
            moreClass: { type: String, default: '' },
            startValue: { type: Number, default: 0 },
            callback: { type: Function, default: () => null }
        },
        filters: {
            /// moreClass
            moreClass: moreClass => `count${moreClass !== '' ? ` ${moreClass}` : ''}`,
            /*----------------------*/
        },
        methods: {
            /// plus
            plus () { this.val++ },
            /*----------------------*/

            /// minus
            minus () { this.val > 1 && (this.val--) },
            /*----------------------*/
        }
    }
</script>
