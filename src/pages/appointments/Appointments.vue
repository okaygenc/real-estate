<template>
    <div>
        Appointments
        {{allRecords.length}}
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'appointments',
    methods: mapActions(['fetchRecords']),
    computed: mapGetters(['allRecords']),
    created() {
        this.fetchRecords();
    }
}
</script>