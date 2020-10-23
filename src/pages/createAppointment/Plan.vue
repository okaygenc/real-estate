<template>
    <div class="card mb-4">
        <div class="card-body">
            <div v-if="loading">
                Calculating travel distance and durations...
            </div>
            <div v-else>
                <h5 class="card-title">Appointment Plan:</h5>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Distance between agency and appointment
                        <span class="badge badge-primary badge-pill">{{ this.distanceTo }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Duration from agency to appointment
                        <span class="badge badge-primary badge-pill">{{ this.durationToText }} drive</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Agent should leave office at 
                        <span class="badge badge-primary badge-pill">{{ this.timeToLeaveText }}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Appointment duration
                        <span class="badge badge-primary badge-pill">1 hour</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Agent will be back at office by
                        <span class="badge badge-primary badge-pill">{{ this.timeToBeBackText }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
const OFFICE_POSTCODE = "CM2 7PJ";

export default {
    props: ["postCode", "date"],
    mounted() {
        this.refresh();
    },
    data() {
        return {
            loading: true,
            distanceTo: null,
            durationToText: null,
            timeToLeaveText: null,
            timeToBeBackText: null
        };
    },
    watch: {
        //
        postCode() { this.refresh() },
        date() { this.refresh() },
    },
    methods: {
        refresh() {
            this.loading = true;

            const office = `${OFFICE_POSTCODE}, United Kingdom`;
            const appointment = `${this.postCode}, United Kingdom`;

            const service = new window.google.maps.DistanceMatrixService();
            
            service.getDistanceMatrix({
                origins: [office, appointment],
                destinations: [appointment, office],
                travelMode: 'DRIVING',
            }, ({ rows }) => {
                this.loading = false;

                // From office to appointment seconds
                const durationTo = rows[0].elements[0].duration;
                // From appointment to office seconds
                const durationFrom = rows[1].elements[1].duration;

                const appointmentTimestamp = new Date(this.date).getTime();
                const timeToLeaveTimestamp = appointmentTimestamp - durationTo.value * 1000;
                const timeToBeBackTimestamp = appointmentTimestamp + 1000 * 60 * 60 + durationFrom.value * 1000; // Add 1 hour for appointment and the way back

                this.distanceTo = rows[0].elements[0].distance.text;
                this.durationToText = durationTo.text;
                this.timeToLeaveText = new Date(timeToLeaveTimestamp).toLocaleTimeString();
                this.timeToBeBackText = new Date(timeToBeBackTimestamp).toLocaleTimeString();
            });
        }
    }
}
</script>
<style scoped>
    .info {
        font-size: 18px;
        font-weight: bold;
    }
</style>