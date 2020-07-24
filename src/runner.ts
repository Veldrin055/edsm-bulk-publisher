import { Journal } from 'edjr'
import { prompt } from 'enquirer'
import axios from 'axios'

export default async () => {
  const client = axios.create({
    baseURL: 'https://www.edsm.net/',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
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
  
  const { data: discardEvents } = await client.get<string[]>('api-journal-v1/discard')
  
  console.log('apiKey', apiKey)
  console.log('dir', journalDir)
  console.log(discardEvents)
}


