function intToRoman(num) 
{
  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const hrns = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const ths = ["", "M", "MM", "MMM"];

  return ths[Math.floor(num / 1000)] + hrns[Math.floor((num % 1000) / 100)] + tens[Math.floor((num % 100) / 10)] + ones[num % 10];
}

//function to Title Case a string
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function replaceImages(sheet_name, column_num) {
  //open the spreadsheet
  var source = SpreadsheetApp.openById(ID);

  var sheet = source.getSheetByName(sheet_name);

  sheet.getRange(2, column_num, sheet.getLastRow() - 1, 1).copyValuesToRange(sheet, column_num, column_num, 2, sheet.getLastRow() - 1);
}

function convertSinner(number)
{
  return number == 1 ? "Yi Sang" : number == 2 ? "Faust" : number == 3 ? "Don Quixote" : number == 4 ? "Ryōshū" : number == 5 ? "Meursault" : number == 6 ? "Hong Lu" : number == 7 ? "Heathcliff" : number == 8 ? "Ishmael" : number == 9 ? "Rodion" : number == 10 ? "Sinclair" : number == 11 ? "Outis" : "Gregor";
}

function cleanSkillDescription(skill_desc) 
{
  return skill_desc.replaceAll("[WinDuel]", "[Clash Win]")
    .replaceAll("[WinDuelAttack]", "[Hit after Clash Win]")
    .replaceAll("[OnSucceedAttackHead]", "[Heads Hit]")
    .replaceAll("[OnSucceedAttack]", "[On Hit]")
    .replaceAll("[WhenUse]", "[On Use]")
    .replaceAll("[OnSucceedAttackTail]", "[Tails Hit]")
    .replaceAll("[EnemyKill]", "[On Kill]")
    .replaceAll("[OnSucceedEvade]", "[On Evade]")
    .replaceAll("[DefeatDuel]", "[Clash Lose]")
    .replaceAll("[StartBattle]", "[Combat Start]")
    .replaceAll("[BeforeAttack]", "[Before Attack]")
    .replaceAll("[ReUseOnSucceedAttackHead]", "[Reuse - Heads Hit]")
    .replaceAll("[CriticalOnSucceedAttack]", "[On Crit]")
    .replaceAll("[EndSkill]", "[After Attack]")
    .replaceAll("[CantIdentify]", "[Indiscriminate]")
    .replaceAll("[EndSkillHead]", "[Heads Attack End]")
    .replaceAll("[EndSkillTail]", "[Tails Attack End]")
    .replaceAll("[EnemyKillFail]", "[Failed Kill]")
    .trim();
}

//condition to check if it is an event ID. flow over is intended. add new cases for each new event ID/EGO -pat
function acquisition(id)
{
  switch(id)
  {
    case 11204:
    case 10404:
    case 20304:
    case 21003:
      return "Event (Hell's Kitchen)";
    case 10807:
    case 11007:
    case 20405:
    case 20604:
      return "Event (Magic Hellbus)";
    case 20402:
    case 20502:
    case 20504:
    case 20602:
    case 20703:
    case 20802:
    case 20903:
    case 21002:
    case 21102:
    case 21202:
    case 21204:
      return "Battle Pass Season 1 (Free)";
    case 20102:
    case 20105:
    case 20202:
    case 20302:
    case 20702:
    case 20804:
    case 20902:
    case 21104:
      return "Battle Pass Season 2 (Paid)";
  }
  return (id % 100 == 1 ? "Base" : "Gacha");
}

// formats resistances for ID Array. supports all physical resistances -pat
function getResist(x)
{
  return x.value.label + '\n[×' + x.value.val + ']';
}

// formats skills for ID Array. supports skills 0 to 2 -pat
function getSkills(x)
{
  return x.skill.list[x.skill.list.length - 1].name +' (×' + x.no + ')\n[' + x.datas[x.datas.length - 1].attr.name +'] [' + x.datas[x.datas.length - 1].atk_type.name + ']';
}

// formats defense skills for ID Array -pat
function getDefSkill(x)
{
  return (x.skill.list[x.skill.list.length - 1].name + ' (' + x.datas[x.datas.length - 1].def_type.toProperCase() + ')' + '\n[' + x.datas[x.datas.length - 1].attr.name + ']' + (x.datas[x.datas.length - 1].atk_type.name != "" ? ' [' + x.datas[x.datas.length - 1].atk_type.name + ']' : ''));
}

// formats passives for ID array. accepts both support and active -pat
function getPassive(x)
{
  return x[x.length - 1].passive.name + '\n[' + x[x.length - 1].passive.reqs[x[x.length - 1].passive.reqs.length - 1].attr.name + '] ×' + x[x.length - 1].passive.reqs[x[x.length - 1].passive.reqs.length - 1].value +' ' + x[x.length - 1].passive.reqs[x[x.length - 1].passive.reqs.length - 1].type.replace("RESONANCE", "Res").replace("STOCK", "Owned");
}

function getPassiveCost(x)
{
  return x[x.length - 1].passive.reqs[x[x.length - 1].passive.reqs.length - 1].value + ' ' + x[x.length - 1].passive.reqs[x[x.length - 1].passive.reqs.length - 1].type.replace("RESONANCE", "Res").replace("STOCK", "Owned");
}

// get quantity
function getSkillQuantity(x) {
  return x.no > 0 ? x.no : "";
}
// get base power
function getBasePower(x) {
  return x.default_value;
}
// gets coin power
function getCoinPower(x) {
  return x.coin[0].scale * (x.coin[0].operator == "+" ? 1 : -1);
}
// gets coin count
function getCoinCount(x) {
  return x.coin_no;
}
// formats coin count
function getCoinCountStr(x) {
  return '🪙'.repeat(getCoinCount(x));
}
// calculates clash min
function getClashMin(x) {
  var base_power = getBasePower(x);
  var coin_power = getCoinPower(x);
  var coin_count = getCoinCount(x);
  return Math.min(base_power, base_power + coin_power * coin_count);
}
// calculates clash max
function getClashMax(x) {
  var base_power = getBasePower(x);
  var coin_power = getCoinPower(x);
  var coin_count = getCoinCount(x);
  return Math.max(base_power, base_power + coin_power * coin_count);
}
// calculates damage min
function getDamageMin(x) {
  var base_power = getBasePower(x);
  var coin_power = getCoinPower(x);
  var coin_count = getCoinCount(x);
  return Math.min(base_power * coin_count, base_power * coin_count + coin_power * coin_count + coin_power * Math.max(coin_count - 1, 0) + coin_power * Math.max(coin_count - 2, 0) + coin_power * Math.max(coin_count - 3, 0) + coin_power * Math.max(coin_count - 4, 0));
}
// calculates damage max
function getDamageMax(x) {
  var base_power = getBasePower(x);
  var coin_power = getCoinPower(x);
  var coin_count = getCoinCount(x);
  return Math.max(base_power * coin_count, base_power * coin_count + coin_power * coin_count + coin_power * Math.max(coin_count - 1, 0) + coin_power * Math.max(coin_count - 2, 0) + coin_power * Math.max(coin_count - 3, 0) + coin_power * Math.max(coin_count - 4, 0));
}
//formats skill effect
function formatSkillEffect(x)
{
  var skill_desc = "";

  Object.values(x.desc).forEach((description) => {
    skill_desc += '\n' + description;
  })

  if(skill_desc != "")
  {
    skill_desc += '\n';
  }

  Object.values(x.coin).forEach((coinage, i) => {
    Object.values(coinage.desc).forEach((description, j) => {
      if(description != "")
        skill_desc += '\n' + (j == 0 ? i+1 + '.\t' : '  \t') + description;
    })
  })

  return skill_desc;
}

// finds the skill with the correct uptie
function getFromSkill(x, uptie, string)
{
  var temp = 0;
  var r_val;

  Object.values(x.skill.list).forEach((item, y) => {
    if(item.level < uptie)
    {
      temp = y;
    }
    
    if(item.level == uptie)
    {
      r_val = item;
    }
  })

  if(r_val == null)
  {
    r_val = x.skill.list[temp];
  }
  switch(string)
  {
    case "skilleffect":
      return cleanSkillDescription(formatSkillEffect(r_val));
    case "name":
      return r_val.name;
  }
}

//get EGO cost array
function getEGOCost(key, value, scale) {
  var data = []
  
  if(value == 0)
  {
    return "";
  }

  switch(key)
  {
    case "crimson":
      data.push('[Wrath] × ');
      break;
    case "scarlet":
      data.push('[Lust] × ');
      break;
    case "amber":
      data.push('[Sloth] × ');
      break;
    case "shamrock":
      data.push('[Glut.] × ');
      break;
    case "azure":
      data.push('[Gloom] × ');
      break;
    case "indigo":
      data.push('[Pride] × ');
      break;
    case "violet":
      data.push('[Envy] × ');
      break;
    case "white":
      data.push('[Mad.] x ')
      break;
    case "black":
      data.push('[Angst] x ')
      break;
  }
  data.push(Math.ceil(value * scale) +"   \n");

  return data.join('');
}

function getEGOCostStr(costs, scale) 
{
  var str = []

  Object.entries(costs).forEach(([key, value]) => {
      if(key != "black" && key != "white")
        str.push(getEGOCost(key, value, scale));
    }) 

  return str.join('').slice(0, -1);
}
