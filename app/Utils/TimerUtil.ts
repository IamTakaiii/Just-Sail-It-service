class Timer {
	public static sleep(ms: number) {
		let timerId: any
		let endTimer: any
		class TimedPromise extends Promise<any> {
			isCanceled: boolean = false;
			cancel = () => {
				endTimer();
				clearTimeout(timerId);
				this.isCanceled = true;
			};
			constructor(fn: { (resolve: any): void; (resolve: (value: any) => void, reject: (reason?: any) => void): void; }) {
				super(fn);
			}
		}
		return new TimedPromise((resolve: any) => {
			endTimer = resolve;
			timerId = setTimeout(endTimer, ms);
		});
	}
}

export default Timer
