<template>
    <div ref="map" class="map"></div>
</template>

<script>
export default {
    mounted() {
        this.map = new window.google.maps.Map(this.$refs["map"], {
            center: {
                lat: 51.72934394550386,
                lng: 0.47928113109686254
            },
            zoom: 14
        });

        this.marker = new window.google.maps.Marker({
            position: this.map.center,
            map: this.map,
            title: "Drag!",
            draggable: true
        });

        window.google.maps.event.addListener(this.marker, 'dragend', () => {
            const position = this.marker.getPosition();
            const lat = position.lat();
            const lng = position.lng();

            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode(
                { location: { lat, lng } }, 
                (results) => {
                    try {
                        const postCode = results[0].address_components
                            .filter(c => c.types.indexOf('postal_code') > -1)[0]
                            .long_name;

                        const country = results[0].address_components
                            .filter(c => c.types.indexOf('country') > -1)[0]
                            .short_name;

                        if (country !== "GB") {
                            this.$swal({icon: 'warning', text: 'You can not select any location outside of United Kingdom'});
                        } else {
                            return this.$emit("postCodeReady", postCode);
                        }
                    } catch (e) {
                        console.error(e);
                        this.$swal({icon: 'warning', text: 'No results found.'});
                    }

                    this.$emit("postCodeReady", null);
                }
            );
        });
    },
    data() {
        return {
            map: null,
            marker: null
        }
    }
}
</script>
<style scoped>
    .map {
        height: 300px;
        margin-bottom: 30px;
    }
</style>