
const api = 'http://127.0.0.1:3001/'

export const itemgroup = () => {
	return fetch(api + 'itemgrp', {
      method: 'GET'
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data.data
    })
}

export const clusterdtw = (data) => {
  return fetch(api + 'clusterdtw', {
	// return fetch(api + 'clusterdtw2', {
      method: 'POST',
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify({'year': data.year,'cluster': data.cluster, 'itemgrp': data.itemgrp})
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data.data
    })
}

export const datasets = (data) => {
	return fetch(api + 'datasets', {
      method: 'POST',
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify({'itemgrp': data.itemgrp})
    })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data.data
    })
}

export const rkpCluster = (data) => {
  return fetch(api + 'report/rkpcluster', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    return data
  })
}

// export const rkpAvgClusterData = (data) => {
//   return fetch(api + 'report/rkpavgclusterdata', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then((response) => {
//     return response.json()
//   })
//   .then((data) => {
//     return data
//   })
// }

export const rkpHistoryCluster = (data) => {
  const params = '?startdate=' + data.startdate + '&enddate=' + data.enddate + '&cluster=' + data.cluster
  return fetch(api + 'report/rkphistorycluster' + params, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    return data
  })
}

export const historyCluster = (data) => {
  const params = '?cluster_id=' + data.cluster_id
  return fetch(api + 'report/historycluster' + params, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    return data
  })
}