# Для локального запуска тестов нужно:
  
  0. у вас должен быть установлен Node и npm
  1. создать директорию.
  2. переместить в нее package-lock.json, package.json, test.js
  3. открыть терминал для созданной в пункте (1) директории, ввести следующие команды:
        - npm install request
        - npm install mocha
        - npm install chai
        - npm install mochawesome
  4. ввести в терминале npm test
  5. после результатов теста будете создана директория для репорта mochawesome-report, откройте ее.
  6. локально откройте mochawesome.html в любом браузере, что бы наблюдать report для теста.
