<template>
    <div>
        <v-card class="pa-5 ma-auto d-inline-block">

            <v-img :src="user.avatar" class="card-img avatar"/>
            <v-btn id="pick-avatar">Select an new image</v-btn>

            <div class="green--text text-center py-2">{{message}}</div>
            <avatar-cropper
                    @uploading="handleUploading"
                    @uploaded="handleUploaded"
                    @completed="handleCompleted"
                    @error="handlerError"
                    trigger="#pick-avatar"
                    upload-url="https://demo.overtrue.me/upload.php"
            />
        </v-card>
    </div>
</template>

<script>
    import AvatarCropper from "vue-avatar-cropper";

    export default {
        components: {AvatarCropper},
        data() {
            return {
                message: "ready",
                user: {
                    id: 1,
                    nickname: "安正超",
                    username: "overtrue",
                    avatar: "https://avatars0.githubusercontent.com/u/1472352?s=460&v=4"
                }
            };
        },
        methods: {
            handleUploading(form, xhr) {
                this.message = "uploading...";
            },
            handleUploaded(response) {
                if (response.status === "success") {
                    this.user.avatar = response.url;
                    // Maybe you need call vuex action to
                    // update user avatar, for example:
                    // this.$dispatch('updateUser', {avatar: response.url})
                    this.message = "user avatar updated.";
                }
            },
            handleCompleted(response, form, xhr) {
                this.message = "upload completed.";
            },
            handlerError(message, type, xhr) {
                this.message = "Oops! Something went wrong...";
            }
        }
    };
</script>

<style lang="scss">
    .vue-avatar-cropper-demo {
        max-width: 18em;
        margin: 0 auto;
    }

    .avatar {
        width: 160px;
        border-radius: 6px;
        display: block;
        margin: 20px auto;
    }

    .card-img-overlay {
        display: none;
        transition: all 0.5s;
    }

    .card-img-overlay button {
        // margin-top: 20vh;
    }

    .card:hover .card-img-overlay {
        display: block;
    }
</style>
