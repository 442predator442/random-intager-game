const { text, confirm } = require('input');
const RandomIntGame     = require('./structures/RandomIntGame');

const getGameRules = async () => {
    var maxInt = await text('Введіть максимальне число:', { default: 100 });
    var minInt = await text('Введіть мінімальне число:', { default: 1 });
    var attempts = await text('Введіть кількість спроб:', { default: 15 });
    var prompts = await confirm('Гра з підсказками?', { default: true });

    return { maxInt, minInt, attempts, prompts };
}

getGameRules().then(async result => {
    if(result.maxInt <= result.minInt) throw new Error('Максимальне число не може бути меньше, чим мінімальне!');
    var game = new RandomIntGame(result);
    var currentNumber = 0;
    while(currentNumber != game.number) { // умова має бути позитивною (true)
        currentNumber = Math.floor(await text(`Введіть число від ${result.minInt} до ${result.maxInt}:`));
        if(currentNumber < result.minInt || result.maxInt < currentNumber) console.log(`Число має бути більше ${result.minInt} та меньшим за ${result.maxInt}`);
        else {
            var attempt = game.check(currentNumber);
            if(attempt.error) console.error(attempt.message);
            else {
                if(attempt.win) {
                    console.log(`Вітаю, ти виграв! Загадане число: ${game.number}!\nТи використав ${game.attempts.length} із ${result.attempts}!`);
                    break;
                }
                else {
                    var attempts = game.attempts.length; // відрахунок в масиві починається з нуля, але властивість length повертає кількість :)
                    if(attempts >= result.attempts) {
                        console.log(`На жаль ти програв :(\nЗагадане число: ${game.number}`);
                        break;
                    }
                    else {
                        if(result.prompts) console.log(`Ви не вгадали! Загадане число ${currentNumber < game.number ? 'більше' : 'менше'} вашого!\nПопробуйте ще раз, у вас залишилось ${result.attempts - attempts} спроб!`);
                        else console.log(`Ви не вгадали! Попробуйте ще раз, у вас залишилось ${result.attempts - attempts} спроб!`);
                    }
                }
            }
        }
    }
});