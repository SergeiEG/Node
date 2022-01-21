const colors = require("colors/safe");

const args = process.argv.slice(2);

const regexp = /^(\d+)\-(\d+)\-(\d+)\-(\d+)$/

class Timer {
    constructor(str) {
        this.futureDate = str
    }
    getDateFromArgs(str) {
        let result = str.replace(regexp, (match, hour, day, month, year) => `${year}-${month}-${day}T${hour}`)
        result = result + ':00:00.000'
        let date = Date.parse(result)
        console.log(date)
        return date
    }
    calcTime() {
        let start = Date.now()
        let end = this.getDateFromArgs(this.futureDate)
        console.log(start - end)
    }
}


for (let i = 0; i < args.length; i++) {
    if (regexp.test(args[i])) {
        let timer = new Timer(args[i])
    } else {
        console.log(colors.red(`Введите ${i+1} аргумент в формате час-день-месяц-год`))
    }
}