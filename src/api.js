function getAsset(coin) {
  return fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then(res => res.json())
    .then(res => res.data)
}

export default {
 
  getAsset
  // getAssetHistory
}