// задание целевого слова
const targetWord = 'gold';

// определение размера популяции
const populationSize = 100;
const mutationRate = 0.01;
const generations = 1000;

// функция для генерации случайного 5-и буквенного слова
function generateWord() {
    const alfabet = 'abcdefghijklmnopqrstuvwxyz';
    let word = '';
    for (let i = 0; i < 4; i++) {
        const letterIndex = Math.floor(Math.random() * alfabet.length);
        word += alfabet[letterIndex];
    }
    return word;
}

// функция для определения приспособленности слова
function fitness(word) {
    let score = 0;
    for (let i = 0; i < targetWord.length; i++) {
        if (word[i] === targetWord[i]) {
            score++;
        }
    }
    return score;
}

// функция для выбора случайного индивида из популяции
function select(population) {
    const fitnessScores = population.map(fitness);
    const totalScore = fitnessScores.reduce((a, b) => a + b, 0);
    let randomScore = Math.floor(Math.random() * totalScore);
    let i = 0;
    while (randomScore > 0) {
        randomScore -= fitnessScores[i];
        i++;
    }
    return population[i - 1];
}

// функция для скрещивания двух родителей
function crossover(generationN, parent1, parent2) {
    const crossoverPoint = Math.floor(Math.random() * 4);
    if (parent2 === undefined || parent1 === undefined) {
        console.log(`crossover undefined ${parent1} X ${parent2}`);
        parent1 = parent2 = 'aaaa';
    }
    const child = parent1.slice(0, crossoverPoint) + parent2.slice(crossoverPoint);
    console.log(`generationN: ${generationN} crossover: ${parent1} * ${parent2} = ${child}`);

    return child;
}

// функция для мутации слова
function mutate(word) {
    let mutateWord = '';
    for (let i = 0; i < word.length; i++) {
        if (Math.random() < mutationRate) {
            mutateWord += generateWord()[i];
        } else {
            mutateWord += word[i];
        }
    }
    return mutateWord;
}

// создание начальной популяции
let population = [];
for (let i = 0; i < populationSize; i++) {
    population.push(generateWord());
}

// эволюция популяции в течении нескольких поколений
for (let generation = 0; generation < generations; generation++) {
    // создание новой популяции
    let newPopulation = [];
    for (let i = 0; i < populationSize; i++) {
        // выбор двух родителей
        const parent1 = select(population);
        const parent2 = select(population);
        // скрещивание двух родителей
        let child = crossover(generation, parent1, parent2);
        // мутация потомка
        child = mutate(child);
        // добавление потомка в новую популяцию
        newPopulation.push(child);
    }
    // замена старой популяции новой
    population = newPopulation;

    // проверка наличия оптимального слова в популяции
    const optimalIndividual = population.find(word => fitness(word) === targetWord.length);
    if (optimalIndividual) {
        console.log(`Found optimal individual in generation ${generation}: ${optimalIndividual}`);
        break;
    }
}
// вывод результатов
console.log(`Final population: ${population}`);
