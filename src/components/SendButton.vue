<template>
    <div class="row">
        <div class="col-lg-12">
            <button type="submit" class="btn btn-primary btn-lg" @click="sendForm">{{text}}</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sendButton',
    props: ['text'],
    methods: {
        sendForm(){
            this.$emit("sendForm");
        }
    }
}
</script>