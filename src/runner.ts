import { prompt } from 'enquirer'
import client from './client'
import queue from './queue'
import readJournal from './journal'

export default async () => {
  
  const { apiKey, dir, fromBeginning } = await prompt([
    {
      type: 'input',
      name: 'apiKey',
      message: "What's your EDSM API key?",
    },
    {
      type: 'input',
      name: 'dir',
      message: 'Elite Dangerous journal dir path (skip to use default)',  
    },
    {
      type: 'confirm',
      name: 'fromBeginning',
      message: 'Do you want to start scanning from the beginning?'
    },
  ])
  
  const discardEvents = await client.getDiscard()

  readJournal(discardEvents, queue, { dir, fromBeginning })

  console.log(`Events to process: ${queue.length}`)

  await queue.processQueue((slice) => {
    console.log(slice)
  })

  console.log('Bye!')


}


