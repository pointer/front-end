<template>
  <!-- <div class="pa-4 text-center"> -->
  <div class="d-flex align-center flex-column">
    <!-- <v-btn color="primary" @click="dialog = true">Open User Profile</v-btn> -->
    <!-- <div class="pa-4 text-center"> -->
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <div>
          <v-btn class="text-none font-weight-regular" prepend-icon="mdi-account" text="Edit Profile" variant="tonal"
            v-bind="activatorProps"></v-btn>
        </div>
      </template>
      <!-- <v-dialog v-model="dialog" max-width="600"> -->
      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row dense no-gutters>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.firstName" color="primary" required
                :rules="[(v) => !!v || 'Item is required']" hide-details="auto" label="First name"
                variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.lastName" color="primary" required
                :rules="[(v) => !!v || 'Item is required']" hide-details="auto" label="Last name"
                variant="underlined"></v-text-field>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-row></v-row><v-row></v-row>
          <v-row no-gutters>
            <!-- <v-col cols="12" md="6"> -->
            <v-text-field clearable v-model="user.email" required color="primary"
              :rules="[(v) => !!v || 'Item is required']" hide-details="auto" label="Email" variant="underlined"
              prepend-inner-icon="mdi-email-outline" min-width="350"></v-text-field>
            <!-- </v-col> -->
            <ErrorMessage name="email" />
          </v-row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-row></v-row><v-row></v-row>
          <v-row no-gutters>
            <!-- <v-col cols="12" md="6"> -->
            <v-col class="mt-4 pr-6">
              <v-text-field clearable :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" required
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" class="flex-grow-0 align-self-stretch mx-5"
                @click:append-inner="visible = !visible"></v-text-field>
              <ErrorMessage name="password" />
            </v-col>
            <!-- <v-col cols="12" md="6"> -->
            <v-col class="mt-4">
              <v-text-field clearable :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" required
                :type="visible ? 'text' : 'password'" density="compact" placeholder="Confirm your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" class="flex-grow-0 align-self-stretch mx-5"
                @click:append-inner="visible = !visible">
              </v-text-field>
              <ErrorMessage name="password" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.phone" color="primary" :rules="[(v) => !!v || 'Item is required']"
                required hide-details="auto" label="Tel." variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select clearable :items="['Contract', 'Supervisor', 'Employee']" v-model="user.role" :rules="rules"
                required hide-details="auto" color="primary" label="Role" variant="underlined"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.contractNumber" color="primary" :rules="rules" hide-details="auto"
                required label="Contract number" variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.company" color="primary" label="Company"
                variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.taxNumber" color="primary" label="Tax number"
                variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.client" color="primary" label="Client" required
                variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <!-- <v-select v-model="user.project" :items="projects" item-text="project_name" item-value="project_id"
                label="Project" required></v-select> -->
              <v-combobox clearable chips multiple v-model="user.project" :items="projects" item-text="project_name"
                item-value="project_id" label="Project" required></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.city" color="primary" label="City"
                variant="underlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field clearable v-model="user.rate" color="primary" label="Rate"
                variant="underlined"></v-text-field>
            </v-col>
          </v-row>
          <!-- <v-col cols="12" md="12">
              <v-btn color="primary" type="submit">Update</v-btn>
            </v-col> -->
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-date-input clearable v-model="user.dateStart" color="primary" label="Start Date" required
                variant="underlined"></v-date-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-date-input clearable v-model="user.dateEnd" color="primary" label="End Date" required
                variant="underlined"></v-date-input>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

          <v-btn color="primary" type="submit" text="Save" variant="tonal" @click="updateUser"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useField, useForm, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
const visible = ref(false);
const schema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const { handleSubmit, handleReset } = useForm({
  schema,
});
const dialog = ref(false);
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm: "",
  phone: "",
  role: "",
  contractNumber: "",
  company: "",
  taxNumber: "",
  client: "",
  project: "",
  city: "",
  dateStart: "",
  dateEnd: "",
  rate: "",
});

const projects = ref([]);

const rules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 3) || "Min 3 characters",
];

const updateUser = async () => {
  const userData = { ...user.value };
  const response = await updateUserData(userData);
  if (response.success) {
    dialog = false
    alert("User data updated successfully");
  } else {
    alert("Failed to update user data");
  }
};

async function updateUserData(user_data) {
  try {
    const payload = {
      email: username.value,
      password: password.value
    };
    const response = await authStore.userRegister(user_data);
    if (response.status === 200) {
      alert("Registration successful. Please log in.");
    } else {
      alert("Registration failed: " + response.data.detail);
    }
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response && error.response.data) {
      alert("Registration failed: " + error.response.data.detail);
    } else {
      alert("Registration failed: An unexpected error occurred");
    }
  }
}

async function fetchProjects() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "get_projects" }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.success) {
        projects.value = response.projects; // Update the projects ref with the fetched projects
      }
      resolve(response); // Resolve the promise with the response
      ws.close(); // Close the WebSocket connection
    };

    ws.onerror = (error) => {
      reject(error); // Reject the promise if there's an error
    };
  });
}

onMounted(async () => {
  // await fetchProjects(); // Fetch projects when the component is mounted
});
</script>

<style scoped>
.user-data {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 800px;
  margin: 1rem auto;
}

.user-data h2 {
  margin-bottom: 1rem;
}

.v-container {
  color: #ccc;
}

.v-sheet {
  border-color: rgb(0, 0, 0) !important;
}
</style>