window.onload = function () {
    const maxWeek = 12,
        disabledClass = "disabled",
        selectedDay = 2,
        guiltFree = "GUILT FREE";
    var currentWeek = 5,
        previousWeekButton = document.getElementsByClassName('js-week-previous')[0],
        nextWeekButton = document.getElementsByClassName('js-week-next')[0];

    var buildTable = function () {
        var tableHtml = "<table>";
        tableHtml += getTableHeader(getFirstDayOfTheWeek());
        tableHtml += getMeals();
        tableHtml += getDietType();
        tableHtml += getWorkoutData();
        tableHtml += "</table>";
        return tableHtml;
    };

    var displayTable = function () {
        var tableDisplayed = buildTable();
        var tablePlaceHolder = document.getElementsByClassName("table-place-holder")[0];
        tablePlaceHolder.innerHTML = tableDisplayed;
    };

    var getTableHeader = function (firstDayOfTheWeek) {
        var tableHeader = "<tr>";
        tableHeader += "<th class='" + getClassForSelectedCell(0) + "'></th>";
        for (var dayNumber = 1; dayNumber <= 7 ; dayNumber++) {
            tableHeader += "<th class='table-header-day " + getClassForSelectedCell(dayNumber) + "'>DAY <span class='week-day-number'>" + firstDayOfTheWeek++ + "</span></th>";
        }
        tableHeader += "</tr>";
        return tableHeader;
    };

    var getClassForSelectedCell = function(dayNumber) {
        if(dayNumber === selectedDay - 1){
            return "selected-yesterday";
        } else if(dayNumber === selectedDay) {
            return "selected";
        } else {
            return "";
        }
    };

    var getMeals = function () {
        var meals = "";
        for (var i = 0; i < mealHours.length; i++) {
            meals += "<tr>";
            meals += getMealsByHour(mealHours[i], i);
            meals += "</tr>"
        }
        return meals;
    };

    var getMealsByHour = function (hour, hourId) {
        var mealsByHours = "<td class='" + getClassForSelectedCell(0) + "'><span class='time-table'>" + hour + "</span></td>";
        for (var i = 0; i < mealPlan.length; i++) {
            var dayPlan = mealPlan[i],
                hourSpecificMeal = dayPlan.meals[hourId];
            if (dayPlan.dietType !== guiltFree) {
                mealsByHours += getMealHtml(hourSpecificMeal, dayPlan.day);
            }
            else if (hour === mealHours[0]) {
                mealsByHours += getGuiltFreeDayTemplateHtml();
            }
        }
        return mealsByHours;
    };

    var getMealHtml = function (hourSpecificMeal, currentDay) {
        var mealId = hourSpecificMeal.mealId,
            wasEaten = hourSpecificMeal.eaten,
            mealName = hourSpecificMeal.meal;

        var mealHtml = "<td class='meal-cell " + getClassForSelectedCell(currentDay) + "'><div class='cell-data-container'>";

        if (wasEaten === true) {
            mealHtml += "<img class='was-eaten' src='./images/mealEaten.png' alt='tick'>";
        }
        mealHtml += "<span class='cell-data-meal'>" + mealName + "</span>";
        if (mealId === 1) {
            if (currentDay === selectedDay) {
                mealHtml += "<img class='shake-picture' src=\"./images/todaysShake.png\" alt=\"shake\">";
            } else {
                mealHtml += "<img class='shake-picture' src=\"./images/shake.png\" alt=\"shake\">";
            }
        }
        mealHtml += "</div></td>";
        return mealHtml;
    };

    var getDietType = function () {
        var dietType = "<tr class='diet-type-tr'>";
        dietType = "<td class='" + getClassForSelectedCell(0) + "'></td>";
        for (var i = 0; i < mealPlan.length; i++) {
            var dailyMealPlan = mealPlan[i];
            var classForSelectedCell = getClassForSelectedCell(dailyMealPlan.day);
            if (dailyMealPlan.dietType === guiltFree) {
                dietType += "<td rowspan=\"2\" class='" + classForSelectedCell + "'><img src=\"./images/print.png\" alt=\"print\"/><span class='print'>Print</span></td>";
            } else {
                dietType += "<td class='diet-type-cell " + classForSelectedCell + "'>" + dailyMealPlan.dietType + "</td>";
            }
        }
        dietType += "</tr>";
        return dietType;
    };

    var getWorkoutData = function () {
        var workout = "<tr class='workout-tr'>";
        workout += "<td class='" + getClassForSelectedCell(0) + "'><span class='workout'>Workout</span><img src='./images/workoutArrow.png' alt='arrow'></td>";
        for (var i = 0; i < mealPlan.length; i++) {
            var dailyWorkout = mealPlan[i];
            if(dailyWorkout.dietType !== guiltFree){
                var classForSelectedCell = getClassForSelectedCell(dailyWorkout.day);
                if(dailyWorkout.workoutToDo === true && dailyWorkout.workoutDone === true) {
                    workout +=
                        "<td class='workout-to-do " + classForSelectedCell +  "'>" +
                        "<img src='./images/workoutDone.png' alt='workoutDone'>" +
                        "<img class='workout-done' src='./images/workoutDoneTick.png' alt='tick'>" +
                        "</td>";
                } else if (dailyWorkout.workoutToDo === true && dailyWorkout.workoutDone === false) {
                    workout +=
                        "<td class='workout-to-do " + classForSelectedCell + "'>" +
                        "<img src='./images/workout.png' alt='workoutToDo'>" +
                        "</td>";
                } else {
                    workout += "<td class='workout-to-do " + classForSelectedCell + "'>" + dailyWorkout.workoutToDo + "</td>";
                }
            }
        }
        workout += "</tr>";
        return workout;
    };

    var getGuiltFreeDayTemplateHtml = function () {
        var guiltFreeDay =
            "<td class='guilt-free-day' rowspan=\"5\"><img src=\"./images/guiltfreeday.png\" alt=\"guilt_free_day\">" +
            "<img src=\"./images/smile.png\" alt=\"smile\"></td>";
        return guiltFreeDay;
    };

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
        var weekDays = document.getElementsByClassName('week-day-number');
        for (var i = 0; i < weekDays.length; i++) {
            var day = weekDays[i];
            day.innerText = getFirstDayOfTheWeek() + i;
        }
        updateWeekButtons();
    };
    var getFirstDayOfTheWeek = function () {
        return (currentWeek - 1) * 7 + 1;
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
    displayTable();
};

var mealPlan = [
    {
        "day": 1,
        "dietType": "LOW-CARB",
        "workoutToDo": true,
        "workoutDone": true,
        "meals": [
            { "mealNumber": 0, "mealId": 1, "meal": "Bod•ē Shake", "eaten": true },
            { "mealNumber": 1, "mealId": 2, "meal": "Ham and Swiss Roll Ups ", "eaten": true },
            { "mealNumber": 2, "mealId": 3, "meal": "Turkey Melt", "eaten": true },
            { "mealNumber": 3, "mealId": 4, "meal": "Bod•ē Burn with Mozzarella and Tomato Slices ", "eaten": true },
            { "mealNumber": 4, "mealId": 5, "meal": "Turkey Melt", "eaten": false }
        ]
    },
    {
        "day": 2,
        "dietType": "LOW-CARB",
        "workoutToDo": true,
        "workoutDone": true,
        "meals": [
            { "mealNumber": 0, "mealId": 1, "meal": "Bod•ē Shake", "eaten": false },
            { "mealNumber": 1, "mealId": 2, "meal": "Ham and Swiss Roll Ups ", "eaten": false },
            { "mealNumber": 2, "mealId": 3, "meal": "Turkey Melt", "eaten": false },
            { "mealNumber": 3, "mealId": 4, "meal": "Bod•ē Burn with Mozzarella and Tomato Slices ", "eaten": false },
            { "mealNumber": 4, "mealId": 3, "meal": "Turkey Melt", "eaten": false }
        ]
    },
    {
        "day": 3,
        "dietType": "HIGH-CARB",
        "workoutToDo": true,
        "workoutDone": false,
        "meals": [
            { "mealNumber": 0, "mealId": 1, "meal": "Bod•ē Shake", "eaten": false },
            { "mealNumber": 1, "mealId": 5, "meal": "Grilled Steak (HC)", "eaten": false },
            { "mealNumber": 2, "mealId": 1, "meal": "Bod•ē Shake", "eaten": false },
            { "mealNumber": 3, "mealId": 6, "meal": "Bod•ē Burn and Whole-Wheat English Muffin with Butter Spray ", "eaten": false },
            { "mealNumber": 4, "mealId": 7, "meal": "Garlic Lime Chicken (HC)", "eaten": false }
        ]
    },
    {
        "day": 4,
        "dietType": "LOW-CARB",
        "workoutToDo": true,
        "workoutDone": false,
        "meals": [
            { "mealNumber": 0, "mealId": 1, "meal": "Bod•ē Shake", "eaten": false },
            { "mealNumber": 1, "mealId": 2, "meal": "Ham and Swiss Roll Ups ", "eaten": false },
            { "mealNumber": 2, "mealId": 3, "meal": "Turkey Melt", "eaten": false },
            { "mealNumber": 3, "mealId": 4, "meal": "Bod•ē Burn with Mozzarella and Tomato Slices ", "eaten": false },
            { "mealNumber": 4, "mealId": 5, "meal": "Turkey Melt", "eaten": false }
        ]
    },
    {
        "day": 5,
        "dietType": "LOW-CARB",
        "workoutToDo": true,
        "workoutDone": false,
        "meals": [
            { "mealNumber": 0, "mealId": 1, "meal": "Bod•ē Shake", "eaten": false },
            { "mealNumber": 1, "mealId": 2, "meal": "Ham and Swiss Roll Ups ", "eaten": false },
            { "mealNumber": 2, "mealId": 3, "meal": "Turkey Melt", "eaten": false },
            { "mealNumber": 3, "mealId": 4, "meal": "Bod•ē Burn with Mozzarella and Tomato Slices ", "eaten": false },
            { "mealNumber": 4, "mealId": 5, "meal": "Turkey Melt", "eaten": false }
        ]
    },
    {
        "day": 6,
        "dietType": "HIGH-CARB",
        "workoutToDo": true,
        "workoutDone": false,
        "meals": [
            { "mealNumber": 0, "mealId": 1, "meal": "Bod•ē Shake", "eaten": false },
            { "mealNumber": 1, "mealId": 5, "meal": "Grilled Steak (HC)", "eaten": false },
            { "mealNumber": 2, "mealId": 1, "meal": "Bod•ē Shake", "eaten": false },
            { "mealNumber": 3, "mealId": 6, "meal": "Bod•ē Burn and Whole-Wheat English Muffin with Butter Spray ", "eaten": false },
            { "mealNumber": 4, "mealId": 7, "meal": "Garlic Lime Chicken (HC)", "eaten": false }
        ]
    },
    {
        "day": 7,
        "workoutToDo": false,
        "workoutDone": false,
        "dietType": "GUILT FREE",
        "meals": []
    },

];

var mealHours = [
    "6:00 AM",
    "9:00 AM",
    "12:00 PM",
    "3:00 PM",
    "6:00 PM"
];


