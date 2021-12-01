module.exports = class RandomIntGame {
    constructor(options) {
        this.gameRules = options; // передаємо значення в самий клас
        this.number = Math.floor(Math.random() * (this.gameRules.maxInt - this.gameRules.minInt) + this.gameRules.minInt);
        this.attempts = []; // список спроб
    }
    check(int) {
        if(!int) return { error: true, message: 'Будь ласка, введіть число!' };
        if(isNaN(int)) return { error: true, message: 'По правилам гри потрібно вводити число!' };
        int = Math.ceil(int);
        if(this.attempts.includes(int)) return { error: true, message: 'Ви вже спробували ввести це число! Будь ласка, спробуйте ввести інше число!' };

        this.attempts.push(int);
        return {
            error: false,
            win: int == this.number
        };
    }
}