<template>
    <div>
        <CardContainer category="favorite" :clean="true"/>
    </div>
</template>
<script>
    import CardContainer from "../vueComponents/CardContainer";
    export default {
        name: "Favorites",
        components: {CardContainer},
        props:["userId"]
    }
</script>

<style scoped>

</style>
