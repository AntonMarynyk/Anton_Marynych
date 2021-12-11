Для локального запуска тестов нужно:
  
  0. у вас должен быть установлен Node и npm
  1. создать директорию.
  2. переместить в нее package-lock.json, package.json, pageobjects, test
  3. открыть терминал для созданной в пункте (1) директории, ввести следующие команды:
        - npm install selenium webdriver 
        - npm install selenium-webdriver 
        - npm install chromedriver
        - npm install mocha
        - npm install chai
        - npm install mochawesome
  4. ввести в терминале npm test ./test/homepage.js
  5. после результатов теста будете создана директория для репорта mochawesome-report, откройте ее.
  6. локально откройте mochawesome.html в любом браузере, что бы наблюдать report для теста.
