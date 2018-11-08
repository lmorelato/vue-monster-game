new Vue({
    el: '#app',

    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },

    methods: {
        startGame: function () {
            this.resetGame();
            this.gameIsRunning = true;
        },

        attack: function () {
            let damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage;
            this.log('Player hits monster for ' + damage);

            if (this.checkWin()) return;
            this.monsterAttacks();
        },

        specialAttack: function () {
            let damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.log('Player hits monster hard for ' + damage);

            if (this.checkWin()) return;
            this.monsterAttacks();
        },

        heal: function () {
            if (this.playerHealth <= 90) this.playerHealth += 10;
            else this.playerHealth = 100;
            this.log('Player heals for ' + 10);

            this.monsterAttacks();
        },

        giveUp: function () {
            this.resetGame();
        },

        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        resetGame: function () {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.gameIsRunning = false;
            this.turns = [];
        },

        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) this.startGame();
                else this.resetGame();
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) this.startGame();
                else this.resetGame();
                return true;
            }
            return false;
        },

        monsterAttacks: function () {
            let damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage;
            this.log('Monster hits player for ' + damage, false);
            this.checkWin();
        },

        log: function (text, isPlayer = true) {
            this.turns.unshift({
                text: text,
                isPlayer: isPlayer
            });
            console.log(text);
        }
    }
});

