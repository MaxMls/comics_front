<template>
    <div>
        <CardContainer v-if="category" :category="category" show-toolbar="true"/>
    </div>
</template>

<script>
    import CardContainer from "../vueComponents/CardContainer";
    import {TITLES_REQUEST} from "../store/actions/titles";

    export default {
        components: {CardContainer},
        props: ['categoryName'],
        data() {
            return {
                category: ''
            }
        },
        watch: {
            '$route'(to, from) {
                console.log('$route');
                this.category = this.categoryName
            }
        },
        beforeRouteEnter(to, from, next) {
            console.log('beforeRouteEnter');
            if(!['m', 'c', 'favorite'].includes(to.params.categoryName)) next('/404')
            console.log()

            next(vm => {
                vm.category = vm.categoryName
                // vm.getCategory()
            })
        },
        methods: {
            getCategory() {
                const t = this;
                const {categoryName} = this;

                let offset = parseInt(this.$route.query.offset, 10);
                if (Number.isNaN(offset)) {
                    this.$router.push({query: {offset: "0"}});
                    offset = 0;
                }
                console.log('beforeRouteEnter getCategory');
                this.$store.dispatch(TITLES_REQUEST, {category: categoryName, offset}).then(resp => {
                    t.category = categoryName
                }).catch(resp => { })
            }
        }
    }
</script>

<style>

</style>
