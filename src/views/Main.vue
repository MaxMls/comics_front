<template>
  <div class="home pa-4 pa-lg-12">


    <CardContainer category="m"  absolutelyLimit="4">
      <h1 class="pb-6">{{$t('recently added items')}}</h1>
      <h2>{{$t('manga')}}:</h2>
    </CardContainer>
    <CardContainer category="c" absolutelyLimit="4"><h2 class="mt-4">{{$t('comics')}}:</h2></CardContainer>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/vueComponents/HelloWorld.vue";

import CardContainer from "../vueComponents/CardContainer";
export default {
  name: "Home",
  components: {
    CardContainer
    /*HelloWorld*/
  }
};
</script>
