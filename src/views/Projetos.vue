<template>
    <div class="projetos">
        <h1 class="title">Projetos</h1>
    </div>
        <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'ProjetosVue'
})
</script>

<style scoped>
.projetos{
    display: flex;
}
h1{
    color: var(--texto-primario);
    margin:10px auto;
}
</style>