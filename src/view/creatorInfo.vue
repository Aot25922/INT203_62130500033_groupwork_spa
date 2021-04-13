<template>
  <div v-if="!isEdit">
    <h3>Creator Info</h3>
    <img :src="image" />
    <p>Username : {{ name }}</p>
    <p>E-mail : {{ email }}</p>
    <p>You Country/Region : {{ region }}</p>
    <p>You Birthdate : {{ date }}</p>
    <nice-button @click="isEdit = !isEdit"><span>Edit you profile</span></nice-button>
  </div>
  <div v-else>
    <form>
      <label for="name" class="label">Username :</label>
      <input class="input" id="name" type="text" v-model="name" />
      <label for="email" class="label">E-mail:</label>
      <input class="input" id="email" type="email" v-model="email" />
      <label for="region" class="label">You Country/Region :</label>
      <input class="input" id="region" type="text" v-model="region" />
      <label for="region" class="label">You Birthdate :</label>
      <input class="input" id="region" type="date" v-model="date" />
      <nice-button @click="isEdit = !isEdit"><span>Confirm You Edit</span></nice-button>
    <h2>Select an image</h2>
    <input type="file" @change="onFileChange">
    </form>
  </div>
</template>
<script>
// @ is an alias to /sr
export default {
  name: "creator",
  data() {
    return {
      name: "",
      email: "",
      region: "",
      date: "",
      image:"",
      isEdit: false,
    };
  },
  methods : {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      this.img = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  }
};
</script>