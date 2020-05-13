<template>
  <header class="header" ref="header">
    {{/*
    Header top
    --
    Выбор языка
    Попап авторизации и регистрации
    Попап сравнений
    */}}
    <HeaderTop/>
    {{/* Header top - END */}}

    {{/* Header middle */}}
    <HeaderMiddle/>
    {{/* Header middle - END */}}

    {{/* Header bottom */}}
    <HeaderBottom/>
    {{/* Header bottom - END */}}
  </header>
</template>

<script>
    import "./index.scss";

    import HeaderTop from "./components/HeaderTop/HeaderTop";
    import HeaderMiddle from "./components/HeaderMiddle/HeaderMiddle";
    import HeaderBottom from "./components/HeaderBottom/HeaderBottom";

    export default {
        name: "Header",
        components: {
            HeaderTop,
            HeaderMiddle,
            HeaderBottom
        }
    };
</script>
