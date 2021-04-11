<template>
<div class="grid grid-cols-3 ">
        <div class="relative w-64 mt-20" v-for="card in cardLists" :key="card.name">
          <div class="absolute left-4 bottom-4 bg-red-600 h-full w-full rounded-xl"></div>
          <div class="relative bg-gray-800 text-gray-50 rounded-xl p-8 space-y-7">
            <div v-if="isEdit">
            <button class="m-1" >
                <img @click="$emit('show-data',card)" alt="" class="bg-blue-500 m-1" src="../assets/edit.svg"/>
              </button>
          </div>
            <div class="text-4xl font-extrabold text-white left-3 top-3 absolute">{{ card.cost }}</div>
            <p class="leading-snug text-gray-400 text-2xl">
              {{card.name}}
            </p>
          <div v-if="card.attack!==''&&card.health!==''">
            <p>
              {{card.attack}}
            </p>
            <p>
              {{card.health}}
            </p>
          </div>
          </div>
        </div>
</div>
</template>
<script>
export default ({
  inject:['url'],
  emits:['show-data'],
  props:{
    isEdit: Boolean
  },
  data() {
    return {
      cardLists: []
    };
  },
  methods: {
    async setList(){
      this.cardLists=await this.getCardLists();
    },
    async getCardLists() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }

  },
  async created() {
    this.cardLists = await this.getCardLists();
  },
});
</script>