<template>
    <div class="header">
        <router-link to="/">Real Estate</router-link>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
    .header {
        height: 80px;
        width: 100%;
        padding-left: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 10px;
        -webkit-box-shadow:0px 1px 1px #e2e2e2;
        -moz-box-shadow:0px 1px 1px #e2e2e2;
        box-shadow:0px 1px 1px #e2e2e2;
    }
    .header > a {
        font-size: 20px;
        font-weight: bold;
        color: black;
        text-decoration: none;
    }
</style>