<template>
  <!-- <div class="pa-4 text-center"> -->
  <div class="d-flex align-center flex-column">
    <!-- <v-btn color="primary" @click="dialog = true">Open User Profile</v-btn> -->
    <!-- <div class="pa-4 text-center"> -->
    <v-dialog v-model="dialog" max-width="800">
      <template v-slot:activator="{ props: activatorProps }">
        <div>
          <v-btn
            class="text-none font-weight-regular"
            prepend-icon="mdi-account"
            text="Edit Profile"
            variant="tonal"
            v-bind="activatorProps"
          ></v-btn>
        </div>
      </template>
      <!-- <v-dialog v-model="dialog" max-width="600"> -->
      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row dense no-gutters>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.firstName"
                color="primary"
                required
                :rules="[(v) => !!v || 'Item is required']"
                hide-details="auto"
                label="First name"
                variant="underlined"
              ></v-text-field>
              <ErrorMessage name="name" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.lastName"
                color="primary"
                required
                :rules="[(v) => !!v || 'Item is required']"
                hide-details="auto"
                label="Last name"
                variant="underlined"
              ></v-text-field>
              <ErrorMessage name="name" />
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters>
            <!-- <v-col cols="12" md="6"> -->
            <v-text-field
              clearable
              v-model="user.email"
              required
              color="primary"
              :rules="[(v) => !!v || 'Item is required']"
              hide-details="auto"
              label="Email"
              variant="underlined"
              prepend-inner-icon="mdi-email-outline"
              min-width="350"
            ></v-text-field>
            <!-- </v-col> -->
            <ErrorMessage name="email" />
          </v-row>
          <v-row no-gutters>
            <!-- <v-col cols="12" md="6"> -->
            <v-col class="mt-4 pr-6">
              <v-text-field
                clearable
                v-model="user.password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                required
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="underlined"
                @click:append-inner="visible = !visible"
              >
              </v-text-field>
              <ErrorMessage name="password" />
            </v-col>
            <!-- <v-col cols="12" md="6"> -->
            <v-col class="mt-4">
              <v-text-field
                clearable
                v-model="passConfirm"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                required
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Confirm your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="underlined"
                @click:append-inner="visible = !visible"
              >
              </v-text-field>
              <!-- <Password
 v-model.trim="v$.passwordConfirm.$model"
 :feedback="false"
 :class="{ 'p-invalid': v$.passwordConfirm.$error }"
 @blur="v$.passwordConfirm.$touch()"
 class="p-mb-1"
 placeholder="Confirm Password"
 toggleMask
 >
 </Password>
 <template
    v-for="(error, index) of v$.passwordConfirm.$errors"
    :key="index"
 >
   <span v-if="v$.passwordConfirm.$error" class="p-error">{{error.$message}}</span>
 </template> -->
              <ErrorMessage name="password" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.phone"
                color="primary"
                :rules="[(v) => !!v || 'Item is required']"
                required
                hide-details="auto"
                label="Tel."
                variant="underlined"
              ></v-text-field>
              <ErrorMessage name="phone" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.city"
                color="primary"
                label="City"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.contractNumber"
                color="primary"
                :rules="rules"
                hide-details="auto"
                required
                label="Contract number"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.company"
                color="primary"
                label="Company"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.companyId"
                color="primary"
                label="Company ID"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.taxNumber"
                color="primary"
                label="Tax number"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.client"
                color="primary"
                label="Client"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.rate"
                color="primary"
                label="Rate"
                suffix="Eur."
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox
                clearable
                chips
                v-model="user.project"
                :items="projects"
                label="Project"
                required
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-combobox
                clearable
                chips
                :items="['Contract', 'Supervisor', 'Employee']"
                v-model="user.role"
                required
                label="Role"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox
                v-model="user.is_superuser"
                label="Supervisor"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="6">
              <v-checkbox v-model="user.is_active" label="Active"></v-checkbox>
            </v-col>
          </v-row>
          <!-- <v-divider></v-divider> -->
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.dateStart"
                type="date"
                color="primary"
                label="Start Date"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                v-model="user.dateEnd"
                type="date"
                color="primary"
                label="End Date"
                required
                variant="underlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis"
            >*indicates required field</small
          >
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>

          <v-btn
            color="primary"
            type="submit"
            text="Save"
            variant="tonal"
            @click="updateUser"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useField, useForm, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store";
import Vuelidate from "vuelidate";
const router = useRouter();
import { NavigationFailureType, isNavigationFailure } from "vue-router";
import * as Yup from "yup";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const visible = ref(false);
const schema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});


// passwordConfirm: {
//     required: helpers.withMessage(
//       "Confirm password cannot be empty. ",
//       required
//     ),
//     sameAsPassword: helpers.withMessage(
//       "Confirm password must be same as password you entered above.",
//       sameAs(dataAsRefs.password)
//     ),
//     $lazy: true
//   },

let dialog = ref(false);
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  // passConfirm: "",
  phone: "",
  role: "",
  contractNumber: "",
  company: "",
  companyId: "",
  taxNumber: "",
  client: "",
  project: "",
  city: "",
  dateStart: "",
  dateEnd: "",
  rate: 0,
  is_superuser: false,
  is_active: true,
});
let password = ref(user.password);
let passConfirm = ref("");
const projects = ref(["STLA", "STLB", "STLC", "STLD", "DCROSS", "BMW"]);

const rules = ref([
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 3) || "Min 3 characters",
]);

const updateUser = async () => {
  if (user.value.password !== passConfirm.value) {
    alert("Passwords do not match");
    return;
  }

  const userData = { ...user.value };
  const response = await updateUserData(userData);
  if (response === "Success") {
    dialog.value = false;
    router.push({ name: "Home" });
    alert("User data updated successfully");
  } else {
    alert("Failed to update user data");
  }
};

function closeDialog() {
  dialog.value = false;
  router.push({ name: "Home" });
}

async function updateUserData(user_data) {
  try {
    const authStore = useAuthStore();
    const response = await authStore.userRegister({
      email: user_data.email,
      password: user_data.password,
      first_name: user_data.firstName,
      last_name: user_data.lastName,
      phone: user_data.phone,
      role: user_data.role,
      contract_number: user_data.contractNumber,
      company: user_data.company,
      company_id: user_data.companyId,
      tax_number: user_data.taxNumber,
      client: user_data.client,
      project: user_data.project,
      city: user_data.city,
      date_start: user_data.dateStart,
      date_end: user_data.dateEnd,
      rate: user_data.rate,
      is_superuser: user_data.is_supervisor,
      is_active: user_data.is_active,
    });
    if (response.status === 200) {
      alert("Registration successful. Please log in.");
      dialog = false;
      router.push({ name: "Login" });
    } else {
      alert("Registration failed: " + response.data.detail);
    }
  } catch (error) {
    console.error("Registration error:", error);
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