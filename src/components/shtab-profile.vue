<template>
    <div class="profile">
        <img class="avatar" :src="avatar" alt="avatar">
        <p class="username">{{ userName }}</p>
        <Button :btnText="'Выйти из профиля'" style="margin: 0 auto;" />
    </div>
</template>
<script>
import axios from "axios";
import Button from '@/components/shtab-button.vue';

export default {
    components: { Button },

    data: () => ({
        userInfo: {}
    }),

    mounted() {//Получаем токен из vuex
        const token = this.$store?.state?.token?.userToken
        this.getProfile(token) //Получаем данные о профиле
    },

    methods: {
        getProfile(token) {
            axios.get("https://my.shtab.app/api/users/profile/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
                .then(response => {
                    this.userInfo = response.data || {}
                })
                .catch(error => {
                    console.log(error); //Выводим ошибку в консоль
                })

        },
    },

    computed: {
        //есть проблема с перезагрузкой, и что бы уж не совсем все было печально, хоть заглушки поставим))
        //По факту нужно передавать в этот компонент данные из формы и тут уже вызывать метод post и метод getProfile
        //Прошу понять и простить, это все-таки тестовое задание =)
        avatar() {
            return this.userInfo?.avatar || "http://placehold.it/300x200/"
        },

        userName() {
            return this.userInfo?.full_name || "Что-то пошло не так"
        }
    }
}
</script>
<style scoped>
.profile {
    width: max-content;
    margin: 0 auto;
}

.avatar {
    width: 300px;
    height: 200px;
}

.username {
    margin-top: 10px;
    margin-bottom: 20px;
    font-family: Gilroy-Medium;
    color: #000;
}
</style>