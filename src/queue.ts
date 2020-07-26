export type Queue = {
  submit: (i: any) => void
  processQueue: (callback: (slice: any[]) => void) => Promise<void>
  length: number
}

const arr: any[] = []

const queue: Queue = {
  
  submit: (i) => {
    arr.push(i)
  },

  processQueue: (callback: (slice: any[]) => void) => {
    return new Promise((resolve, reject) => {
      const job = setInterval(() => {
        const slice = arr.splice(0, 50)
        if (!slice) {
          clearInterval(job)
          resolve()
        }
        callback(slice)  
      }, 3000)
    })

  },

  length: arr.length
}

export default queue