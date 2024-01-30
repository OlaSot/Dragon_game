
// console.log(heroesArray);
const heroElements = document.querySelectorAll(".hero");


document.addEventListener("DOMContentLoaded", function () {

    // Находим все элементы с классом "hero" и устанавливаем им id
    const heroElements = document.querySelectorAll(".hero");

    heroElements.forEach((heroElement, index) => {
        if (index < heroesArray.length) {
            const hero = heroesArray[index];
            heroElement.id = `hero-${hero.id}`;
            // console.log(`Hero ${hero.name} clicked`);

            // Добавляем обработчик события клика напрямую к элементу "hero"
            heroElement.addEventListener("click", function () {
                attackDragon(hero.id);
            });
        }
    });
});



//доп. функциональность задача 4
document.addEventListener("keydown", function (event) {
    if (event.key === "d" || event.key === "D") {
        // Увеличиваем урон каждого героя на 10%
        heroesArray.forEach(hero => {
            if (hero.alive) {
                hero.damage = Math.round(hero.damage * 1.10); // Увеличиваем на 10%
            }
        });

        console.log("Damage Boost активирован! Герои наносят на 10% больше урона.");
    }
});

//создаем функцию чтобы обновить данные "о здоровье" в параграфе

const updateHeroHealth = () => {

    heroesArray.forEach(hero => {
        let healthText = hero.currentHP + '/' + hero.maxHP + ' HP' // текст который будет вставлен


        //пишем логику того, что если имя персонажа "такое", то его elementID будет тем, который присущ ему в верстке
        let elementID;
        switch (hero.name) {
            case ("Henriette Healer"):
                elementID = 'healer-health-txt';
                break;
            case "Ariana archer":
                elementID = "archer-health-txt";
                break;
            case "Wyona Warrior":
                elementID = "warrior-health-txt";
                break;

        }
        if (elementID) {
            document.querySelector("#" + elementID).innerText = healthText;
        }
    })
}

updateHeroHealth() //сразу же вызываем, чтобы здоровье обновилось у героев и было равно здоровью из нашего массива

//обновление здоровья дракога 
function updateDragonHealth() {
    const DragonHealth = document.querySelector(".dragon-health-txt")
    DragonHealth.innerText = dragonObject.currentHP + '/' + dragonObject.maxHP + ' HP'
}
updateDragonHealth() //делаем тоже самое для дракона


//Обязательная функциональность задача 1
function attackDragon(heroId) {
    const hero = heroesArray.find(h => h.id === heroId);
    if (hero.alive && dragonObject.alive) {

        dragonObject.currentHP -= hero.damage;


        // Обновить здоровье дракона
        updateDragonHealth();

        // Проверяем здоровье дракона после атаки
        //Обязательная функциональность задача 5

        if (dragonObject.currentHP <= 0) {
            dragonObject.currentHP = 0;
            dragonObject.alive = false;
            // Удаляем дракона из браузера
            const dragonElement = document.querySelector(".dragon-container");
            if (dragonElement) {
                dragonElement.remove();
            }
            // Показываем сообщение о победе
            alert("Поздравляю, вы выиграли игру!");
        } else {
            // Показать сообщение об атаке
            alert(`Герой ${hero.name} нанес ${hero.damage} урона дракону ${dragonObject.name}!`);
            updateHeroState(hero.id);
            dragonAttack();
        }
    }
}


//Обязательная функциональность задача 2

function dragonAttack() {
    // Выбираем только живых героев
    let aliveHeroes = heroesArray.filter(hero => hero.alive);
    if (aliveHeroes.length > 0) {

        // Выбираем случайного героя из списка живых
        let randomHero = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];


        // Уменьшаем здоровье героя на урон, нанесенный драконом
        randomHero.currentHP -= dragonObject.damage;

        //Обязательная функциональность задача 3

        if (randomHero.currentHP <= 0) {
            randomHero.currentHP = 0;
            randomHero.alive = false;

            // Обработка ситуации, когда герой погибает

            updateHeroState(randomHero.id);
        }

        // Обновляем здоровье героя в HTML 
        updateHeroHealth();

        // Отображаем сообщение об атаке
        alert(`${dragonObject.name} атаковал ${randomHero.name}!`);

        // Проверяем условие проигрыша после атаки дракона
        checkGameOver();
    } else {
        // Если живых героев нет, проверяем условие проигрыша
        checkGameOver();
    }
}


function updateHeroState(heroId) {

    const hero = heroesArray.find(h => h.id === heroId);


    if (hero.currentHP <= 0) {

        const heroElement = document.getElementById(`hero-${heroId}`);
        if (heroElement) {

            heroElement.remove();
        }
    }
}


function checkGameOver() {
    // Проверяем, есть ли живые герои
    const aliveHeroes = heroesArray.some(hero => hero.alive);
    
    //Обязательная функциональность задача 4

    if (!aliveHeroes && dragonObject.currentHP > 0) {
        // Убираем всех героев со старницы
        heroesArray.forEach(hero => {
            const heroElement = document.getElementById(`hero-${hero.id}`);
            if (heroElement) {
                heroElement.remove();
            }
        });
        // Показываем сообщение о проигрыше
        alert(`Игра проиграна! ${dragonObject.name} победил!`);
    }
}