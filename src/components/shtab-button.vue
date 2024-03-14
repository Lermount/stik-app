<template>
    <!--Т.к. кнопка используется в трех местах, вынес ее в отдельный компонент, данные сюда передаем пропсами-->
    <router-link to="/" class="btn">{{ btnText }}</router-link>
</template>
<script>
export default {
    props: {
        btnText: String
    }
}
</script>
<style scoped>
.btn,
.btn:active {
    margin-left: auto;
    width: max-content;
    padding: 10px 20px;
    border: 1px solid #000;
    border-radius: 11px;
    background: #000;
    font-family: Gilroy-Medium;
    color: #fff;
    cursor: pointer;
    transition: .3s linear
}

.btn:hover,
.btn:focus {
    transition: .3s linear;
    background: #fff;
    border-color: #000;
    color: #000;
}
</style>