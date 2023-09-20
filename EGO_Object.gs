// creates the ID Passive Array. edit entiries to edit how the array is formatted for the spreadsheet. accepts the raw API. -pat
function createEGOArray(data)
{ 
  var finalized = data.map(x => {
    return{
      image          : '=IMAGE("https://img.kusoge.xyz/limbus/img/ego/' + x.ego_id + '_awaken_profile.png",1)',
      character      : convertSinner(x.sinner_id),
      name           : x.prof.name,
      hyperlink      : '=HYPERLINK("' + 'https://limbus.kusoge.xyz/ego/' + x.ego_id + '", "[DB]")',
      slot           : x.type,
      acquisition    : acquisition(x.ego_id),
      season         : (x.season_id == 0 ? 'Regular' : 'Season ' + x.season_id),
    }
  })

  Object.values(data).forEach((item, i) => {
    finalized[i]["sp_cost"] = item.skills[item.skills.length - 1].datas[item.skills[item.skills.length - 1].datas.length - 1].mp;
    finalized[i]["affinity"] = item.skills[item.skills.length - 1].datas[item.skills[item.skills.length - 1].datas.length - 1].attr.name;

    Object.values(item.res).forEach((x) => {
      if(x.attr.name != "Angst" && x.attr.name != "Mad.")
        finalized[i][x.attr.name] = getResist(x);
    })

    Object.entries(item.req).forEach(([key, value]) => {
      if(key != "black" && key != "white")
        finalized[i][key + "_cost"] = getEGOCost(key, value, 1);
    })
  })
  
  return finalized.flat(1).map(Object.values);
}

function generateEGOSkill(geninfo, ego)
{
  var finalized = [];

  Object.values(ego).forEach((x, i) => {
    Object.values(x.datas).forEach((uptie, i) =>
    {
      finalized.push({
        image        : '=IMAGE("https://img.kusoge.xyz/limbus/img/ego/' + geninfo.ego_id + '_' + (x.skill.type == "EGO_AWAKEN" ? "awaken" : "erosion") + '_profile.png",1)',
        character    : convertSinner(geninfo.sinner_id),
        name         : geninfo.prof.name,
        uptie        : intToRoman(uptie.tier),
        slot         : geninfo.type,
        sp_cost      : uptie.mp,
        sin_cost     : getEGOCostStr(geninfo.req,1),
        oc_sp        : (x.skill.type == "EGO_AWAKEN" ? "-" : Math.ceil(uptie.mp * 1.5)),
        oc_sin       : (x.skill.type == "EGO_AWAKEN" ? "-" : getEGOCostStr(geninfo.req,1.5)),
        affinity     : uptie.attr.name,
        dmg_type     : uptie.atk_type.name,
        act_type     : (x.skill.type == "EGO_AWAKEN" ? "Awakening" : "Corrosion"),
        offense      : uptie.skill_correction + IDENTITY_LEVEL_CAP,
        atk_weight   : uptie.target_num,
        base_power   : getBasePower(uptie),
        coin_power   : getCoinPower(uptie),
        coin_count   : getCoinCountStr(uptie),
        clash_min    : getClashMin(uptie),
        clash_max    : getClashMax(uptie),
        damage_min   : getDamageMin(uptie),
        damage_max   : getDamageMax(uptie),
        skill_effect : getFromSkill(x, uptie.tier, "skilleffect")
      })
    })
  })

  return finalized.flat(1).map(Object.values);
}

// creates the ID Passive Array. edit entiries to edit how the array is formatted for the spreadsheet. accepts the raw API. -pat
function createEGOSkillArray(data)
{
  var finalized = [];

  //loops through each ID and extracts the skills from each
  Object.values(data).forEach((item) => {
    finalized.push(generateEGOSkill(item, item.skills));
    if(item.corrosions != null)
    {
      finalized.push(generateEGOSkill(item, item.corrosions)); 
    }  
  })

  return finalized.flat(1).map(Object.values);
}

// creates the ID Passive Array. edit entiries to edit how the array is formatted for the spreadsheet. accepts the raw API. -pat
function createEGOPassiveArray(data)
{ 
  var finalized = data.map(x => {
    return{
      ego_image      : '=IMAGE("https://img.kusoge.xyz/limbus/img/ego/' + x.ego_id + '_awaken_profile.png",1)',
      character      : convertSinner(x.sinner_id),
      ego_name       : x.prof.name,
      slot           : x.type,
      passive_name   : x.passives[x.passives.length - 1].passive.name,
      passive_effect : x.passives[x.passives.length - 1].passive.desc
    }
  });
  
  return finalized.map(Object.values);
}
