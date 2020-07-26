import { prompt } from 'enquirer'
import client, { EdsmConfig } from './client'
import Queue from './queue'
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

  const config: EdsmConfig = { apiKey, commanderName: 'Veldrin Hedgehog' }
  
  const discardEvents = await client.getDiscard()

  const queue = new Queue<string>()

  await readJournal(discardEvents, queue, { dir, fromBeginning })

  console.log(`Events to process: ${queue.length()}`)

  await queue.processQueue(async (slice) => {
    const { data, status } = await client.upload(config, slice)
    console.log(`${status}: ${JSON.stringify(data)}`)
  })

  console.log('Bye!')


}


