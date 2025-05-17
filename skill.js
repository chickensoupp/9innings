const B_legend_skill = ["精準打擊", "先鋒", "壞球打者", "天生巨星", "打者默契", "打者洞察力","最強打者","機會製造者","老手"];
const B_gold_skill = ["強化優點","預知能力","超能神話","雷射肩","超級強打","廣角打者","萬眾矚目","五拍子球員","超級輔助","王牌殺手","打擊機器","盜壘天王","自走砲"];
const B_silver_skill = ["精密打擊", "揮大棒打者", "巨砲本能", "開路先鋒", "筋疲力盡", "忍術","下盤鍛鍊", "逆轉的力量", "勝負天性", "動物本能", "信賴", "克服弱點"];
const B_bronze_skill = ["代打專家", "鷹眼", "推打", "拉打", "左腕殺手", "右腕殺手", "守備將軍","打點機器", "直球殺手", "正面對決", "集中力", "初球攻略"];
const P_legend_skill = ["工作馬","精準控球","速球型投手","完美先生","牛棚日","投手默契","投手洞察力","合力投球","先守後攻"]
const P_gold_skill = ["技巧派投手","壓倒性投手","大吃局數","最後大魔王","交錯之火","自我解決","王牌","鬥志","王牌終結者","滾地球投手","巨人殺手","投球協調者","決勝球","無法碰觸"]
const P_silver_skill = ["強力投手","控球藝術家","強打殺手","國寶投手","逆轉大師","狙擊手","野戰指揮","投球機器","佈局","乘勝追擊","救火隊","安全感","調整節奏"]
const P_bronze_skill = ["牽制王","平靜","佛祖保佑","危機克服","光速投球","魔球大師","左打殺手","右打殺手","鋼鐵人","老謀深算","強心臟","冰凍"]
function initializeSkillBoxes() {
  const skillPools = getSkillPools(); // 技能池
  const leftCard = document.querySelector('.skill-box-left .card1');
  const skillBoxes = leftCard.querySelectorAll('.skill-1, .skill-2, .skill-3');

  const baseProbabilities = {
    legend: 0.1
  };

  const skillCategories = {
    legend: {
      list: skillPools.legend,
      image: 'url(pics/legend.png)',
      probability: baseProbabilities.legend
    },
    gold: {
      list: skillPools.gold,
      image: 'url(pics/gold.png)'
    },
    silver: {
      list: skillPools.silver,
      image: 'url(pics/silver.png)'
    },
    bronze: {
      list: skillPools.bronze,
      image: 'url(pics/bronze.png)'
    }
  };

  function getRandomSkillFrom(categoryList) {
    // 直接從清單裡隨機挑，不排除重複
    const skill = categoryList[Math.floor(Math.random() * categoryList.length)];
    return skill;
  }

  function selectCategory(index) {
    if (index === 0 && Math.random() < skillCategories.legend.probability) {
      return 'legend';
    }
    const normalKeys = ['gold', 'silver', 'bronze'];
    return normalKeys[Math.floor(Math.random() * normalKeys.length)];
  }

  for (let i = 0; i < skillBoxes.length; i++) {
    let category = selectCategory(i);
    let skill = getRandomSkillFrom(skillCategories[category].list);

    const level = Math.floor(Math.random() * 3) + 1;

    skillBoxes[i].textContent = `${skill}  Lv. ${level}`;
    skillBoxes[i].style.backgroundImage = skillCategories[category].image;
    skillBoxes[i].style.backgroundSize = 'cover';
  }
}
function reset_svg() {
  const svgs = document.querySelectorAll('svg');
  svgs.forEach(svg => {
    svg.querySelectorAll('path').forEach(path => {
      path.setAttribute('fill', '#051350');
    });
  });
}
function toggleSkill(el) {
  const labelText = document.getElementById('labelText');
  if (el.checked) {
    labelText.textContent = '投手';
    labelText.style.color = 'royalblue';
  } else {
    labelText.textContent = '打者';
    labelText.style.color = 'crimson';
  }
  initializeSkillBoxes()
}
function getSkillPools() {
  const pools = {
    B: {
      legend: B_legend_skill,
      gold: B_gold_skill,
      silver: B_silver_skill,
      bronze: B_bronze_skill
    },
    P: {
      legend: P_legend_skill,
      gold: P_gold_skill,
      silver: P_silver_skill,
      bronze: P_bronze_skill
    }
  };
  const labelText = document.getElementById('labelText');
  if(labelText.textContent == '打者'){
    return pools.B;
  }
  else{
    return pools.P;
  }
}
function ChangeSkills_basic(mode) { 
  const skillPools = getSkillPools();
  const new_skill = document.querySelector('.card2');
  const skillBoxes = new_skill.querySelectorAll('.skill-1, .skill-2, .skill-3');
  const usedSkills = new Set();

  const baseProbabilities = {
    normal: 0.1,
    ultimate: 0.15,
    legend: 1.0
  };

  const skillCategories = {
    legend: {
      list: skillPools.legend,
      image: 'url(pics/legend.png)',
      probability: baseProbabilities[mode] || 0
    },
    gold: {
      list: skillPools.gold,
      image: 'url(pics/gold.png)',
      probability: mode === 'ultimate' ? 0.2833 : null
    },
    silver: {
      list: skillPools.silver,
      image: 'url(pics/silver.png)',
      probability: mode === 'ultimate' ? 0.2833 : null
    },
    bronze: {
      list: skillPools.bronze,
      image: 'url(pics/bronze.png)',
      probability: mode === 'ultimate' ? 0.2833 : null
    }
  };

  function getRandomSkillFrom(categoryList) {
    const available = categoryList.filter(skill => !usedSkills.has(skill));
    if (available.length === 0) return null;
    const skill = available[Math.floor(Math.random() * available.length)];
    usedSkills.add(skill);
    return skill;
  }

  function selectCategory(index) {
    if (index === 0) {
      if (mode === 'legend') return 'legend';
      if (Math.random() < skillCategories.legend.probability) return 'legend';
    }
    const normalKeys = ['gold', 'silver', 'bronze'];
    return normalKeys[Math.floor(Math.random() * normalKeys.length)];
  }

  function generateSkills() {
    const results = [];
    let totalLevel = 0;

    for (let i = 0; i < skillBoxes.length; i++) {
      let category = selectCategory(i);
      let skill = getRandomSkillFrom(skillCategories[category].list);

      // fallback 若該類用完
      if (!skill) {
        const fallbackKeys = Object.keys(skillCategories).filter(k => k !== category);
        while (fallbackKeys.length > 0 && !skill) {
          const randKey = fallbackKeys.splice(Math.floor(Math.random() * fallbackKeys.length), 1)[0];
          skill = getRandomSkillFrom(skillCategories[randKey].list);
          if (skill) {
            category = randKey;
            break;
          }
        }
      }

      const level = Math.floor(Math.random() * 3) + 1;
      totalLevel += level;

      results.push({
        box: skillBoxes[i],
        text: `${skill}  Lv. ${level}`,
        image: skillCategories[category].image
      });
    }

    return { results, totalLevel };
  }

  let finalResults;

  if (mode === 'ultimate') {
    // retry until totalLevel >= 5
    do {
      usedSkills.clear();
      finalResults = generateSkills();
    } while (finalResults.totalLevel < 5);
  } else {
    finalResults = generateSkills();
  }

  // 套用結果
  finalResults.results.forEach(result => {
    result.box.textContent = result.text;
    result.box.style.backgroundImage = result.image;
    result.box.style.backgroundSize = 'cover';
  });

  // UI 更新
  document.querySelector('.confirm-box').style.display = 'none';
  document.querySelector('.card2').style.display = 'block';
  document.querySelector('.skill-changes-container').style.display = 'none';
  document.querySelector('.container').style.gap = '150px';
  document.querySelectorAll('.select-skill').forEach(skill => {
    skill.style.display = 'flex';
  });
  document.querySelector('.skill-box-right').style.display = 'block';
  document.querySelector('.card1').classList.add('hover-effect');
  document.querySelector('.card2').classList.add('hover-effect');
}
function legend_skill_select() { //黑變
  const leftBox = document.querySelector('.skill-box-left');
  const rightBox = document.querySelector('.skill-box-right');
  const skillPools = getSkillPools();

  const skillCategories = {
    legend: {
      list: skillPools.legend,
      image: 'url(pics/legend.png)'
    },
    gold: {
      image: 'url(pics/gold.png)'
    },
    silver: {
      image: 'url(pics/silver.png)'
    },
    bronze: {
      image: 'url(pics/bronze.png)'
    }
  };

  for (let i = 1; i <= 3; i++) {
    const leftSkill = leftBox.querySelector(`.skill-${i}`);
    const rightSkill = rightBox.querySelector(`.skill-${i}`);

    const text = leftSkill.textContent.trim();
    const levelMatch = text.match(/Lv\.\s*\d+/);
    const levelText = levelMatch ? `  ${levelMatch[0]}` : '';
    
    if (i === 1) {
      // 第1格：挑 legend，排除左邊技能名
      const leftSkillName = text.replace(/Lv\.\s*\d+/, '').trim();
      const availableSkills = skillCategories.legend.list.filter(skill => skill !== leftSkillName);

      if (availableSkills.length === 0) {
        console.warn("無其他 legend 技能可替換。");
        rightSkill.textContent = text;
        rightSkill.style.backgroundImage = skillCategories.legend.image;
      } else {
        const newSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
        rightSkill.textContent = `${newSkill}${levelText}`;
        rightSkill.style.backgroundImage = skillCategories.legend.image;
      }
    } else {
      // 第2, 3格：完全複製
      rightSkill.textContent = text;
      rightSkill.style.backgroundImage = leftSkill.style.backgroundImage;
    }

    rightSkill.style.backgroundSize = 'cover';
  }
  document.querySelector('.confirm-box').style.display = 'none';
  document.querySelector('.card2').style.display = 'block';
  document.querySelector('.skill-changes-container').style.display = 'none';
  document.querySelector('.container').style.gap = '150px';
  document.querySelectorAll('.select-skill').forEach(skill => {
    skill.style.display = 'flex';
  });
  document.querySelector('.skill-box-right').style.display = 'block';
  document.querySelector('.card1').classList.add('hover-effect');
  document.querySelector('.card2').classList.add('hover-effect');
}
function check_legend_skill() {//確認是否有黑技
  const iconClass = find_skill_type();
  if (iconClass == "legend-skill-select-change-icon") {
    const bgImage = getComputedStyle(document.querySelector('.card1 .skill-1')).backgroundImage;
    if (bgImage.includes('legend.png')) {
      return true
    } else {
      return false
    }
  }
  else {
    return true
  }
}
function use_skill() {
  const selections = ['premium-skill-select-change-icon', 'skill-select-change-icon', 'premium-skill-protect-change-icon', 'skill-protect-change-icon']
  document.querySelector('.switch').style.display = 'none';
  if (check_legend_skill()) {
    document.querySelector('.confirm-box').style.display = 'flex';
  }
  else{
    document.querySelector('.switch').style.display = 'flex';
  }
  updateSkillBox();
  
  if (!selections.includes(String(find_skill_type()))) {
    const svgs = document.querySelectorAll('svg');
    svgs.forEach(svg => {
      svg.style.display = 'none';
    });
  }
  else{
    const svgs = document.querySelectorAll('svg');
    document.querySelector('.selection-container').style.display = 'flex';
    document.querySelector('.confirm-box').style.display = 'none';
    document.querySelector('.selection-box-banner').textContent = document.querySelector('.'+String(find_skill_type())).nextElementSibling.textContent;
    svgs.forEach(svg => {
      svg.style.display = 'block';
    });
    const btn = document.querySelector('.selection-btn-2');
    btn.disabled = true;      // 設為 disabled，視覺與操作上無法點擊
    return;
  }
  
}
function skill_protect(indexToKeep, type) {
  let new_skill;
  const skillPools = getSkillPools();
  // 保證 card2 可見
  document.querySelector('.card2').style.display = 'block';

  // 決定要改哪張卡（card1 或 card2）
  if (type === 'premium') {
    new_skill = document.querySelector('.card2');
  } else {
    new_skill = document.querySelector('.card1');
  }

  const skillBoxes = new_skill.querySelectorAll('.skill-1, .skill-2, .skill-3');
  const originalBoxes = document.querySelector('.card1').querySelectorAll('.skill-1, .skill-2, .skill-3');

  const usedSkills = new Set();

  const skillCategories = {
    gold: {
      list: skillPools.gold,
      image: 'url(pics/gold.png)'
    },
    silver: {
      list: skillPools.silver,
      image: 'url(pics/silver.png)'
    },
    bronze: {
      list: skillPools.bronze,
      image: 'url(pics/bronze.png)'
    }
  };

  // 先複製 indexToKeep 的技能
  const keepIndex = indexToKeep - 1;
  const copiedText = originalBoxes[keepIndex].textContent;
  skillBoxes[keepIndex].textContent = copiedText;
  skillBoxes[keepIndex].style.backgroundImage = originalBoxes[keepIndex].style.backgroundImage;
  skillBoxes[keepIndex].style.backgroundSize = 'cover';

  // 解析技能名稱並加入 usedSkills，避免抽到一樣的
  const copiedSkillName = copiedText.split('Lv')[0].trim();
  usedSkills.add(copiedSkillName);

  // 將其他舊技能也加入 usedSkills
  for (let i = 0; i < originalBoxes.length; i++) {
    if (i !== keepIndex) {
      const oldText = originalBoxes[i].textContent;
      const skillName = oldText.split('Lv')[0].trim();
      usedSkills.add(skillName);
    }
  }

  function getRandomSkillFrom(categoryList) {
    const available = categoryList.filter(skill => !usedSkills.has(skill));
    if (available.length === 0) return null;
    const skill = available[Math.floor(Math.random() * available.length)];
    usedSkills.add(skill);
    return skill;
  }

  function selectCategory() {
    const keys = ['gold', 'silver', 'bronze'];
    return keys[Math.floor(Math.random() * keys.length)];
  }

  // 替換其餘兩個技能
  for (let i = 0; i < skillBoxes.length; i++) {
    if (i === keepIndex) continue;

    const originalText = originalBoxes[i].textContent;
    const levelMatch = originalText.match(/Lv\.?\s*(\d)/i);
    const level = levelMatch ? parseInt(levelMatch[1]) : 1;

    let category = selectCategory();
    let skill = getRandomSkillFrom(skillCategories[category].list);

    if (!skill) {
      const fallbackKeys = Object.keys(skillCategories).filter(k => k !== category);
      while (fallbackKeys.length > 0 && !skill) {
        const randKey = fallbackKeys.splice(Math.floor(Math.random() * fallbackKeys.length), 1)[0];
        skill = getRandomSkillFrom(skillCategories[randKey].list);
        if (skill) {
          category = randKey;
          break;
        }
      }
    }

    skillBoxes[i].textContent = `${skill}  Lv. ${level}`;
    skillBoxes[i].style.backgroundImage = skillCategories[category].image;
    skillBoxes[i].style.backgroundSize = 'cover';
  }

  // UI 更新
  document.querySelector('.selection-container').style.display = 'none';
  document.querySelectorAll('svg').forEach(svg => svg.style.display = 'none');

  if (type === 'premium') {
    document.querySelector('.confirm-box').style.display = 'none';
    document.querySelector('.skill-changes-container').style.display = 'none';
    document.querySelector('.container').style.gap = '150px';
    document.querySelectorAll('.select-skill').forEach(skill => {
      skill.style.display = 'flex';
    });
    document.querySelector('.skill-box-right').style.display = 'block';
    document.querySelector('.card1').classList.add('hover-effect');
    document.querySelector('.card2').classList.add('hover-effect');
  }
}
function skill_select(indexToChange, type) {
  let new_skill;
  const skillPools = getSkillPools();
  document.querySelector('.card2').style.display = 'block';

  if (type === 'premium') {
    new_skill = document.querySelector('.card2');
  } else {
    new_skill = document.querySelector('.card1');
  }
  const fromCard = document.querySelector('.card1');
  const fromSkills = fromCard.querySelectorAll('.skill-1, .skill-2, .skill-3');
  const skillBoxes = new_skill.querySelectorAll('.skill-1, .skill-2, .skill-3');

  const usedSkills = new Set();

  const skillCategories = {
    gold: {
      list: skillPools.gold,
      image: 'url(pics/gold.png)'
    },
    silver: {
      list: skillPools.silver,
      image: 'url(pics/silver.png)'
    },
    bronze: {
      list: skillPools.bronze,
      image: 'url(pics/bronze.png)'
    }
  };

  // 把原卡的技能加入 usedSkills，避免選重複
  fromSkills.forEach(skillBox => {
    const skillName = skillBox.textContent.split('Lv')[0].trim();
    usedSkills.add(skillName);
  });

  function getRandomSkillFrom(categoryList) {
    const available = categoryList.filter(skill => !usedSkills.has(skill));
    if (available.length === 0) return null;
    const skill = available[Math.floor(Math.random() * available.length)];
    usedSkills.add(skill);
    return skill;
  }

  function selectCategory() {
    const keys = ['gold', 'silver', 'bronze'];
    return keys[Math.floor(Math.random() * keys.length)];
  }

  for (let i = 0; i < skillBoxes.length; i++) {
    const currentText = fromSkills[i].textContent;
    const levelMatch = currentText.match(/Lv\.?\s*(\d)/i);
    const level = levelMatch ? parseInt(levelMatch[1]) : 1;

    if (i === indexToChange - 1) {
      // 替換指定 index 的技能
      let category = selectCategory();
      let skill = getRandomSkillFrom(skillCategories[category].list);

      if (!skill) {
        const fallbackKeys = Object.keys(skillCategories).filter(k => k !== category);
        while (fallbackKeys.length > 0 && !skill) {
          const randKey = fallbackKeys.splice(Math.floor(Math.random() * fallbackKeys.length), 1)[0];
          skill = getRandomSkillFrom(skillCategories[randKey].list);
          if (skill) {
            category = randKey;
            break;
          }
        }
      }

      skillBoxes[i].textContent = `${skill}  Lv. ${level}`;
      skillBoxes[i].style.backgroundImage = skillCategories[category].image;
    } else {
      // 其餘 index 直接複製原來的技能
      skillBoxes[i].textContent = currentText;
      skillBoxes[i].style.backgroundImage = fromSkills[i].style.backgroundImage;
    }

    skillBoxes[i].style.backgroundSize = 'cover';
  }

  document.querySelector('.selection-container').style.display = 'none';
  document.querySelectorAll('svg').forEach(svg => svg.style.display = 'none');

  if (type === 'premium') {
    document.querySelector('.confirm-box').style.display = 'none';
    document.querySelector('.skill-changes-container').style.display = 'none';
    document.querySelector('.container').style.gap = '150px';
    document.querySelectorAll('.select-skill').forEach(skill => {
      skill.style.display = 'flex';
    });
    document.querySelector('.skill-box-right').style.display = 'block';
    document.querySelector('.card1').classList.add('hover-effect');
    document.querySelector('.card2').classList.add('hover-effect');
  }
}
function get_selected() {
  const svgs = document.querySelectorAll('svg');

  for (let svg of svgs) {
    const paths = svg.querySelectorAll('path');
    for (let path of paths) {
      if (path.getAttribute('fill') === '#1ec71e') {
        const className = svg.parentElement.className;
        const lastChar = className[className.length - 1];
        return parseInt(lastChar, 10);
      }
    }
  }

  return null; // 若沒找到綠色 path
}
document.addEventListener('DOMContentLoaded', function() {
  updateSkillBox();
  // 頁面載入時，找出 mask 是 display:block 的那一張 skill-change
  const defaultSelected = document.querySelector('.skill-change .mask[style*="block"]');
  if (defaultSelected) {
    const skillChange = defaultSelected.closest('.skill-change');
    if (skillChange) {
      setUseButtonBackground(skillChange);
    }
  }
});
function updateSkillBox() {
  const skills = document.querySelector('.card1');
  for (let i = 1; i <= 3; i++) {
    document.querySelector('.skill-box-original-' + i).textContent = skills.querySelector('.skill-' + i).textContent;
    document.querySelector('.selection-skill-box-original-' + i).textContent = skills.querySelector('.skill-' + i).textContent;
    document.querySelector('.skill-box-original-' + i).style.backgroundImage = skills.querySelector('.skill-' + i).style.backgroundImage;
    document.querySelector('.selection-skill-box-original-' + i).style.backgroundImage = skills.querySelector('.skill-' + i).style.backgroundImage;
  }
}
function toggleOverlay(element) {
  const masks = document.querySelectorAll('.skill-change .mask');
  masks.forEach(mask => {
    mask.style.display = 'none';
  });

  const mask = element.querySelector('.mask');
  if (mask) {
    mask.style.display = 'block';
  }
  setUseButtonBackground(element);
}
function setUseButtonBackground(skillChangeElement) {
  const icon = skillChangeElement.querySelector('div[class$="-icon"]');
  const useButton = document.querySelector('.use-skill-changes');

  if (!icon || !useButton) {
    console.warn('找不到 icon 或 use-skill-changes');
    return;
  }

  const iconClass = icon.className;
  let imageName = getImageNameFromClass(iconClass);

  useButton.style.backgroundImage = `url(${imageName})`;
}
// 根據 class 名稱對應不同圖片
function getImageNameFromClass(className) {
  if (className.includes('ultimate-skill-change-icon')) {
    return 'pics/ultimate-skill-use.png';
  }
  if (className.includes('legend-skill-change-icon')) {
    return 'pics/legend-skill-use.png';
  }
  if (className.includes('legend-skill-select-change-icon')) {
    return 'pics/legend-select-use.png';
  }
  if (className.includes('premium-skill-select-change-icon')) {
    return 'pics/premium-select-use.png';
  }
  if (className.includes('skill-select-change-icon')) {
    return 'pics/skill-select-use.png';
  }
  if (className.includes('premium-skill-protect-change-icon')) {
    return 'pics/premium-protect-use.png';
  }
  if (className.includes('skill-protect-change-icon')) {
    return 'pics/skill-protect-use.png';
  }
  // 預設情況：高級技能變更券
  return 'pics/skill-change-use.png';
}
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.skill-change').forEach(skillChange => {
    skillChange.addEventListener('click', function() {
      toggleOverlay(this);
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const skillChanges = document.querySelector('.skill-changes');
  
  let isDragging = false;
  let startY;
  let startScrollTop;

  skillChanges.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startScrollTop = skillChanges.scrollTop;
    skillChanges.style.cursor = 'grabbing'; // 拖曳時換手勢
  });

  skillChanges.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dy = e.clientY - startY;
    skillChanges.scrollTop = startScrollTop - dy;
  });

  skillChanges.addEventListener('mouseup', () => {
    isDragging = false;
    skillChanges.style.cursor = 'auto'; // 放開還原
  });

  skillChanges.addEventListener('mouseleave', () => {
    isDragging = false;
    skillChanges.style.cursor = 'auto';
  });
});

let count1 = 0;
let count2 = 0;
function chooseSkill(element) {
  // 只有有 hover-effect 才能選
  if (!element.classList.contains('hover-effect')) {
    return;
  }

  // 加上選擇技能樣式
  element.classList.add('choose-skill');

  // 判斷是哪一張卡片
  if (element.classList.contains('card1')) {
    document.querySelector('.card2').classList.remove('choose-skill');
    count1++;
    count2 = 0; // 重設另一張的計數
  } else if (element.classList.contains('card2')) {
    document.querySelector('.card1').classList.remove('choose-skill');
    count2++;
    count1 = 0;
  }
  // 如果點兩次同一張卡
  if (count1 === 2 || count2 === 2) {
    document.querySelector('.choose-skill-container').style.display = 'flex';

    if (count1 === 2) {
      document.querySelector('.choose-skill-banner').textContent = '保留技能';
      document.querySelector('.choose-skill-text').textContent = '您確定要保留原有的技能嗎?';
    } else {
      document.querySelector('.choose-skill-banner').textContent = '變更技能';
      document.querySelector('.choose-skill-text').textContent = '您確定要變更為新的技能嗎?';
    }

    // 保留 hover 效果，不移除
    // 重設計數（讓下一次重新開始點）
    count1 = 0;
    count2 = 0;
  } else {
    // 尚未達成兩次點擊，保持隱藏
    document.querySelector('.choose-skill-container').style.display = 'none';
  }
}
function closeChooseSkillContainer() {
  // 關閉彈窗
  document.querySelector('.choose-skill-container').style.display = 'none';

  // 移除所有 .choose-skill 樣式（讓使用者能重新選）
  document.querySelector('.card1').classList.remove('choose-skill');
  document.querySelector('.card2').classList.remove('choose-skill');

  // 重設計數
  count1 = 0;
  count2 = 0;
}
function replaceSkill() {
  document.querySelector('.choose-skill-container').style.display = 'none';
  document.querySelector('.container').style.gap = '40px';
  document.querySelector('.skill-box-right').style.display = 'none';
  document.querySelector('.skill-changes-container').style.display = 'block';
  document.querySelector('.select-skill').style.display = 'none';

  // 只有當前是 card2 時才替換
  if (document.querySelector('.card2').classList.contains('choose-skill')) {
    for (let i = 1; i <= 3; i++) {
      const from = document.querySelector('.card2 .skill-' + i);
      const to = document.querySelector('.card1 .skill-' + i);
      to.textContent = from.textContent;
      to.style.backgroundImage = from.style.backgroundImage;
    }
    
  }
  // 重置選取狀態與 UI
  document.querySelector('.card1').classList.remove('hover-effect');
  document.querySelector('.card2').classList.remove('hover-effect');
  document.querySelector('.card1').classList.remove('choose-skill');
  document.querySelector('.card2').classList.remove('choose-skill');
  updateSkillBox();
  document.querySelector('.switch').style.display = 'flex';
  
}
function ChangeSkill() {
  const iconClass = find_skill_type();
      switch (iconClass) {
        case 'skill-change-icon':
          ChangeSkills_basic('normal');
          break;
        case 'ultimate-skill-change-icon':
          ChangeSkills_basic('ultimate');
          break;
        case 'legend-skill-change-icon':
          ChangeSkills_basic('legend');
          break;
        case 'legend-skill-select-change-icon':
          legend_skill_select();
          break;
        case 'skill-select-change-icon':
          skill_select(get_selected(),'normal');
          document.querySelector('.switch').style.display = 'flex';
          break;
        case 'premium-skill-select-change-icon':
          skill_select(get_selected(),'premium');
          break;
        case 'skill-protect-change-icon':
          skill_protect(get_selected(),'normal');
          document.querySelector('.switch').style.display = 'flex';
          break;
        case 'premium-skill-protect-change-icon':
          skill_protect(get_selected(),'premium');
          break;
        default:
          break;
      }
      reset_svg();

}
function find_skill_type() {
  const skillChanges = document.querySelectorAll('.skill-change');
  for (const change of skillChanges) {
    const mask = change.querySelector('.mask');
    if (mask && window.getComputedStyle(mask).display === 'block') {
      return change.querySelector('div').className;
    }
  }
}
function select_svg(element) {
  const btn = document.querySelector('.selection-btn-2');
  btn.disabled = false;
  // 重設所有 path 的填色
  document.querySelectorAll('svg path.p1, svg path.p2, svg path.p3').forEach(path => {
    path.setAttribute('fill', '#051350');
  });

  // 只改這個 SVG 裡面有 class 的那條 path
  const targetPath = element.querySelector('.p1, .p2, .p3');
  if (targetPath) {
    targetPath.setAttribute('fill', '#1ec71e');
  }
}


