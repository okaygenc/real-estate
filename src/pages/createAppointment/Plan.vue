<template>
    <div>
        <div v-if="loading">
            Calculating travel distance and durations...
        </div>
        <div v-else>
            <div>
                Distance between agency and appointment location is <strong>3km (~17 minutes by car)</strong>
            </div>
            <div>
                Estimated time to leave office: <strong>17:30</strong>
            </div>
            <div>
                Appointment duration: <strong>1 hour</strong>
            </div>
            <div>
                Estimated time to back at office: <strong>19:30</strong>
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
            distance: null,
            durationTo: null,
            durationFrom: null
        };
    },
    watch() {
        return {
            postCode: this.refresh,
            date: this.refresh
        };
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

                this.distanceTo = rows[0].elements[0].distance.text;
                this.durationTo = rows[0].elements[0].duration.value;
                this.durationFrom = rows[0].elements[0].duration.value;
            });
            console.log(office, appointment)
        }
    }
}
</script>