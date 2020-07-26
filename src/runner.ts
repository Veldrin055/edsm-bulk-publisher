import { prompt } from 'enquirer'
import client from './client'

export default async () => {
  
  const { apiKey, journalDir, fromBeginning } = await prompt([
    {
      type: 'input',
      name: 'apiKey',
      message: "What's your EDSM API key?",
    },
    {
      type: 'input',
      name: 'journalDir',
      message: 'Elite Dangerous journal dir path (skip to use default)',  
    },
    {
      type: 'confirm',
      name: 'fromBeginning',
      message: 'Do you want to start scanning from the beginning?'
    },
  ])
  
  const discardEvents = await client.getDiscard()

  
  console.log('apiKey', apiKey)
  console.log('dir', journalDir)
  console.log(discardEvents)
}


