function createCollection(sinnerData, egoData)
{
  sinner = createIDArray(sinnerData)
  ego = createEGOArray(egoData)

  var finalized = new Array(24);
  var temp;

  for( var i = 0; i < finalized.length; i++)
  {
    temp = sinner[0][1]

    finalized[i] = sinner.filter((x) => {
      return x[1] === temp;
    })

    i++;

    finalized[i] = ego.filter((x) => {
      return x[1] === temp;
    })

    sinner = sinner.filter((x) => {
      return x[1] !== temp;
    })

    ego = ego.filter((x) => {
      return x[1] !== temp;
    })
  }

  return finalized;
}

function createCollectionImages(data)
{
  return data.map(sinner => {
    return sinner.map(item => {
      return item[0]
    })
  })
}
