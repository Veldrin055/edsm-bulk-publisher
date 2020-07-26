import { Journal, JournalEvent } from 'edjr'
import { ScanOptions } from 'edjr/dist/journal' // todo fix this
import Queue from './queue'

export default async (
  discardEvents: string[],
  queue: Queue<string>, 
  scanOptions: ScanOptions) => {

  const journal = new Journal()
  journal.on('*', (e: JournalEvent, historical: boolean) => {
    if (!discardEvents.includes(e.event)) { // todo here filter dates
      queue.submit(JSON.stringify(e))
    }
  })

  return journal.scan({ fromBeginning: scanOptions.fromBeginning })
}