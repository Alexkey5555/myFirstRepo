let title = document.getElementsByTagName('h1')[0];
let btnResult = document.getElementsByClassName('handler_btn')[0];
let btnClear = document.getElementsByClassName('handler_btn')[1];
let btnSum = document.querySelector('.screen-btn');
let otherItems = document.querySelectorAll('.other-items');
let otherItemsPercent = document.querySelectorAll('.other-items.percent');
let otherItemsNumber = document.querySelectorAll('.other-items.number');
let inputRange = document.querySelector('.rollback > div > [type=range]');
let span = document.querySelector('.rollback > div > .range-value');
let totalInput = document.getElementsByClassName('total-input');

let total = totalInput[0];
let totalCount = totalInput[1];
let totalCountOther = totalInput[2];
let totalFullCount = totalInput[3];
let totalCountRollback = totalInput[4];

let screens = document.querySelectorAll('.screen ');

let congif;
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    isError: false,
    reset: function () {
        screens = document.querySelectorAll('.screen');
        this.screens = [];
        this.screenPrice = 0;
        this.rollback = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        inputRange.value = 0;
        span.textContent = 0 + '%';
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input[type=text]');
            if (index > 0) {
                screen.remove()
            }
            select.value = '';
            input.value = '';
            input.disabled = false;
            select.disabled = false;
        })
        btnSum.disabled = false;
        btnResult.style.display = 'block';
        btnClear.style.display = 'none';
        otherItems.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            if (check.checked) {
                check.checked = false;
            }
        })
        total.value = 0;
        totalCount.value = 0
        totalCountOther.value = 0
        totalFullCount.value = 0
        totalCountRollback.value = 0
    },
    checkValues: function () {
        this.isError = false;
        screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input[type=text]');

            if (select.value === '' || input.value === '') {
                this.isError = true
            }
        })
        if (!this.isError) {
            this.start();
        }
        else {
            alert('заполните поля');
        }
    },
    init: function () {
        this.addTitle();
        inputRange.addEventListener('input', event => {
            span.textContent = event.target.value + '%';
            this.rollback = event.target.value;
        })
        btnResult.addEventListener('click', this.checkValues.bind(appData));
        btnSum.addEventListener('click', this.addScreenBlock);
        btnClear.addEventListener('click', this.reset.bind(appData));
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    showResult: function () {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesNumber + this.servicePricesPercent;
        totalFullCount.value = this.fullPrice;
        btnResult.style.display = 'none';
        btnClear.style.display = 'block';
    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen ');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selecName = select.options[select.selectedIndex].textContent;
            this.screens.push({
                id: index,
                name: selecName,
                price: +select.value * +input.value,
                count: +input.value
            });

            input.disabled = true;
            select.disabled = true;
            btnSum.disabled = true;

        });

    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen)
    },
    addServices: function () {
        otherItemsPercent.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })
        otherItemsNumber.forEach(item => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addPrice: function () {
        let counSum = 0;
        for (let screen of this.screens) {
            this.screenPrice += +screen.price
        }
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
        totalCountRollback.value = this.servicePercentPrice;
        inputRange.addEventListener('input', event => {
            this.rollback = event.target.value;
            this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
            totalCountRollback.value = this.servicePercentPrice;
        })


        for (let key in this.screens) {
            counSum += +this.screens[key].count;
        }
        totalCount.value = counSum;
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrice();

        // appData.getServicePercentPrices();
        // appData.logger()
        this.showResult();

    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        console.log(appData.services);
    }
};
appData.init();