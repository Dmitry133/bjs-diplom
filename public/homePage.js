"use strict";

//logout

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        };
    });
};

//User profile widget

ApiConnector.current(response => {
    //console.log(response);
    if (response.success === true) {
        //console.log(response.data.login)
        ProfileWidget.showProfile(response.data);
    };
});

//Exchange Rates

const ratesBoard = new RatesBoard();

let count = 0;
const exchangeRates = () => {
    ApiConnector.getStocks(response => {
       if (response.success === true) {
           ratesBoard.clearTable();
           ratesBoard.fillTable(response.data);
           count++;
           console.log("обновил " + count)
       } ;
    });
};

exchangeRates();
setInterval(() => exchangeRates(), 60000);

// Операции с деньгами

//Зачисление

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data,response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true,"Деньги успешено зачислены!");
        } else {
            moneyManager.setMessage(false, response.error);
        };
    });
};

// Конвертирование

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true,"Конвертирование прошло успешено!");
        } else {
            moneyManager.setMessage(false, response.error);
        };
    });
};

//Перевод

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {
     if (response.success === true) {
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true,"Перевод совершен успешно!");
     } else {
         moneyManager.setMessage(false, response.error);
     };
  });
};

//Работа с избранным

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});

// добавить

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true,"Новый пользователь добавлен в список!");
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};

// удалить

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.setMessage(true,"Пользователь удален из список!");
        } else {
            favoritesWidget.setMessage(false, response.error);
        };
    });
};


