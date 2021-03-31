<template>
  <div class="actionCard" @click="selectCard">
    <div class="name">
     {{ set.name }}
   </div>
   <hr>
   <div class="desc">
     {{ set.description || desc }}
   </div>
  </div>
</template>

<script>
export default {
  name: "SetCard",
  props: {
    set: {
      required: true,
      default: () => ({
        name: '',
        description: ''
      })
    }
  },
  data() {
    return {
      desc: 'No description provided'
    }
  },
  methods: {
    // redirects to dictionary page for set listed on card
    selectCard() {
      this.$router.push({ name: 'Dictionary', params: { setId: this.set._id, setOwnerId: this.set.ownerId } })
    }
  }
}
</script>

<style scoped>
.actionCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  width: 16em;
  height: 7em;
  filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.3));
  background: white;
  text-align: center;
  margin: 20px 5px 20px 5px;
  cursor: pointer;
}

.actionCard:hover {
  background-color: #d8d8d8;
}

hr {
  width: 80%;
  margin: 20px 0px 20px 0px;
}

div {
  font-size: 26px;
}

.desc {
  font-size: 18px;
}

.name {
  padding-top: 20px;
}
</style>
