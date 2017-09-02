
interface IMealPlan {
    allMealHours: string[];
    mealPlan: IWeekDay[];
}
interface IWeekDay{
    day: number;
    dietType: string;
    workoutToDo: boolean;
    workoutDone: boolean;
    isGuiltFreeDay: boolean;
    meals: IMeal[];
}
interface IMeal {
    hours: string;
    meal: string;
    eaten: boolean;
}

class WeekDataBuilder {

    private readonly maxWeek = 12;
    private readonly disabledClass = 'disabled';
    private currentWeek = 5;
    private previousWeekButton: any = document.getElementsByClassName('js-week-previous')[0];
    private nextWeekButton: any = document.getElementsByClassName('js-week-next')[0];
    private weekCurrent: any = document.getElementsByClassName('js-week-current')[0];
    private dataTableContainer: any = document.getElementById('mealPlan');
    private data: IMealPlan;

    constructor(data: IMealPlan) {
        this.data = data;
        this.initWeekChooser();
    }

    private initWeekChooser() {
        this.previousWeekButton.onclick = () => {
            if (this.currentWeek > 1) {
                this.currentWeek--;
                this.updateCurrentWeek();
            }
        };
        this.nextWeekButton.onclick = () => {
            if (this.currentWeek < this.maxWeek) {
                this.currentWeek++;
                this.updateCurrentWeek();
            }
        };
        this.updateCurrentWeek();
    }

    private updateCurrentWeek() {
        this.weekCurrent.innerText = 'Week ' + this.currentWeek;
        this.updateWeekButtons();
        if(this.data){
            this.buildWeekDataTable();
        }
    }

    private updateWeekButtons() {
        if (this.currentWeek <= 1) {
            this.previousWeekButton.classList.add(this.disabledClass);
        }
        else if (this.currentWeek >= this.maxWeek) {
            this.nextWeekButton.classList.add(this.disabledClass);
        } else {
            this.previousWeekButton.classList.remove(this.disabledClass);
            this.nextWeekButton.classList.remove(this.disabledClass);
        }
    }

    private buildWeekDataTable() {
        var tableHtml = "<table>";

        tableHtml += "<tr>"
        tableHtml += "<th></th>"
        for (var dayIndex = 1; dayIndex <= 7; dayIndex++) {
            var currentDay = (this.currentWeek - 1) * 7 + dayIndex;
            tableHtml += `<th>DAY ${currentDay}</th>`;
        }
        tableHtml += "</tr>";

        for (let mealHour of this.data.allMealHours) {
            tableHtml += this.getDataRowForHour(this.data, mealHour);
        }
        tableHtml += this.getFooterRows(this.data.mealPlan);

        tableHtml += "</table>";

        this.dataTableContainer.innerHTML = tableHtml;
    }

    private getDataRowForHour(data: IMealPlan, hour: string): string{
        var rowHtml = "<tr>";
        rowHtml += `<td>${hour}</td>`;
        for (let weekDay of data.mealPlan) {
            if(weekDay.isGuiltFreeDay){
                var isFirstCellForGuiltFreeDay = data.allMealHours[0] === hour;
                if(isFirstCellForGuiltFreeDay) {
                    rowHtml += `<td class="guiltFreeDay" rowspan="${data.allMealHours.length}">
                            <img src="./images/getresponse_task%5B1%5D%5B1%5D_59.png" alt="guilt_free_day">
                            <img src="./images/smile.png" alt="smile">
                        </td>`;
                }
            } else {
                var cellHtml = "";
                var mealItem = weekDay.meals.filter(x => x.hours == hour)[0];
                if(mealItem != null) {
                    cellHtml = `<span>${mealItem.meal}</span>`;
                }
                rowHtml += `<td>${cellHtml}</td>`;
            }
        }
        rowHtml += "</tr>";
        return rowHtml;
    }

    private getFooterRows(weekDays: IWeekDay[]): string{
        var footerRows = "<tr>";

        footerRows += "<td></td>";
        for(let weekDay of weekDays){
            if(weekDay.isGuiltFreeDay){
                footerRows += `<td rowspan="2"><img src="./images/print.png" alt="print"><span>Print</span></td>`;
            } else {
                footerRows += `<td>${weekDay.dietType}</td>`;
            }
        }
        footerRows += "</tr>";

        footerRows += "<tr>";
        footerRows += `<td><span>Workout</span><img src="./images/workoutArrow.png" alt="arrow"></td>`;
        for(let weekDay of weekDays){
            if(weekDay.isGuiltFreeDay === false){
                if(weekDay.workoutToDo){
                    if(weekDay.workoutDone) {
                        footerRows += `<td>
                            <img src="./images/workoutDone.png" alt="workout_done">
                            <img src="./images/workoutDoneTick.png" alt="tick">
                        </td>`;
                    } else {
                        footerRows += `<td><img src="./images/workout.png" alt="workout_to_do"></td>`;
                    }
                }
            }
        }
        footerRows += "</tr>";

        return footerRows;
    }
}