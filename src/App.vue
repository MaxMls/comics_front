<template>
    <v-app>
        <Header/>
        <v-content class="content">
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    import Header from "./vueComponents/Header";

    export default {
        name: "App",

        components: {
            Header
        },

        data: () => ({})
    };

</script>
<style>
    .content{
        background: #edeef0;
    }
</style>
