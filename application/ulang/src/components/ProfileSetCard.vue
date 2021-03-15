<template>
  <div class="card">
    <div class="set-info" @click="openSet">
      <span class="set-owner">
        {{ setOwner }}
      </span>
      <span class="set-name">
        {{ setName }}
      </span>
      <span class="num-terms">
        {{ numTerms }}
      </span>
    </div>
    <div class="buttons">
      <Lightningbolt class="lightningbolt" v-bind:fill="quickaccess" />
      <Heart class="heart" v-bind:fill="favorite" />
    </div>
  </div>
</template>

<script>
import Heart from '@/assets/svgs/heart.vue'
import Lightningbolt from '@/assets/svgs/lightningbolt.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'ProfileSetCard',
  components: {
    Heart,
    Lightningbolt,
  },
  props: {
    setId: String,
    owner: String,
    setname: String,
    numterms: Number,
    favorite: Boolean,
    quickaccess: Boolean,
  },
  data() {
    return {
      setOwner: this.owner == '' ? '' : this.owner.concat("'s Set"),
      setName: this.setname,
      numTerms: this.numterms.toString().concat(' Terms'),
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
    openSet() {
      this.$router.push({ name: 'Dictionary', params: { setId: this.setId } })
    }
  },
}
</script>

<style scoped>
@import "../assets/styles/utils.css";

.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: var(--white);
  width: 100%;
  padding: 0.5rem 0.75rem;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.3));
}

.set-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 0.5em;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.set-owner {
  font-size: 1rem;
  opacity: 50%;
}

.set-name {
  font-size: 2rem;
}

.num-terms {
  font-size: 1.5rem;
  font-weight: 300;
}

.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: inherit;
}

.heart {
  cursor: pointer;
}

.lightningbolt {
  height: 40px;
  cursor: pointer;
}
</style>
