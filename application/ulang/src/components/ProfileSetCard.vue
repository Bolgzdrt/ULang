<template>
  <div class="card">
    <div class="set-info">
      <div class="set-owner">
        {{setOwner}}
      </div>
      <div class="set-name">
        {{setName}}
      </div>
      <div class="num-terms">
        {{numTerms}}
      </div>
    </div>
    <div class="buttons">
      <lightningbolt class="lightningbolt" v-bind:fill="false" />
      <heart class="heart" v-bind:fill="false" />
    </div>
  </div>
</template>

<script>
import heart from '@/assets/svgs/heart.vue';
import lightningbolt from '@/assets/svgs/lightningbolt.vue';
export default {
  name:"ProfileSetCard",
  components: {
    heart,
    lightningbolt
  },
  props: {
    owner: String,
    setname: String,
    numterms: Number
  },
  data() {
    return{
    setOwner: "John's set",
    setName: "Travel",
    numTerms: "20 Terms"
    }
  },
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
  filter: drop-shadow(4px 4px 3px rgba(0, 0, 0, 0.3));
}

.set-info{
  display: inherit;
  flex-direction: column;
  align-items: baseline;
}

.set-owner{
  font-size: 15px;
  opacity: 50%;
}

.set-name{
  font-size: 30px;
}

.num-terms{
  font-size: 22px;
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