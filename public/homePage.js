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

//Exchange Rates (не работает корректно)

const ratesBoard = new RatesBoard();

const exchangeRates = () => {
    ApiConnector.getStocks(response => {
        //console.log(response);
       if (response.success === true) {
           ratesBoard.clearTable();
           ratesBoard.fillTable(response.data);
       } ;
    });

    console.log("я обновился");
};

setInterval(exchangeRates(), 1000); // ???? понять почему не вызывает постоянно????





