export class TimeUtils {
    static getSecondesOfTime(time: number): number { return time % 60; }
    static getMinutesOfTime(time: number): number { return Math.floor(time / 60); }
    static convertToTime(minutes: number, secondes: number): number { return minutes * 60 + secondes; }
}

