<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                Header
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <Menu />
            </div>
            <div class="col-lg-9">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Menu from './components/Menu';
export default {
    name: 'App',
    components: {
        Menu
    }
}
</script>