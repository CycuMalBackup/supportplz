window.onload = function () {
    const maxWeek = 12,
        disabledClass = 'disabled';
    var currentWeek = 5,
        previousWeekButton = document.getElementsByClassName('js-week-previous')[0],
        nextWeekButton = document.getElementsByClassName('js-week-next')[0];

    var buildTable = function () {
        var tableHtml = "<table>";
        tableHtml += getMealsTimeHtml();
        tableHtml += getDailyMealPlan();

        tableHtml += "</table>";
return tableHtml;
    };
var displayTable = function () {
  var tableDisplayed = buildTable();
  var tablePlaceHolder = document.getElementsByClassName("tablePlaceHolder")[0];
  tablePlaceHolder.innerHTML = tableDisplayed;
};

    var getDailyMealPlan = function () {
        var dailyMealPlanHtml = "";
        for (var i = 0; i < mealPlan.length; i ++) {
            var dailyPlan = mealPlan[i];
            var dayNumber = parseInt(mealPlan.day) + (currentWeek * 7);
            if (dailyPlan.dietType === "LOW CARB") {
                dailyMealPlanHtml += getLowCarbDayTemplateHtml(dayNumber);
            } else if (dailyPlan.dietType === "HIGH CARB") {
                dailyMealPlanHtml += getHighCarbDayTemplateHtml(dayNumber);
            } else {
                dailyMealPlanHtml += getGuiltFreeDayTemplateHtml(dayNumber)
            }
        } return dailyMealPlanHtml;
    };

    var getMealsTimeHtml = function () {
        var tableHours =
            "<tr><th></th></tr>" +
            "<tr><td>6:00 AM</td></tr>" +
            "<tr><td>9:00 AM</td></tr>" +
            "<tr><td>12:00 PM</td></tr>" +
            "<tr><td>3:00 PM</td></tr>" +
            "<tr><td>6:00 PM</td></tr>" +
            "<tr><td></td></tr>" +
            "<tr><td><span>Workout</span><img src='../images/workoutArrow.png' alt='arrow'></td></tr>";
        return tableHours;
    };

    var getLowCarbDayTemplateHtml = function(dayNumber) {
        var lowCarbDay =
            "<tr><th>DAY <span class=\"week-day-number\">" + dayNumber + "</span></th></tr>" +
            "<tr><td>Bod•ē Shake <img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'><span class='shake-img'></span></td></tr>" +
            "<tr><td>Ham and Swiss Roll Ups<img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'></td></tr>" +
            "<tr><td>Turkey Melt<img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'></td></tr>" +
            "<tr><td>Bod•ē Burn with Mozzarella and Tomato Slices<img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'></td></tr>" +
            "<tr><td>Turkey Melt<img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'></td></tr>" +
            "<tr><td>LOW-CARB</td></tr>" +
            "<tr><td><span class='workout-done'></span></td></tr>";
        return lowCarbDay;
    };
    var getHighCarbDayTemplateHtml = function(dayNumber) {
        var highCarbDay =
            "<tr><th>DAY <span class=\"week-day-number\">" + dayNumber + "</span></th></tr>" +
            "<tr><td>Bod•ē Shake <img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'><span class='shake-img'></span></td></tr>" +
            "<tr><td>Grilled Steak (HC) <img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'></td></tr>" +
            "<tr><td>Bod•ē Shake <img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'><span class='shake-img'></span></td></tr>" +
            "<tr><td>Bod•ē Burn and Whole-Wheat English Muffin with Butter Spray <img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'></td></tr>" +
            "<tr><td>Garlic Lime Chicken (HC) <img class='was-eaten hidden' src='../images/mealEaten.png' alt='tick'></td></tr>" +
            "<tr><td>HIGH-CARB</td></tr>" +
            "<tr><td><span class='workout-done'></span></td></tr>";
        return highCarbDay;
    };
    var getGuiltFreeDayTemplateHtml = function(dayNumber) {
        var guiltFreeDay =
            "<tr><th>DAY <span class=\"week-day-number\">" + dayNumber + "</span></th></tr>" +
            "<td class=\"guiltFreeDay\" rowspan=\"5\"><img src=\"../images/guiltfreeday.png\" alt=\"guilt_free_day\">" +
            "<img src=\"../images/smile.png\" alt=\"smile\"></td>";
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
    displayTable();
};

var mealPlan = [
    {
        "day": "1",
        "dietType": "LOW CARB",
        "workoutToDo": "true",
        "workoutDone": "true"
    },
    {
        "day": "2",
        "dietType": "LOW CARB",
        "workoutToDo": "true",
        "workoutDone": "true"
    },
    {
        "day": "3",
        "dietType": "HIGH CARB",
        "workoutToDo": "true",
        "workoutDone": "false"
    },
    {
        "day": "4",
        "dietType": "LOW CARB",
        "workoutToDo": "true",
        "workoutDone": "false"
    },
    {
        "day": "5",
        "dietType": "LOW CARB",
        "workoutToDo": "true",
        "workoutDone": "false"
    },
    {
        "day": "6",
        "dietType": "HIGH CARB",
        "workoutToDo": "true",
        "workoutDone": "false"
    },
    {
        "day": "7",
        "dietType": "GUILT FREE",
        "workoutToDo": "false",
        "workoutDone": "false"

    }
];

var mealsToImg = [
    {
        "mealId": "1",
        "imgToHtml": "<img src=\"./images/shake.png\" alt=\"shake\">"
    }
];


