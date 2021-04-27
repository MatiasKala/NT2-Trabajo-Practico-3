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
            this.saludJugador=100
            this.saludMonstruo=100
            this.turnos=[]
        },
        atacar: function () {
            let damage=this.calcularHeridas(3,10)
            this.saludMonstruo-=damage
            this.registrarEvento(`El jugador ataco al monstruo por ${damage}`,true)
            if(this.verificarGanador()){
                return ;
            }    
            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {
            let damage=this.calcularHeridas(10,20)
            this.saludMonstruo-=damage
            this.registrarEvento(`El jugador le saco ${damage} al monstruo por su ataque especial`,true)
            if(this.verificarGanador()){
                return ;
            }    
            this.ataqueDelMonstruo()
        },

        curar: function () {
            const capacidadCuracion=10
            if(this.saludJugador<=90){
                this.saludJugador+=capacidadCuracion
            } else {
                this.saludJugador=100
            }
            this.registrarEvento(`El Jugador se curo recuperando ${capacidadCuracion}`,true)
        },

        registrarEvento(texto,esJugador,) {
            this.turnos.unshift({
                isPlayer:esJugador,
                text:texto
            })
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego=false;
            confirm("Perdiste la partida ;(\nJugas la revancha?")?
            this.empezarPartida():null;
        },

        ataqueDelMonstruo: function () {
            let min=5,max=12;
            let damage=this.calcularHeridas(min,max)
            this.saludJugador-=damage
            this.registrarEvento(`El mostruo ataco al jugador por ${damage}`,false)
            if(this.verificarGanador())
                return ;
            
        },

        calcularHeridas: function (min,max) {
            return parseInt(Math.random() * (max - min) + min)+1;
        },
        verificarGanador: function () {
            if(this.saludMonstruo<=0){
                confirm("Ganaste la partida!! , jugas otra?")?
                this.empezarPartida() : this.hayUnaPartidaEnJuego=false;
                return true
            }else if(this.saludJugador<=0){
                confirm("Perdiste la partida ;(\nJugas la revancha?")?
                this.empezarPartida() : this.hayUnaPartidaEnJuego=false;
                return true
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.isPlayer,
                'monster-turno': !turno.isPlayer
            }
        }
    }
});