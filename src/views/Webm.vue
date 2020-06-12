<template>
    <div style="position: relative; display: inline-block; pointer-events: none">
       <!-- <video style="z-index: 999" @play="bt=false" @ended="bt=true" ref="MikuHi" pip="false" src="../assets/video/output2win.webm" width="400" muted autoplay/>
        <v-btn
                v-if="bt"
                class="replayBtn"
                icon
                @click="$refs['MikuHi'].play()"
                dark
                color="rgba(255, 255, 255, 0.51)"
                style="pointer-events: auto"
        >
            <v-icon>replay</v-icon>
        </v-btn>-->
    </div>
</template>
<script>
    export default {
        name: 'Webm',
        data() {
            return {
                bt: false
            }
        },
        computed: {
        }
    }
</script>
<style>

    .replayBtn{
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1000;
        transform: translateX(-50%) translateY(-50%);
    }
</style>
