<template>
     <div class="is-flex is-align-items-center is-justify-content-space-between">

                <Cronometro :tempoEmSegundos="timeEmSegundos"/>
                <button class="button" @click="iniciar" :disabled="cronometroRodando">
                    <span class="icon">
                        <i class="fas fa-play"></i>
                    </span>
                    <span>play</span>
                </button>
                <button class="button" @click="finalizar" :disabled="!cronometroRodando">
                    <span class="icon">
                        <i class="fas fa-stop"></i>
                    </span>
                    <span>stop</span>
                </button> 

            </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cronometro from './Cronometro.vue'
export default defineComponent({
    name: 'TemporizadorTask',
        data() { 
        return {
            timeEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    emits: ['aoFinalizarTemporizador'],
    methods: {
        iniciar(){
            this.cronometroRodando = true
            this.cronometro = setInterval(()=>{
                this.timeEmSegundos += 1
            }, 1000)
            
        },
        finalizar(){
            this.cronometroRodando = false
            this.$emit('aoFinalizarTemporizador', this.timeEmSegundos)
            clearInterval(this.cronometro)
            this.timeEmSegundos = 0
        }
    },
    components: {
        Cronometro,
    }
})
</script>
