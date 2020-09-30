function getAsset(coin) {
  return fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then(res => res.json())
    .then(res => res.data)
}

function getAssetHistory (coin) {
  const now = new Date()
  const end = now.getTime()
  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
  .then(res => res.json())
  .then(res => res.data)
}

function getAssetMarkets(coin) {
  return fetch(`https://api.coincap.io/v2/assets/${coin}/markets?limit=5`)
  .then(res => res.json())
  .then(res => res.data)
}

function getExChange(id) {
  return fetch(`https://api.coincap.io/v2/exchanges/${id}`)
    .then( res => res.json())
    .then( res => res.data)
}

export default {
 
  getAsset,
  getAssetHistory,
  getAssetMarkets,
  getExChange
}