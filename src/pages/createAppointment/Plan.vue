<template>
    <div>
        <div v-if="loading">
            Calculating travel distance and durations...
        </div>
        <div v-else>
            <p class="info">Plan Info:</p>
            <div>
                Distance between agency and appointment location is <strong>{{ this.distanceTo }} (~{{ this.durationToText }} drive)</strong>
            </div>
            <div>
                Estimated time to leave office: <strong>{{ this.timeToLeaveText }}</strong>
            </div>
            <div>
                Appointment duration: <strong>1 hour</strong>
            </div>
            <div>
                Estimated time to back at office: <strong>{{ this.timeToBeBackText }}</strong>
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