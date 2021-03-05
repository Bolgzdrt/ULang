<template>
  <div class="card" @click="openSet">
    <div class="set-info" >
      <span class="set-owner">
        {{setOwner}}
      </span>
      <span class="set-name">
        {{setName}}
      </span>
      <span class="num-terms">
        {{numTerms}}
      </span>
    </div>
    <div class="buttons">
      <lightningbolt class="lightningbolt" v-bind:fill="quickaccess" />
      <heart class="heart" v-bind:fill="favorite" />
    </div>
  </div>
</template>

<script>
import heart from '@/assets/svgs/heart.vue';
import lightningbolt from '@/assets/svgs/lightningbolt.vue';
import {mapGetters} from 'vuex'
export default {
  name:"ProfileSetCard",
  components: {
    heart,
    lightningbolt
  },
  props: {
    setId: String,
    owner: String,
    setname: String,
    numterms: Number,
    favorite: Boolean,
    quickaccess: Boolean
  },
  data() {
    return{
    setOwner: this.owner=='' ? '':this.owner.concat("'s Set"),
    setName: this.setname,
    numTerms: this.numterms.toString().concat(" Terms"),
    favorite: this.favorite,
    quickaccess: this.quickaccess
    }
  },
  methods: {
    ...mapGetters('auth', ['getUserId']),
    openSet(){
      this.$router.push({ name: 'Dictionary', params: {id: this.getUserId(), setId: setId} });
    }
  }
}
</script>

<style scoped>
.card{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: var(--white);
  width: 100%;
  padding-top: .5em;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.3));
}

.set-info{
  display: inherit;
  flex-direction: column;
  align-items: baseline;
  padding-left: 1em;
}

.set-owner{
  font-size: 16px;
  opacity: 50%;
}

.set-name{
  font-size: 32px;
}

.num-terms{
  font-size: 24px;
}

.buttons{
  display: inherit;
  flex-direction: row;
  align-items: center;
  align-self:baseline;
  padding-right: .2em
}

.heart{

}
.lightningbolt{
  height: 40px;
}

</style>