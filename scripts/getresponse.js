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

var mealPlan = [
    {
        "day" : "1",
        "dietType" : "LOW CARB",
        "workoutToDo" : "true",
        "workoutDone" : "true",
        "isGuiltFreeDay" : "false",
        "meals" : [
            {"hours" : "6:00 AM", "meal" : "Bod•ē Shake", "eaten" : "true" },
            {"hours" : "9:00 AM", "meal" : "Ham and Swiss Roll Ups ", "eaten" : "true" },
            {"hours" : "12:00 PM", "meal" : "Turkey Melt", "eaten" : "true" },
            {"hours" : "3:00 PM", "meal" : "Bod•ē Burn with Mozzarella and Tomato Slices ", "eaten" : "true" },
            {"hours" : "6:00 PM", "meal" : "Turkey Melt", "eaten" : "false" }
        ]
    },
    {
        "day" : "2",
        "dietType" : "LOW CARB",
        "workoutToDo" : "true",
        "workoutDone" : "true",
        "isGuiltFreeDay" : "false",
        "meals" : [
            {"hours" : "6:00 AM", "meal" : "Bod•ē Shake", "eaten" : "false" },
            {"hours" : "9:00 AM", "meal" : "Ham and Swiss Roll Ups ", "eaten" : "false" },
            {"hours" : "12:00 PM", "meal" : "Turkey Melt", "eaten" : "false" },
            {"hours" : "3:00 PM", "meal" : "Bod•ē Burn with Mozzarella and Tomato Slices ", "eaten" : "false" },
            {"hours" : "6:00 PM", "meal" : "Turkey Melt", "eaten" : "false" }
        ]
    },
    {
        "day" : "3",
        "dietType" : "HIGH CARB",
        "workoutToDo" : "true",
        "workoutDone" : "false",
        "isGuiltFreeDay" : "false",
        "meals" : [
            {"hours" : "6:00 AM", "meal" : "Bod•ē Shake", "eaten" : "false" },
            {"hours" : "9:00 AM", "meal" : "Grilled Steak (HC)", "eaten" : "false" },
            {"hours" : "12:00 PM", "meal" : "Bod•ē Shake", "eaten" : "false" },
            {"hours" : "3:00 PM", "meal" : "Bod•ē Burn and Whole-Wheat English Muffin with Butter Spray ", "eaten" : "false" },
            {"hours" : "6:00 PM", "meal" : "Garlic Lime Chicken (HC)", "eaten" : "false" }
        ]
    },
    {
        "day" : "4",
        "dietType" : "LOW CARB",
        "workoutToDo" : "true",
        "workoutDone" : "false",
        "isGuiltFreeDay" : "false",
        "meals" : [
            {"hours" : "6:00 AM", "meal" : "Bod•ē Shake", "eaten" : "false" },
            {"hours" : "9:00 AM", "meal" : "Ham and Swiss Roll Ups ", "eaten" : "false" },
            {"hours" : "12:00 PM", "meal" : "Turkey Melt", "eaten" : "false" },
            {"hours" : "3:00 PM", "meal" : "Bod•ē Burn with Mozzarella and Tomato Slices ", "eaten" : "false" },
            {"hours" : "6:00 PM", "meal" : "Turkey Melt", "eaten" : "false" }
        ]
    },
    {
        "day" : "5",
        "dietType" : "LOW CARB",
        "workoutToDo" : "true",
        "workoutDone" : "false",
        "isGuiltFreeDay" : "false",
        "meals" : [
            {"hours" : "6:00 AM", "meal" : "Bod•ē Shake", "eaten" : "false" },
            {"hours" : "9:00 AM", "meal" : "Ham and Swiss Roll Ups ", "eaten" : "false" },
            {"hours" : "12:00 PM", "meal" : "Turkey Melt", "eaten" : "false" },
            {"hours" : "3:00 PM", "meal" : "Bod•ē Burn with Mozzarella and Tomato Slices ", "eaten" : "false" },
            {"hours" : "6:00 PM", "meal" : "Turkey Melt", "eaten" : "false" }
        ]
    },
    {
        "day" : "6",
        "dietType" : "HIGH CARB",
        "workoutToDo" : "true",
        "workoutDone" : "false",
        "isGuiltFreeDay" : "false",
        "meals" : [
            {"hours" : "6:00 AM", "meal" : "Bod•ē Shake", "eaten" : "false" },
            {"hours" : "9:00 AM", "meal" : "Grilled Steak (HC)", "eaten" : "false" },
            {"hours" : "12:00 PM", "meal" : "Bod•ē Shake", "eaten" : "false" },
            {"hours" : "3:00 PM", "meal" : "Bod•ē Burn and Whole-Wheat English Muffin with Butter Spray ", "eaten" : "false" },
            {"hours" : "6:00 PM", "meal" : "Garlic Lime Chicken (HC)", "eaten" : "false" }
        ]
    },
    {
        "day" : "7",
        "workoutToDo" : "false",
        "isGuiltFreeDay" : "true"
    }
];
