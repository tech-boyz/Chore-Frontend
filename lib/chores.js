import fetch from 'node-fetch'

export function getAllChores () {
  return fetch('https://kvpl09fhkj.execute-api.us-west-1.amazonaws.com/Prod/getallchores')
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log(err)
      return {
        message: 'uh oh, it looks like you\'re not conntected to the internet.'
      }
    })
}
