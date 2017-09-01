window.onload = function () {
    const maxWeek = 12;
    var currentWeek = 5;
    var previousWeekButton = document.getElementsByClassName('js-week-previous')[0];
    var nextWeekButton = document.getElementsByClassName('js-week-next')[0];

    var updateWeekButtons = function () {
        const disabledClass = 'disabled';
        if (currentWeek <= 1) {
            previousWeekButton.classList.add(disabledClass);
        }
        else if (currentWeek >= 12) {
            nextWeekButton.classList.add(disabledClass);
        } else {
            previousWeekButton.classList.remove(disabledClass);
            nextWeekButton.classList.remove(disabledClass);
        }
    };
    var updateCurrentWeek = function () {
        var weekCurrent = document.getElementsByClassName('js-week-current')[0];
        weekCurrent.innerText = 'Week ' + currentWeek;
        updateWeekButtons();
    };

    updateCurrentWeek();

    previousWeekButton.onclick = function () {
        if (currentWeek > 1) {
            currentWeek--;
            updateCurrentWeek();
        }
    };
    nextWeekButton.onclick = function () {
        if (currentWeek < maxWeek) {
            currentWeek++;
            updateCurrentWeek();
        }
    };
};