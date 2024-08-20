<template>
  <v-main>
    <v-app-bar app>
      <v-toolbar-title>Time Sheet</v-toolbar-title>
      <v-spacer></v-spacer>
      <LogoutButton />
    </v-app-bar>
    <!-- <h1 class="text-h4 mb-5">Time Sheet</h1> -->

    <v-container>
      <v-row>
        <!-- Date Picker -->
        <v-col cols="12" md="4">
          <v-date-picker show-adjacent-months multiple :dark="theme.global.current.value.dark" color="primary"
            v-model="newEntry.dates" scrollable></v-date-picker>
        </v-col>

        <!-- Time Entries Table -->
        <v-col cols="12" md="8">
          <v-data-table :headers="headers" :items="timeEntries" class="elevation-1 mt-5">
            <template #item.actions="{ item }">
              <v-icon small @click="deleteEntry(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>

          <!-- Buttons -->
          <v-row justify="end" class="mt-4">
            <v-col cols="auto">
              <v-btn height="72" min-width="164" color="primary" type="submit" @click="addTimeEntry"
                :disabled="!formIsValid">
                Add Entry
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn height="72" min-width="164" @click="saveTimesheet">
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useTheme } from "vuetify";
import { isWeekend, isHoliday } from "@/utils/utils"; // Assume you have a utility to check holidays
// import LogoutButton from "@/components/LogoutButton.vue";
import LogoutButton from '@/components/Logout.vue';
import { useTimesheetStore } from "@/store";
const router = useRouter();
import { useField, useForm, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
const theme = useTheme();
import { NavigationFailureType, isNavigationFailure } from "vue-router";

const newEntry = ref({
  dates: [],
});

let working_days = 0

const timeEntries = ref([]);

const projects = ref([]);

const headers = [
  { title: "Dates", key: "date" },
  { title: "Worked Days", key: "worked_days" },
  { title: "Biz days", key: "working_days", sortable: false },
  { title: "Actions", key: "actions", sortable: false },

];

const form = ref(null);
const dateMenu = ref(false);

const formIsValid = computed(() => {
  return newEntry.value.dates.length > 0;
});

function formatDate(date) {
  if (!date) return null;
  const [year, month, day] = date.split('-');
  return `${year}-${month}-${day}`;
}

function formatDateForDisplay(date) {
  if (!date) return null;
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

function addTimeEntry() {
  if (formIsValid.value) {
    let worked_days = 0;
    let dateFormatted = new Date().toLocaleDateString();

    newEntry.value.dates.forEach((date) => {
      worked_days++;
    });

    timeEntries.value.push({
      date: dateFormatted,
      worked_days: worked_days,
      working_days: working_days
    });

    if (form.value) {
      form.value.reset();
    }
    newEntry.value = { dates: [] };
  }
}

function deleteEntry(item) {
  const index = timeEntries.value.indexOf(item);
  timeEntries.value.splice(index, 1);
}

function onDateChange(dates) {
  newEntry.value.dates = dates;
}

function allowedDates(date) {
  return !isWeekend(date) && !isHoliday(date);
}


async function saveTimesheet() {
  const user_id = JSON.parse(localStorage.getItem('user_id'));
  if (!user_id || user_id === '') {
    alert("User not logged in");
    return;
  }
  const date = new Date(); // Get the current date
  const month = date.toLocaleString('default', { month: 'long' }); //

  try {
    const timesheetStore = useTimesheetStore();
    const response = await timesheetStore.saveTimesheet({
      user_id: user_id,
      date: new Date().toISOString().split('T')[0],
      worked_days: timeEntries.value[0].worked_days,
      working_days: timeEntries.value[0].working_days,
      month: month,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
    })

    alert("Timesheet saved successfully");
    timeEntries.value = [];

  } catch (error) {
    console.error('Registration error:', error);
    if (error.response && error.response.data) {
      alert("Registration failed: " + error.response.data.detail);
    } else {
      alert("Registration failed: An unexpected error occurred");
    }
  }
}

async function submitTimesheet(user_id, date, worked, month) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "submit_timesheet", user_id, date, worked, month }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      resolve(response);
      ws.close();
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      alert("Failed to connect to the WebSocket server.");
      reject(error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  });
}

async function fetchProjects() {
  // return new Promise((resolve, reject) => {
  //   const ws = new WebSocket("ws://localhost:8765");

  //   ws.onopen = () => {
  //     ws.send(JSON.stringify({ action: "get_projects" }));
  //   };

  //   ws.onmessage = (event) => {
  //     const response = JSON.parse(event.data);
  //     if (response.success) {
  //       projects.value = response.projects;
  //     }
  //     resolve(response);
  //     ws.close();
  //   };

  //   ws.onerror = (error) => {
  //     reject(error);
  //   };
  // });
}

onMounted(async () => {
  // await fetchProjects();
  working_days = JSON.parse(localStorage.getItem('working_days'));
});
</script>