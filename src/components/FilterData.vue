<template>
    <div>
        <button type="button" class="btn btn-success mb-3 mt-3" @click="openFilter('agent')">Filter by Agent</button>
        <button type="button" class="btn btn-success mb-3 mt-3 ml-3" @click="openFilter('date')">Filter by Date</button>
        <div v-if="filterAgent">
            <!-- filter agent name -->
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleFormControlSelect1"><strong>Select Agent</strong></label>
                    <select class="form-control" name="sortAgents" @change="onInput($event)">
                        <option v-for="agent in allAgents.records" :agent="agent" :key="agent.fields.agent_id" :value="agent.id">{{agent.fields.agent_name}} {{agent.fields.agent_surname}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div v-if="filterDate">
            <!-- filter date -->
            <div class="col-lg-4">
                <div class="form-group">
                    <label for="exampleFormControlSelect1"><strong>Select Date</strong></label>
                    <select class="form-control" name="sortDate" @change="onInput($event)">
                        <option value="oldToNew">Old Date to New Date</option>
                        <option value="newToOld"> New Date to Old Date</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'filterData',
    props:['filterAgent', 'filterDate', 'allAgents'],
    methods: {
        onInput() {
            this.$emit('onInput', event)
        },
        openFilter(data) {
            this.$emit('openFilter', data);
        }
    }

}
</script>