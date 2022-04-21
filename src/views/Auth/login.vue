<script setup lang="ts">
import { login } from '@/utils/user'
import store from '@/utils/store'
import { CacheEnum } from '@/enum/cacheEnum'

const username = ref(store.get(CacheEnum.USERNAME) ?? '')
const password = ref('')
const accept = ref(false)

const onSubmit = () => {
    login(username.value, password.value, accept.value).then(null, error => {
        console.log(error)
    })
}

const onReset = () => {
    username.value = ''
    password.value = ''
}
</script>

<template>
    <div class="q-pa-md login-view">
        <q-card class="my-card">
            <span class="title">登录框</span>
            <q-card-section>
                <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md form"
                >
                    <q-input
                        filled
                        v-model="username"
                        label="用户名"
                        lazy-rules
                        :rules="[
                            val => (val && val.length > 0) || '请输入用户名'
                        ]"
                    />

                    <q-input
                        filled
                        v-model="password"
                        label="密码"
                        lazy-rules
                        :rules="[
                            val => (val && val.length > 0) || '请输入密码'
                        ]"
                    />

                    <q-toggle v-model="accept" label="记得我" />

                    <div>
                        <q-btn
                            label="登录"
                            type="submit"
                            color="primary"
                            class="full-width"
                        />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>

<style lang="scss">
.login-view {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px;
    }

    .form {
        width: 360px;
    }
}

@media screen and(max-height: 420px) {
    .login-view {
        .title {
            display: none;
        }
    }
}
</style>
