const input = require('input');
const RandomIntGame = require('./structures/RandomIntGame');

const getGameRules = async () => {
    var max            = await input.text('Введите максимальное число', { default: 100 });
    var min            = await input.text('Введите минимальное число', { default: 1 });
    var attempts       = await input.text('Введите количество попыток', { default: 15 });
    var promptOfNumber = await input.confirm('Хотите ли вы получать подсказки( загаданное число больше/маньше ) ?', { default: true });

    return {
        maxInt   : max,
        minInt   : min,
        attempts : attempts,
        prompt   : promptOfNumber
    }
}

getGameRules().then(async result => {
    if(result.maxInt <= result.minInt) throw new Error('Максимальное число не может быть меньше или ровно минимальному числу!')
    var game = new RandomIntGame(result);
    var currentNumber = 0;
    while(currentNumber != game.number) {
        currentNumber = await input.text(`Введите число от ${game.gameRules.minInt} до ${game.gameRules.maxInt}:`);
        if(currentNumber.length === 0 || isNaN(currentNumber)) {
            console.error('Пожалуйста, введите число!');
        }
        else {
            var attempt = game.check(currentNumber);
            if(attempt.error) return console.error(attempt.message)
            else {
                if(attempt.win) {
                    console.log(`Поздравляю, Вы угадали число!\nВы прошли игру за ${game.attempts.length+1}/${game.gameRules.attempts} попыток!`);
                    break;
                }
                else {
                    var attempts = game.attempts.length+1;
                    if(attempts >= game.gameRules.attempts) {
                        console.log(`К сожаленью, вы проиграли: было использовано все попытки.\nЗагаданное число: ${game.number}`);
                        break;
                    }
                    if(game.gameRules.prompt) {
                        console.log(`Вы не угадали: загаданное число ${currentNumber < game.number ? 'больше' : 'меньше'} вашего! Попробуйте ещё раз!`);
                    } else console.log('Вы не угадали число! Попробуйте ещё раз!');
                }
            }
        }
    }
});