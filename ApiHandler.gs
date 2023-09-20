function handleRequests_(requests)
{
  return UrlFetchApp.fetchAll(requests).map(x => JSON.parse(x.getContentText()));
}

function getEGOs()
{
  var url = 'https://lc-api.kusoge.xyz/ego';

  var ego_data = JSON.parse(UrlFetchApp.fetch(url).getContentText());
  
  return this.handleRequests_(Object.keys(ego_data).map(x => url + '/' + ego_data[x].ego_id)); 
}

function getIDs()
{
  var url = 'https://lc-api.kusoge.xyz/unit';

  var identity_data = JSON.parse(UrlFetchApp.fetch(url).getContentText());

  return this.handleRequests_(Object.keys(identity_data).map(x => url + '/' + identity_data[x].unit_id)); 
}
