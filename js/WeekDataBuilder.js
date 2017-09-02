var WeekDataBuilder = /** @class */ (function () {
    function WeekDataBuilder(data) {
        this.maxWeek = 12;
        this.disabledClass = 'disabled';
        this.currentWeek = 5;
        this.previousWeekButton = document.getElementsByClassName('js-week-previous')[0];
        this.nextWeekButton = document.getElementsByClassName('js-week-next')[0];
        this.weekCurrent = document.getElementsByClassName('js-week-current')[0];
        this.dataTableContainer = document.getElementById('mealPlan');
        this.data = data;
        this.initWeekChooser();
    }
    WeekDataBuilder.prototype.initWeekChooser = function () {
        var _this = this;
        this.previousWeekButton.onclick = function () {
            if (_this.currentWeek > 1) {
                _this.currentWeek--;
                _this.updateCurrentWeek();
            }
        };
        this.nextWeekButton.onclick = function () {
            if (_this.currentWeek < _this.maxWeek) {
                _this.currentWeek++;
                _this.updateCurrentWeek();
            }
        };
        this.updateCurrentWeek();
    };
    WeekDataBuilder.prototype.updateCurrentWeek = function () {
        this.weekCurrent.innerText = 'Week ' + this.currentWeek;
        this.updateWeekButtons();
        if (this.data) {
            this.buildWeekDataTable();
        }
    };
    WeekDataBuilder.prototype.updateWeekButtons = function () {
        if (this.currentWeek <= 1) {
            this.previousWeekButton.classList.add(this.disabledClass);
        }
        else if (this.currentWeek >= this.maxWeek) {
            this.nextWeekButton.classList.add(this.disabledClass);
        }
        else {
            this.previousWeekButton.classList.remove(this.disabledClass);
            this.nextWeekButton.classList.remove(this.disabledClass);
        }
    };
    WeekDataBuilder.prototype.buildWeekDataTable = function () {
        var tableHtml = "<table>";
        tableHtml += "<tr>";
        tableHtml += "<th></th>";
        for (var dayIndex = 1; dayIndex <= 7; dayIndex++) {
            var currentDay = (this.currentWeek - 1) * 7 + dayIndex;
            tableHtml += "<th>DAY " + currentDay + "</th>";
        }
        tableHtml += "</tr>";
        for (var _i = 0, _a = this.data.allMealHours; _i < _a.length; _i++) {
            var mealHour = _a[_i];
            tableHtml += this.getDataRowForHour(this.data, mealHour);
        }
        tableHtml += this.getFooterRows(this.data.mealPlan);
        tableHtml += "</table>";
        this.dataTableContainer.innerHTML = tableHtml;
    };
    WeekDataBuilder.prototype.getDataRowForHour = function (data, hour) {
        var rowHtml = "<tr>";
        rowHtml += "<td>" + hour + "</td>";
        for (var _i = 0, _a = data.mealPlan; _i < _a.length; _i++) {
            var weekDay = _a[_i];
            if (weekDay.isGuiltFreeDay) {
                var isFirstCellForGuiltFreeDay = data.allMealHours[0] === hour;
                if (isFirstCellForGuiltFreeDay) {
                    rowHtml += "<td class=\"guiltFreeDay\" rowspan=\"" + data.allMealHours.length + "\">\n                            <img src=\"./images/getresponse_task%5B1%5D%5B1%5D_59.png\" alt=\"guilt_free_day\">\n                            <img src=\"./images/smile.png\" alt=\"smile\">\n                        </td>";
                }
            }
            else {
                var cellHtml = "";
                var mealItem = weekDay.meals.filter(function (x) { return x.hours == hour; })[0];
                if (mealItem != null) {
                    cellHtml = "<span>" + mealItem.meal + "</span>";
                }
                rowHtml += "<td>" + cellHtml + "</td>";
            }
        }
        rowHtml += "</tr>";
        return rowHtml;
    };
    WeekDataBuilder.prototype.getFooterRows = function (weekDays) {
        var footerRows = "<tr>";
        footerRows += "<td></td>";
        for (var _i = 0, weekDays_1 = weekDays; _i < weekDays_1.length; _i++) {
            var weekDay = weekDays_1[_i];
            if (weekDay.isGuiltFreeDay) {
                footerRows += "<td rowspan=\"2\"><img src=\"./images/print.png\" alt=\"print\"><span>Print</span></td>";
            }
            else {
                footerRows += "<td>" + weekDay.dietType + "</td>";
            }
        }
        footerRows += "</tr>";
        footerRows += "<tr>";
        footerRows += "<td><span>Workout</span><img src=\"./images/workoutArrow.png\" alt=\"arrow\"></td>";
        for (var _a = 0, weekDays_2 = weekDays; _a < weekDays_2.length; _a++) {
            var weekDay = weekDays_2[_a];
            if (weekDay.isGuiltFreeDay === false) {
                if (weekDay.workoutToDo) {
                    if (weekDay.workoutDone) {
                        footerRows += "<td>\n                            <img src=\"./images/workoutDone.png\" alt=\"workout_done\">\n                            <img src=\"./images/workoutDoneTick.png\" alt=\"tick\">\n                        </td>";
                    }
                    else {
                        footerRows += "<td><img src=\"./images/workout.png\" alt=\"workout_to_do\"></td>";
                    }
                }
            }
        }
        footerRows += "</tr>";
        return footerRows;
    };
    return WeekDataBuilder;
}());
