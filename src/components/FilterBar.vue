<template>
<div class="row">
    <!-- filter by status -->
    <div class="col">
        <div class="form-group">
            <label for="filterStatus">
                <strong>Filter by status</strong>
            </label>

            <select 
                id="filterStatus"
                class="form-control"
                @change="$emit('filter-change', { type: 'status', value: $event.target.value })"
            >
                <option value="">All appointments</option>
                <option value="active">Active</option>
                <option value="passive">Passive</option>
            </select>
        </div>
    </div>
    
    <!-- filter agent name -->
    <div class="col">
        <div class="form-group">
            <label for="filterAgent">
                <strong>Filter by Agent</strong>
            </label>

            <select 
                id="filterAgent"
                class="form-control"
                @change="$emit('filter-change', { type: 'agent', value: $event.target.value })"
            >
                <option value="">All agents</option>
                <option 
                    v-for="agent in agents.records"
                    :agent="agent"
                    :key="agent.fields.agent_id"
                    :value="agent.id"
                >
                    {{agent.fields.agent_name}} {{agent.fields.agent_surname}}
                </option>
            </select>
        </div>
    </div>

    <!-- sorter -->
    <div class="col">
        <div class="form-group">
            <label for="sorter">
                <strong>Sort</strong>
            </label>
            
            <select id="sorter" class="form-control" @change="$emit('sorter-change', $event.target.value)">
                <option value="oldestFirst">Oldest First</option>
                <option value="newestFirst">Newest First</option>
            </select>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'filterBar',
    props: ['agents']
}
</script>