import axios from 'axios'

export type EdsmConfig = {
  commanderName: string
  apiKey: string
}

const fromSoftware = 'edsm-bulk-updater'
const fromSotwareVersion = process.env.npm_package_version

const client = axios.create({
  baseURL: 'https://www.edsm.net/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {

  getDiscard: async () => {
    const { data } = await client.get<string[]>('api-journal-v1/discard')
    return data
  },
  
  upload: async (config: EdsmConfig, message: any[]) => {

    try {
        const { data, status } = await client.post('api-journal-v1', {
        ...config,
        fromSoftware,
        fromSotwareVersion,
        message,
      })
      return { data, status }
    } catch (err) {
      console.log(err.toJson())
      return { data: null, status: err.status }
    }
  },


}