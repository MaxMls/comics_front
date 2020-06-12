<template>
    <v-container fill-height fluid>
        <v-row align="center">
            <v-col class="text-center">
                <div>
                    <router-link to="/"> <v-btn class="mb-3">Вернуться на главную</v-btn><br>
                    <img alt="Vue logo" src="../assets/404.jpg"/><br>
                    <v-btn class="mt-3">Вернуться на главную</v-btn></router-link>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "not-found"
    }
</script>

<style scoped>

</style>
