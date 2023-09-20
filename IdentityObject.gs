function createIDArray(data)
{ 
  var finalized = data.map(x => {
    return{
      char_image  : '=IMAGE("https://img.kusoge.xyz/limbus/img/profile/' + x.unit_id + '_gacksung_profile.png",1)',
      character   : x.prof.name,
      name        : x.prof.title,
      acquisition : acquisition(x.unit_id),
      season      : (x.season_id == 0 ? 'Regular' : 'Season ' + x.season_id),
      hyperlink   : '=HYPERLINK("' + 'https://limbus.kusoge.xyz/identity/' + x.unit_id + '", "[DB]")',
      rarity      : '0'.repeat(x.rarity),
      hp          : Math.round(x.hp_base + x.hp_inc * IDENTITY_LEVEL_CAP),
      spd         : x.spd_min[x.spd_min.length - 1]+'-'+x.spd_max[x.spd_max.length - 1],
      def         : x.def_correction + IDENTITY_LEVEL_CAP,
      slash       : getResist(x.res[2]),
      pierce      : getResist(x.res[1]),
      blunt       : getResist(x.res[0]),
      s1          : getSkills(x.skills[0]),
      s2          : getSkills(x.skills[1]),
      s3          : getSkills(x.skills[2]),
      defs        : getDefSkill(x.skills[3]),
      passive     : getPassive(x.passives),
      support     : getPassive(x.supports)
    }
  });
  
  return finalized.map(Object.values);
}

// creates the ID Skill Array. edit entiries to edit how the array is formatted for the spreadsheet. accepts the raw API. -pat
function createIDSkillArray(data)
{ 
  var finalized = [];

  //loops through each ID and extracts the skills from each
  Object.values(data).forEach((item) => {
      Object.values(item.skills).forEach((x, i) => {
          Object.values(x.datas).forEach((uptie) =>
          {
            finalized.push({
              char_image   : '=IMAGE("https://img.kusoge.xyz/limbus/img/profile/' + item.unit_id + '_gacksung_profile.png",1)',
              skill_image  : '=IMAGE("https://img.kusoge.xyz/limbus/img/skill/' + x.skill_id + '.png",1)',
              character    : item.prof.name,
              name         : item.prof.title,
              uptie        : intToRoman(uptie.tier),
              skill_type   : (i > 2 ? "Defense" : ("Skill " + (i + 1))),
              skill_name   : getFromSkill(x, uptie.tier, "name"),
              affinity     : uptie.attr.name,
              type         : uptie.atk_type.name,
              quantity     : getSkillQuantity(x),
              atk          : uptie.skill_correction + IDENTITY_LEVEL_CAP,
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
  })
  return finalized.map(Object.values);
}

// creates the ID Passive Array. edit entiries to edit how the array is formatted for the spreadsheet. accepts the raw API. -pat
function createIDPassiveArray(data)
{ 
  var finalized = []
  
  Object.values(data).forEach((item) => {
      Object.values(item.passives).forEach((x, i) => {
          finalized.push({
            char_image     : '=IMAGE("https://img.kusoge.xyz/limbus/img/profile/' + item.unit_id + '_gacksung_profile.png",1)',
            character      : item.prof.name,
            name           : item.prof.title,
            uptie          : intToRoman(x.level),
            passive_name   : x.passive.name,
            passive_aff    : x.passive.reqs[x.passive.reqs.length - 1].attr.name,
            passive_cost   : getPassiveCost(item.passives),
            passive_effect : x.passive.desc,
            support_name   : item.supports[item.supports.length - 1].passive.name,
            support_aff    : item.supports[item.supports.length - 1].passive.reqs[item.supports[item.supports.length - 1].passive.reqs.length - 1].attr.name,
            support_cost   : getPassiveCost(item.supports),
            support_effect : item.supports[item.supports.length - 1].passive.desc
          })
      })
  })
  
  return finalized.map(Object.values);
}

