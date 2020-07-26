import { Journal } from 'edjr'
import { ScanOptions } from 'edjr/dist/journal' // todo fix this
import { Queue } from './queue'

export default (
  discardEvents: string[],
  queue: Queue, 
  scanOptions: ScanOptions) => {

  const journal = new Journal()
  journal.on('*', (e) => {
    const { event } = e
    if (!discardEvents.find(event)) { // todo here filter dates
      queue.submit(e)
    }
  })
}