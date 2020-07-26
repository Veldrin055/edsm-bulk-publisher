export default class Queue<T> {
  private arr: T[] = []
  
  public submit (i: T): void {
    this.arr.push(i)
  }

  public async processQueue(callback: (slice: T[]) => void) {
    return new Promise((resolve, reject) => {
      const job = setInterval(() => {
        const slice = this.arr.splice(0, 50)
        if (!slice) {
          clearInterval(job)
          resolve()
        }
        callback(slice)  
      }, 3000)
    })

  }

  public length() {
    return this.arr.length
  }

}