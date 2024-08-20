<template>
    <v-card title="Approbation" flat>
        <!-- <v-container>            -->
        <!-- <template v-slot:text>
            <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                hide-details single-line></v-text-field>
        </template> -->
        <v-data-table v-model="selectedTimesheets" :headers="headers" :items="fetchedTimesheets" item-value="employee"
            item-selectable="selectable" return-object show-select hover>
            <template v-slot:header.data-table-select="{ allSelected, selectAll, someSelected }">
                <v-checkbox-btn :indeterminate="someSelected && !allSelected" :model-value="allSelected" color="primary"
                    @update:model-value="selectAll(!allSelected)"></v-checkbox-btn>
            </template>

            <template v-slot:item.data-table-select="{ internalItem, isSelected, toggleSelect }">
                <v-checkbox-btn :model-value="isSelected(internalItem)" color="primary"
                    @update:model-value="toggleSelect(internalItem)"></v-checkbox-btn>
            </template>
            <!-- <template v-slot:item.exclusive="{ item }">
                <v-checkbox v-model="item.exclusive" readonly></v-checkbox>
            </template> -->
            <template v-slot:item.worked="{ item }">
                <div class="text-end">
                    <v-chip :color="item.worked == item.working_days ? 'green' : 'red'" :text="item.worked"
                        label></v-chip>
                </div>
            </template>
        </v-data-table>
        <v-btn color="primary" @click="approveSelectedTimesheets">Approve Selected</v-btn>
        <!-- </v-container> -->

    </v-card>
</template>

<script setup>

import { ref, computed, onMounted } from "vue";
import { useTheme } from "vuetify";
import { useAuthStore } from "@/store";
const authStore = useAuthStore();
import { isWeekend, isHoliday } from "@/utils/utils"; // Assume you have a utility to check holidays
import { useRouter } from "vue-router";
const theme = useTheme();
import { useApprobationStore } from "@/store";
const router = useRouter();
const approbationStore = useApprobationStore();
import { useField, useForm, ErrorMessage } from "vee-validate";
import { NavigationFailureType, isNavigationFailure } from "vue-router";
const search = ref(''); //
const selectedTimesheets = ref([]);
const fetchedTimesheets = ref([]);
const approvedTimesheets = ref([]);
const headers = [
    { title: 'Employee', key: 'employee' },
    { title: 'TimesheetID', key: 'timesheet_id' },
    { title: 'Date', key: 'date' },
    { title: 'Month', key: 'month' },
    { title: 'Project', key: 'project' },
    { title: 'Worked Days', key: 'worked' },
    { title: 'Working Days', key: 'working_days' },
    { title: 'Actions', key: 'actions', sortable: false },
];

onMounted(async () => {
    await fetchTimesheets();
});

async function fetchTimesheets() {
    try {
        fetchedTimesheets.value = [];
        const user_id = localStorage.getItem('user_id');
        if (!user_id || user_id === '') {
            alert("User not logged in");
            return;
        }
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await approbationStore.getTimesheetsByMonth(month, user_id, token);
        for (const timesheet of response) {
            fetchedTimesheets.value.push({
                employee: timesheet.first_name + ' ' + timesheet.last_name,
                timesheet_id: timesheet.id,
                date: timesheet.date,
                month: timesheet.month,
                project: timesheet.project,
                worked: `${timesheet.worked_days}`,
                working_days: timesheet.working_days,
            })
        }
        // console.log('Timesheets response:', fetchedTimesheets.value);
    } catch (error) {
        console.error('Error fetching timesheets:', error);
        // Handle the error, e.g., redirect to login page or show an error message
    }
}

async function approveSelectedTimesheets() {
    try {
        const user_id = localStorage.getItem('user_id');
        if (!user_id || user_id === '') {
            alert("User not logged in");
            return;
        }
        const date = new Date().toISOString(); // Get the current date as ISO string
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        // selectedTimesheets.value = selectedTimesheets.value.filter(timesheet => timesheet.worked == timesheet.working_days);
        // console.log('Selected timesheets:', selectedTimesheets.value);
        for (const timesheet of selectedTimesheets.value) {
            // console.log('Selected timesheets:', timesheet.value);
            const response = await approbationStore.saveApprobation(token, {
                // approval_id: parseInt(timesheet.timesheet_id),
                supervisor_id: parseInt(user_id),
                approval_date: date,
                timesheet_id: parseInt(timesheet.timesheet_id),
                approved: true
            });
            // console.log('Approbation response:', response);
        }
        alert("Timesheets approved successfully");
        // await fetchTimesheets(); // Refresh the timesheets list

        selectedTimesheets.value = [];
        authStore.userLogout();
        // router.push('/');

    } catch (error) {
        console.error('Approval error:', error);
        if (error.response && error.response.data) {
            alert("Approval failed: " + error.response.data.detail);
        } else {
            alert("Approval failed: An unexpected error occurred");
        }
    }

}

async function approveTimesheet(timesheet_id, supervisor_id, approved, approval_date) {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket("ws://localhost:8765");

        ws.onopen = () => {
            ws.send(JSON.stringify({ action: "approve_timesheet", timesheet_id, supervisor_id, approved, approval_date }));
        };

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            resolve(response);
            ws.close();
        };

        ws.onerror = (error) => {
            reject(error);
        };
    });
}
</script>