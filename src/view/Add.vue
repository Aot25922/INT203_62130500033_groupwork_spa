<template>
  <div class="bg-red-600">
    <form @submit.prevent="submitForm">
      <h3 v-if="!Edit">Create you card</h3>
      <h3 v-else>Edit you card</h3>
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
      <button class="btn">Submit</button>
    </form>
    <div>
      <button @click="Edit = !Edit" v-if="!Edit">Edit you card?</button>
      <button @click="Edit = !Edit" v-if="Edit">Cancel edit form</button>
    </div>
    <card-list  isEdit="true" @show-data="showData" @delete-data="deleteCard" ref="list" v-if="Edit">
      <template v-slot:edit>
        <h2>Choose a card to edit :</h2>
      </template>
    </card-list>
  </div>
</template>
<script>

export default {
  name: 'Add',
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
      Edit: false,
      id: 0,
    };
  },
  methods: {
    submitForm() {
      if (this.name !== "") {
        if (this.Edit) {
          this.editCardInfo();
        } else {
          this.addNewCard();
        }
        this.name = "";
        this.cost = 0;
        this.attack = 0;
        this.health = 0;
        this.effect = "";
        this.type = "";
      }
    },
    showData(Card) {
      this.name = Card.name;
      this.cost = Card.cost;
      this.type = Card.type;
      this.effect = Card.effect;
      this.attack = Card.attack;
      this.health = Card.health;
      this.id = Card.id;
    },
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
            type: this.type,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      this.$refs.list.setList();
    },
    async editCardInfo() {
      try {
        await fetch(`${this.url}/${this.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            cost: this.cost,
            effect: this.effect,
            attack: this.attack,
            health: this.health,
            type: this.type,
          }),
        });
      } catch (error) {
        console.log(error);
      }
      this.$refs.list.setList();
    },
    async deleteCard(card) {
      try {
        await fetch(`${this.url}/${card.id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log(error);
      }
      this.$refs.list.setList();
    },
  },
};
</script>
