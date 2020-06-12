<template>
    <div>
        <p>Авторизация завершена</p>
        <p>сервис: {{service}}</p>
        {{$route.query.code}}
        <v-btn>Закрыть окно</v-btn>
        <Webm/>

    </div>
</template>

<script>


    import Webm from "./Webm";

    export default {
        name: "OAuthWindow",
        components: {Webm},
        props: ['service'],
    }
</script>

