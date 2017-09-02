window.onload = function () {
    const maxWeek = 12,
          disabledClass = 'disabled';
    var currentWeek = 5,
        previousWeekButton = document.getElementsByClassName('js-week-previous')[0],
        nextWeekButton = document.getElementsByClassName('js-week-next')[0];

    var updateWeekButtons = function () {
   
        if (currentWeek <= 1) {
            previousWeekButton.classList.add(disabledClass);
        }
        else if (currentWeek >= maxWeek) {
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