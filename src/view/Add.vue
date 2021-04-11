<template>
  <div class="bg-red-600">
    <form @submit.prevent="submitForm">
      <h3>Create you card</h3>
      <label class="label" for="name">Your Card Name</label>
      <input class="input" id="name" type="text" v-model="name" />
      <label class="label" for="cost">Your Card Cost</label>
      <input class="input" id="cost" type="number" v-model="cost" />
      <label class="label" for="effect">Your Card Effect</label>
      <input class="input" id="effect" type="text" v-model="effect" />
      <div>
        <input
          type="radio"
          name="type"
          id="magic"
          value="magic"
          v-model="type"
          @click="isCreature = false"
        />
        <label class="label" for="magic">Magic</label>
      </div>
      <div>
        <input
          type="radio"
          name="type"
          id="creature"
          value="creature"
          v-model="type"
          @click="isCreature = true"
        />
        <label class="label" for="creature">Creature</label>
      </div>
      <div v-if="isCreature">
        <label class="label" for="attack">Attack Power</label>
        <input class="input" id="attack" type="number" v-model="attack" />
        <label class="label" for="health">Health Point</label>
        <input class="input" id="health" type="number" v-model="health" />
      </div>
      <button class="btn" @click="showData()">Submit</button>
    </form>
    <card-list isEdit="true" @show-data='showData' ref="form"></card-list>
  </div>
</template>
<script>
export default {
  inject: ["url"],
  data() {
    return {
      isCreature: false,
      name: "",
      cost: 0,
      attack: 0,
      health: 0,
      effect: "",
      type: "",
      oldCard: null
    };
  },
  methods: {
    submitForm() {
      if (this.name !== "") {
        if (this.attack === 0 && this.health === 0) {
          this.addNewCard();
        }
        this.name = "";
        this.cost = 0;
        this.attack = 0;
        this.health = 0;
        this.effect = "";
        this.type="";
        console.log(this.url);
      }
    },
    showData(Card){

      this.oldCard=Card
      console.log(
      this.oldCard)
      this.name=this.oldCard.name
      this.cost=this.oldCard.cost
      this.type=this.oldCard.type
      this.effect=this.oldCard.effect
      this.attack=this.oldCard.attack
      this.health=this.oldCard.health
    }
    ,
    async addNewCard() {
      try {
         await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            cost: this.cost,
            effect: this.effect,
            attack: this.attack,
            health: this.health,
            type:this.type
          }),
        });
      } catch (error) {
        console.log(error);
      }
      this.$refs.form.setList()
    },
  },
 
};
</script>
