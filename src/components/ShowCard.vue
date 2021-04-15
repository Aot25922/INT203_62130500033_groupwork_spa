<template>
  <slot name="edit"></slot>
  <h3 v-if="cardLists.length == 0" class="text-5xl  uppercase font-extrabold ">You don't have any card right now !</h3>
  <div class="grid grid-cols-3 px-2 justify-items-stretch gap-y-4">
    <div
      class="relative w-64 mt-20 md:justify-self-center"
      v-for="card in cardLists"
      :key="card.name"
    >
      <div
        class="absolute left-4 bottom-4 bg-deep h-full w-full rounded-xl"
      ></div>
      <div
        class="relative bg-devy-gray text-gray-50 rounded-xl p-5 space-y-7 h-full" :class="{'bg-my-magenta':card.type==='MAGIC'}"
      >
        <div class="">
          <p class="text-4xl font-extrabold text-white left-1 top-1 absolute">
            {{ card.cost }}
          </p>
          <div v-if="isEdit" class="top-0 right-1 absolute">
            <button class="m-1">
              <img
                @click="$emit('show-data', card)"
                alt="edit button"
                class="m-1 hover:opacity-50"
                src="../assets/edit.svg"
              />
            </button>
            <button
              @click="$emit('delete-data', card)"
              class="m-1 hover:opacity-50"
            >
              <img src="../assets/delete.svg" alt="delete button" />
            </button>
          </div>
        </div>
        <div class="bg-pewter-blue h-36 pt-12 ring-4 rounded-lg">
          <h3 class="text-4xl">{{ card.type }}</h3>
        </div>
        <div class="space-y-3">
        <p class="text-3xl break-all ">
          {{ card.name }}
        </p>
        <div class="bg-teal-blue ring-4 rounded-md py-3" >
          <p v-if="card.effect == ''" >No Effect</p>
          <p v-else class="break-all ">Effect: {{ card.effect }}</p>
        </div>
        <div v-if="card.attack !== 0 && card.health !== 0" class="flex justify-around text-5xl font-extrabold pt-2">
          <p class="bg-celadon-blue  rounded-md  px-10 py-0.5  border-2">
            {{ card.attack }}
          </p>
          <p class="bg-red-salsa  rounded-md px-10 py-0.5  border-2">
            {{ card.health }}
          </p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["url"],
  emits: ["show-data", "delete-data"],
  props: {
    isEdit: Boolean,
  },
  data() {
    return {
      cardLists: [],
    };
  },
  methods: {
    async setList() {
      this.cardLists = await this.getCardLists();
    },
    async getCardLists() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.cardLists = await this.getCardLists();
  },
};
</script>