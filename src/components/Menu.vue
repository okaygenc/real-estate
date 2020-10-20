<template>
    <ul class="list-group">
        <router-link v-for="menu in menus" :menu="menu.path"
                    :key="menu.path" :to="menu.path" class="list-group-item"
                    :class="currentRoute == menu.path && 'active'">
            {{menu.text}}
        </router-link>
    </ul>
</template>
<script>
export default {
    name: 'leftMenu',
    data() {
        return {
        menus: [
            {path: '/', text: 'Home'},
            {path: '/appointments', text: 'Appointments'},
            {path: '/create-appointment', text: 'Create Appointment'},
        ],
        currentRoute: '',
        }
    },
    watch:{
        $route(to) {
            this.currentRoute = to.fullPath;
        }
    },
    mounted() {
        this.currentRoute = this.$router.currentRoute.fullPath;
    }
}
</script>