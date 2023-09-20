//global declaration of the spreadsheet ID
const ID = [insert your own gspreadsheet ID here];
//global declaration of current identity level cap
const IDENTITY_LEVEL_CAP = 35;

//add buttons to load new ID or EGO
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Import Data')
      .addItem('Import New Identity', 'importIdentity')
      .addItem('Import New EGO', 'getEgoData')
      .addSeparator()
      .addItem('Rebuild Identities', 'rebuildIdentities')
      .addItem('Rebuild EGOs', 'rebuildEGOs')
      .addItem('Rebuild Collection', 'rebuildCollection')
      .addSeparator()
      .addItem('Sidebar', 'customSidebar')
      .addToUi();
}

function rebuildIdentities() {
  var unit_ids = getIDs();

  importFactory("Identities", createIDArray(unit_ids), 2, 19);
  importFactory("Identity Skills", createIDSkillArray(unit_ids), 1, 20);
  importFactory("Identity Passives", createIDPassiveArray(unit_ids), 1, 12);

  replaceImages("Identities", 2);
  replaceImages("Identity Skills", 1);
  replaceImages("Identity Skills", 2);
  replaceImages("Identity Passives", 1);
}

function rebuildEGOs() {
  var ego_ids = getEGOs();

  importFactory("EGO", createEGOArray(ego_ids), 2, 23);
  importFactory("EGO Skills", createEGOSkillArray(ego_ids), 1, 22);
  importFactory("EGO Passives", createEGOPassiveArray(ego_ids), 1, 6);

  replaceImages("EGO", 2);
  replaceImages("EGO Skills", 1);
  replaceImages("EGO Passives", 1);
}

function rebuildCollection()
{
  importCollection();
  importFactory("Sheet6", createCollection(getIDs(),getEGOs()), 3, 1);

  replaceImages("Sheet6", 3);
  replaceImages("Sheet6", 4);
  replaceImages("Sheet6", 5);
  replaceImages("Sheet6", 6);
  replaceImages("Sheet6", 7);
  replaceImages("Sheet6", 8);
  replaceImages("Sheet6", 9);
}
