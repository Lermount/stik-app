<template>
    <form class="form">
        <i class="logo"></i>
        <!--Можно было бы еще сделать отдельные компоненты username и password, но так быстрее-->
        <div class="username">
            <input class="username-input" :class="{ 'attention': usernameError }" placeholder="Введите Email"
                v-model="username" type="text">
            <p v-if="usernameError" class="error">{{ usernameErrorText }}</p>
        </div>

        <div class="password">
            <input class="password-input" :class="{ 'attention': passwordError }" placeholder="Введите пароль"
                v-model="password" :type="passwordIsVisible">
            <i class="password-icon" :class="{ 'passwordVisible': passwordIsVisible === 'text' }"
                @click="showPassword"></i>
            <p v-if="passwordError" class="error">{{ passwordErrorText }}</p>
            <p v-if="commonError" class="error">{{ commonErrorText }}</p>
        </div>
        <Button :btnText="'Войти'" @click.prevent="login" />
    </form>
</template>
<script>
import axios from "axios";
import Button from '@/components/shtab-button.vue';

export default {
    components: { Button },

    data: () => ({
        username: '',
        password: '',
        passwordIsVisible: 'password',
        commonError: false,
        commonErrorText: false,
        usernameError: false,
        usernameErrorText: '',
        passwordError: false,
        passwordErrorText: '',
    }),

    methods: {
        //отправляем запрос на сервер
        login() {
            axios.post("https://my.shtab.app/api/users/user/login/", {
                username: this.username, //"didayi3273@satedly.com",
                password: this.password //"test1234"
            })
                .then(response => {
                    const token = response.data.token; //получаем токен
                    console.log(response.data)
                    this.$store.commit('increment', {
                        userToken: token //Запписываем токен в Vuex
                    })
                    this.$router.push({ name: 'User', params: { id: response.data.user.id } }) //Переходим на страницу профиля
                })
                .catch(error => { //обрабатываем ошибки
                    if (error.response.data) {
                        if (error.response.data.username) {
                            this.usernameError = true, //выводим ошибки для поля userName
                                this.usernameErrorText = error?.response?.data?.username?.[0] ?? '' //текст ошибки
                        } else {
                            this.usernameError = false
                        }
                        if (error.response.data.password) {
                            this.passwordError = true,  //выводим ошибки для поля password
                                this.passwordErrorText = error?.response?.data?.password?.[0] ?? '' //текст ошибки
                        } else {
                            this.passwordError = false
                        }
                        if (error.response.data.non_field_errors) {
                            this.commonError = true //выводим ошибку, когда оба поля незаполнены
                            this.commonErrorText = error?.response?.data?.non_field_errors?.[0] ?? '' //текст ошибки
                        } else {
                            this.commonError = false
                        }
                    }
                });
        },

        showPassword() { //Скрыть или показать пароль
            if (this.passwordIsVisible === 'password') {
                this.passwordIsVisible = 'text'
            } else {
                this.passwordIsVisible = 'password'
            }
        },
    }
}
</script>
<style scoped>
.logo {
    margin: 0 auto;
    margin-bottom: 20px;
    height: 52px;
    width: 120px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 92 39' fill='none' class='header__logo' data-v-c6b3f590=''%3E%3Cpath fill='%23000' d='M59.439 22.448H51.49v16.474h7.948V22.448zm.018-9.57h-7.965v6.798h7.965v-6.798zm-18.463-6.21h-8.013v13.008h16.027v-6.798h-8.014v-6.21zM32.973 22.45h8.021v7.108c.035 1.276.532 1.64 2.084 1.64l5.95-.01v7.736h-8.055l-1.65-.006c-3.402.006-6.35-3.035-6.35-6.78V22.45zm-18.405 6.746h15.788c0-4.102-3.18-6.61-6.758-6.72l-7.29-.025c-.99 0-1.825-.406-1.829-1.384 0-1.07.843-1.39 1.781-1.39h14.11v-6.8H14.625c-4.474 0-8.101 3.762-8.101 8.263 0 4.5 3.57 8.056 8.044 8.056zm6.34 2.793l-15.174-.007L.2 38.894l20.71.007c5.939 0 9.088-2.31 9.447-6.93h-9.048a5.654 5.654 0 01-.4.013m41.089 6.938h7.881V.04h-7.881v38.882zM77.497 22.47h-5.236v6.74l8.589 9.69h10.796L77.497 22.47zm.032-15.802L72.26 12.84v6.81h5.268L88.58 6.668H77.529z' data-v-c6b3f590=''%3E%3C/path%3E%3C/svg%3E");
}

.form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    padding: 10px 40px;
    border-radius: 15px;
    border: 1px solid #000
}

.username-input,
.password-input {
    width: calc(100% - 40px);
    padding: 10px 30px 10px 10px;
    border-radius: 11px;
    border: 1px solid #000;
    font-family: Gilroy-Medium;
    color: #000;
    margin-bottom: 20px;
}

.username-input::placeholder,
.password-input::placeholder {
    font-family: Gilroy-Regular;
    color: #333;
}

.username,
.password {
    position: relative;
}

.password-icon {
    position: absolute;
    width: 21px;
    height: 11.78px;
    right: 10px;
    top: 14px;
    cursor: pointer;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg width='21' height='12' viewBox='0 0 21 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.163215 5.51773C0.662584 4.9962 1.18537 4.52154 1.72712 4.09491C4.17697 2.16623 7.08585 1.13589 10.0848 1.08415C11.2061 1.06479 12.3381 1.18246 13.4613 1.4413L12.4523 2.31406C11.6694 2.17865 10.8855 2.11834 10.1086 2.13179C7.40646 2.1785 4.77392 3.11586 2.54419 4.87144C2.14702 5.18409 1.76455 5.52039 1.39882 5.87961C2.09455 6.57749 2.86856 7.18062 3.69776 7.68707C4.20841 7.99913 4.73974 8.27438 5.28645 8.51282L4.38718 9.29068C3.91173 9.06835 3.44825 8.82 2.99947 8.54579C1.94963 7.90452 0.980629 7.12238 0.131769 6.20275C-0.0577589 5.99624 -0.0389599 5.70458 0.163215 5.51773ZM16.4115 0L17.4186 0.871135L4.80554 11.7815L3.79825 10.9101L16.4115 0ZM16.7003 2.60306C17.4562 2.97661 18.1986 3.42024 18.921 3.93556C19.5836 4.40801 20.2258 4.93678 20.8419 5.52246C21.0407 5.71124 21.0504 5.99122 20.8805 6.18871C20.1746 7.05113 19.3636 7.78759 18.4762 8.40062C16.2558 9.93372 13.5589 10.6885 10.8269 10.6992C9.78197 10.7032 9.15238 10.2348 8.12236 10.0227L8.7282 9.49897C9.42291 9.60318 10.1239 9.65403 10.8221 9.65137C13.2866 9.64191 15.7189 8.96132 17.7206 7.57886C18.4039 7.10715 19.0376 6.5531 19.6053 5.91523C19.129 5.4858 18.6436 5.09584 18.1513 4.74475C17.3899 4.20179 16.606 3.7456 15.8088 3.37397L16.7003 2.60306ZM10.5001 2.682C10.9554 2.682 11.3915 2.7531 11.7948 2.88289L10.8226 3.72387C10.7168 3.71219 10.6093 3.70628 10.5003 3.70628C9.80282 3.70628 9.17152 3.95078 8.71453 4.34607C8.25754 4.74135 7.97488 5.28757 7.97488 5.89084C7.97488 5.9853 7.98171 6.07829 7.99521 6.16949L7.02296 7.01077C6.87274 6.66205 6.79071 6.28465 6.79071 5.89084C6.79071 5.00463 7.206 4.20268 7.87729 3.62187C8.54842 3.04106 9.47572 2.682 10.5001 2.682ZM14.0331 4.91017C14.1476 5.21912 14.2095 5.54877 14.2095 5.89084C14.2095 6.77691 13.7942 7.57901 13.1231 8.15967C12.4516 8.74033 11.5243 9.09939 10.5001 9.09939C10.1048 9.09939 9.72386 9.04603 9.36651 8.94669L10.3772 8.07245C10.4179 8.07422 10.4589 8.07511 10.5001 8.07511C11.1975 8.07511 11.8288 7.8309 12.2858 7.43562C12.7428 7.04033 13.0255 6.49412 13.0255 5.89099C13.0255 5.85537 13.0245 5.82003 13.0224 5.78456L14.0331 4.91017Z' fill='%23A4A4A6'/%3E%3C/svg%3E%0A");
}

.passwordVisible {
    background-image: url("data:image/svg+xml,%3Csvg width='21' height='10' viewBox='0 0 21 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.16272 4.29373C0.661755 3.78874 1.18472 3.32952 1.72648 2.91608C4.17722 1.04917 7.08598 0.0520564 10.0853 0.00198599C13.0778 -0.0480844 16.1472 0.84603 18.921 2.76158C19.5841 3.21937 20.225 3.73008 20.8419 4.29803C21.0402 4.48114 21.0504 4.75152 20.8812 4.94322C20.1754 5.77725 19.3636 6.49111 18.4766 7.08337C16.2566 8.56688 13.5598 9.29648 10.827 9.30793C8.10456 9.31794 5.3479 8.61266 2.9997 7.22357C1.95036 6.6027 0.981343 5.84592 0.131957 4.95609C-0.0577443 4.75581 -0.038945 4.47399 0.16272 4.29373ZM10.5006 1.54845C11.5243 1.54845 12.4523 1.89608 13.124 2.4583C13.7956 3.02052 14.2109 3.79589 14.2109 4.65424C14.2109 5.51116 13.7956 6.28797 13.124 6.85019C12.4523 7.4124 11.526 7.76004 10.5006 7.76004C9.4769 7.76004 8.5489 7.4124 7.87726 6.85019C7.20561 6.28797 6.79032 5.51259 6.79032 4.65424C6.79032 3.79732 7.20561 3.02052 7.87726 2.4583C8.5489 1.89608 9.4769 1.54845 10.5006 1.54845ZM12.2865 3.15928C11.8302 2.77732 11.1979 2.53984 10.5006 2.53984C9.80333 2.53984 9.17099 2.77589 8.71468 3.15928C8.25837 3.54125 7.97467 4.07056 7.97467 4.65424C7.97467 5.23792 8.25666 5.76723 8.71468 6.1492C9.17099 6.53117 9.80333 6.76864 10.5006 6.76864C11.1979 6.76864 11.8302 6.5326 12.2865 6.1492C12.7429 5.76723 13.0265 5.23792 13.0265 4.65424C13.0265 4.07056 12.7429 3.54125 12.2865 3.15928ZM2.5451 3.66714C2.14861 3.96899 1.76578 4.29517 1.40005 4.6428C2.09563 5.31803 2.86981 5.90171 3.69869 6.3924C5.84181 7.65846 8.34895 8.30223 10.8236 8.29364C13.288 8.28363 15.72 7.62556 17.7229 6.28797C18.4066 5.83161 19.0389 5.29514 19.608 4.67856C19.1312 4.26226 18.6458 3.88602 18.1536 3.54554C15.6089 1.79021 12.818 0.971921 10.1092 1.01627C7.40728 1.06205 4.77367 1.96904 2.5451 3.66714Z' fill='%23A4A4A6'/%3E%3C/svg%3E%0A");
}

.error {
    position: absolute;
    top: 40px;
    left: 10px;
    font-family: Gilroy-Regular;
    color: red;
}

.attention {
    border-color: red
}

@media(max-width: 710px) {
    .form {
        width: 90%;
        padding: 10px;
    }
}
</style>