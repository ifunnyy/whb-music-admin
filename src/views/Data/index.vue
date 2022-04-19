<script setup lang="ts">
import { get } from '@/apis/hello'

const count = ref(0)
const message = ref('音乐盒子')

const load = async () => {
    // message.value = '已请求'
    const res = await get()
    message.value = res.data.name
}
</script>

<template>
    <div class="data-container">
        <h1>{{ message }}</h1>
        <div class="button-container">
            <q-btn color="primary" @click="count++">点击次数 {{ count }}</q-btn>
            <q-btn color="primary" @click="load">请求接口</q-btn>
        </div>
    </div>
</template>

<style lang="scss">
.data-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .button-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .q-btn {
            margin-bottom: 20px;
        }
    }
}
</style>
