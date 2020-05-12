<template>
    <div :class="scrolled | setClassForBody(moreClass)">
        <slot/>
    </div>
</template>

<script>
    import './index.scss';

    export default {
        name: "PopUpBody",
        props: {
            moreClass: { type: String, default: '' }, /// доп. класс
            scrolled: { type: Boolean, default: true } /// нужно ли разрешать прокрутку содержимого
        },
        filters: {
            /// setClassForBody - устанавливаем класс бля body у popup
            setClassForBody: (scrolled, moreClass) => `popup-body${scrolled ? '' : ' no-scroll'}${moreClass !== '' ? ` ${moreClass}` : ''}`,
            /*----------------------*/
        }
    }
</script>
