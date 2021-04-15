<template>
  <div class="bg-zombie font-rubik h-full mt-5 rounded-lg py-6" :class="{'bg-sweet':Edit}">
    <form @submit.prevent="submitForm" class="">
      <h3 v-if="!Edit" class="text-5xl  uppercase font-extrabold ">Create you card</h3>
      <h3 v-else class="text-5xl uppercase font-extrabold">Edit you card</h3>
      <div class="py-4">
        <label class="label" for="name">Your Card Name</label>
        <input class="input " id="name" type="text" v-model="name" @blur="validateNameInput" :class="{'editInput':Edit}" />
        <p v-if="invalidNameInput" class="font-semibold text-yellow-300">Please enter you card name!</p>
      </div>
      <div class="py-1">
        <label class="label" for="cost">Your Card Cost</label>
        <input class="input " id="cost" type="number" v-model="cost" min="0" :class="{'editInput':Edit}" />
      </div>
      <!----------------------------------------------------------------------------------------------------------->
      <div>
        <input
          type="radio"
          name="type"
          id="magic"
          value="MAGIC"
          v-model="type"
          @click="isCreature = false;"
        />
        <label class="label" for="magic">Magic</label>
        <input
          type="radio"
          name="type"
          id="creature"
          value="CREATURE"
          v-model="type"
          @click="
            isCreature = true;
          "
        />
        <label class="label" for="creature">Creature</label>

        <div v-if="isCreature" class="py-4">
          <label class="label" for="attack">Attack Power</label>
          <input
            class="input"
            id="attack"
            type="number"
            v-model="attack"
            min="0"
            :class="{'editInput':Edit}"
          />
          <label class="label" for="health">Health Point</label>
          <input
            class="input"
            id="health"
            type="number"
            v-model="health"
            min="1"
            :class="{'editInput':Edit}"
          />
        </div>
        <p v-if="type===''" class="font-semibold text-yellow-300">Please choose a card type!</p>
      </div>
      <!----------------------------------------------------------------------------------------------------------->
      <div id="effectZone">
         <label for="cardEffect" class="label">Input you card effect</label>
         <input type="text" v-model="effect" id="cardEffect" class="input" :class="{'editInput':Edit}"/>
         <p v-if="isMagic" class="font-semibold text-yellow-300">It magic must have effect</p>
      </div>
      <nice-button class="mt-6" :class="{'edit':Edit}">Submit</nice-button>
    </form>
    <div class="">
      <nice-button @click="Edit = !Edit" v-if="!Edit">Edit you card?</nice-button>
      <nice-button @click="Edit = !Edit" v-if="Edit" :class="{'edit':Edit}">Cancel edit form</nice-button>
    </div>
    <card-list
      isEdit="true"
      @show-data="showData"
      @delete-data="deleteCard"
      ref="list"
      v-if="Edit"
    >
      <template v-slot:edit>
        <h2 class="font-bold text-5xl">Choose a card to edit or delete :</h2>
      </template>
    </card-list>
  </div>
</template>
<script>
import nicebutton from '../components/niceButton.vue'
export default {
  name: "Add",
  component:['nice-button',nicebutton],
  inject: ["url"],
  data() {
    return {
      name: "",
      cost: 0,
      attack: 0,
      health: 0,
      effect: "",
      type: "",
      Edit: false,
      haveEffect: true,
      isCreature: false,
      id: 0,
      invalidNameInput : false,
      isMagic:false
    };
  },
  methods: {
    checkEffect(){
     if(this.type==='MAGIC'){
       if(this.effect==''){
         this.isMagic=true
       }
       else{
         this.isMagic=false
       }
     }else{
       this.isMagic=false
     }
    },
    validateNameInput() {
      this.invalidNameInput = this.name === '' ? true : false
    },
    submitForm() {
     this.checkEffect()
      if (this.name !== "" && this.type !== "" && !this.isMagic) {
        if (this.Edit) {
          this.editCardInfo();
          this.name = "";
          this.cost = 0;
          this.attack = 0;
          this.health = 0;
          this.effect = "";
          this.type = "";
          this.isCreature=false
          this.invalidEffectInput=true
        } else {
          this.addNewCard();
          this.name = "";
          this.cost = 0;
          this.attack = 0;
          this.health = 0;
          this.effect = "";
          this.type = "";
          this.isCreature=false
          this.invalidEffectInput=true
        }
      }else{
        alert("Please complete you input")
        this.validateNameInput()
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
      alert("New card add to collection check it at home page!");
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
