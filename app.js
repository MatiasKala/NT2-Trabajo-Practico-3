new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
        },
        atacar: function () {
            this.saludMonstruo-=this.calcularHeridas(3,10)

            if(this.verificarGanador()){
                return ;
            }
            
            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {
        },

        curar: function () {
        },

        registrarEvento(evento) {
        },

        terminarPartida: function () {
        },

        ataqueDelMonstruo: function () {
            let min=5,max=12;
            this.saludJugador-=this.calcularHeridas(min,max)
            if(this.verificarGanador())
                return ;
            
        },

        calcularHeridas: function (min,max) {
            return parseInt(Math.random() * (max - min) + min)+1;
        },
        verificarGanador: function () {
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});