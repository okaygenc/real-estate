<template>
    <div>
        <span class="badge badge-secondary" v-if="new Date(date) <= new Date()">
            Passive
        </span>
        <span class="badge badge-success" v-else>
            Active
        </span>
    </div>
</template>

<script>
export default {
    name: "appointmentStatus",
    props: ["date"]
}
</script>