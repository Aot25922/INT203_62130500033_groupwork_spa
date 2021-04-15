<template>
  <div v-if="!isEdit" class="font-rubik bg-sky text-left p-6 mt-5 rounded-lg">
    <div class="md:px-64 space-y-3">
      <h3
        class="text-center text-5xl uppercase font-extrabold text-devy-gray underline"
      >
        Creator Info
      </h3>
      <p class="label text-devy-gray">Username : {{ this.name }}</p>
      <p class="label text-devy-gray">E-mail : {{ this.email }}</p>
      <p class="label text-devy-gray">You Country/Region : {{ this.region }}</p>
      <p class="label text-devy-gray">You Birthdate : {{ this.date }}</p>
      <nice-button @click="isEdit = !isEdit"
        ><span>Edit you profile</span></nice-button
      >
    </div>
  </div>
  <div v-else class="bg-nice-orange text-left p-6 mt-5 rounded-lg font-rubik space-y-3">
    <h3
        class="text-center text-5xl uppercase font-extrabold text-devy-gray underline py-2"
      >
        Edit Creator Info
      </h3>
    <form @submit.prevent="submitForm()" class="md:px-64 space-y-3">
      <div>
        <label for="name" class="label">Username :</label>
        <input class="input" id="name" type="text" v-model="this.name" />
        <p v-if="invalidNameInput">Username must not blank!</p>
      </div>
      <div>
        <label for="email" class="label">E-mail:</label>
        <input class="input" id="email" type="email" v-model="this.email" />
        <p v-if="invalidEmailInput">Email must not blank</p>
      </div>
      <div>
        <label for="region" class="label">You Country/Region :</label>
        <input class="input" id="region" type="text" v-model="this.region" />
      </div>
      <div>
        <label for="region" class="label">You Birthdate :</label>
        <input class="input" id="region" type="date" v-model="this.date" />
      </div>
      <nice-button><span>Confirm You Edit</span></nice-button>
    </form>
  </div>
</template>
<script>
// @ is an alias to /sr
export default {
  name: "Creator",
  data() {
    return {
      isEdit: false,
      url: "http://localhost:5000/profile",
      user: null,
      invalidNameInput: false,
      invalidEmailInput: false,
      name: "",
      email: "",
      region: "",
      date: "",
    };
  },
  methods: {
    submitForm() {
      this.validateNameInput();
      this.validateEmailInput();
      if (!this.invalidNameInput && !this.invalidEmailInput) {
        this.editInfo();
        this.isEdit = false;
      }
    },
    validateNameInput() {
      this.invalidNameInput = this.name === "" ? true : false;
    },
    validateEmailInput() {
      this.invalidEmailInput = this.email === "" ? true : false;
    },
    showdata() {
      this.name = this.user.username;
      this.email = this.user.email;
      this.region = this.user.region;
      this.date = this.user.date;
    },
    async getInfo() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async editInfo() {
      try {
        await fetch(`${this.url}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.name,
            email: this.email,
            region: this.region,
            date: this.date,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.user = await this.getInfo();
    this.showdata();
  },
};
</script>