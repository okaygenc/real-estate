<template>
    <div class="container-fluid">
        <div class="row">
            <Header />
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
import Header from './components/Header';
export default {
    name: 'App',
    components: {
        Menu,
        Header
    }
}
</script>