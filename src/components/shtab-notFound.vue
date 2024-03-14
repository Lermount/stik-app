<template>
    <div class="notFound">
        <img src="../../public/images/404.svg" alt="notFound" class="notFoundIcon">
        <Button :btnText="'Вернуться на главную'" style="margin: 0 auto;" />
    </div>
</template>
<script>
import Button from '@/components/shtab-button.vue';

export default {
    components: { Button },
}
</script>
<style scoped>
.notFound {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.notFoundIcon {
    width: 40%;
    margin-bottom: 10px;
}
</style>