module.exports = class RandomIntGame {
    constructor(options) {
        this.gameRules = options;
        this.number = Math.floor(Math.random() * (options.maxInt - options.minInt) + options.minInt);
        this.attempts = [];
    }
    check(int) {
        if(!int) return { error: true, message: 'Пожалуйста, введите число!' };
        if(isNaN(int)) return { error: true, message: 'По условиям игры нужно вводить только цифры!' }
        int = Math.ceil(int);
        if(this.attempts.includes(int)) return { error: true, message: 'Вы уже пробывали вводить это число! Попробуйте ввести другое число!' }
        this.attempts.push(int);
        return {
            error: false,
            win: this.number == int
        }
    }
}