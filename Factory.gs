function importFactory(target_sheet, payload_data, init_col, fin_col)
{
  //open the spreadsheet
  var source = SpreadsheetApp.openById(ID);

  //insert data into Identities sheet
  var sheet = source.getSheetByName(target_sheet);

  if(target_sheet != "Sheet6")
  {
    //2 = Row 2 | 3 = Col C | End Row | End Col
    sheet.getRange(2,init_col,payload_data.length.toFixed(0),fin_col).setValues(payload_data);
  }
  else if(target_sheet === "Sheet6")
  {
    var collectionImages = createCollectionImages(payload_data);

    //init_col acts as initial column, but final_col acts as final row
    collectionImages.forEach((x,i) => {
      sheet.getRange(2+(3*i),init_col,fin_col,x.length.toFixed(0)).setValues([x]);
    })
  }
}
