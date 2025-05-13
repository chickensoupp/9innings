// 四類文字陣列
const B_legend_skill = ["精準打擊", "先鋒", "壞球打者", "天生巨星", "打者默契", "打者洞察力","最強打者","機會製造者","老手"];
const B_gold_skill = ["強化優點","預知能力","超能神話","雷射肩","超級強打","廣角打者","萬眾矚目","五拍子球員","超級輔助","王牌殺手","打擊機器","盜壘天王","自走砲"];
const B_silver_skill = ["精密打擊", "揮大棒打者", "巨砲本能", "開路先鋒", "筋疲力盡", "忍術","下盤鍛鍊", "逆轉的力量", "勝負天性", "動物本能", "信賴", "克服弱點"];
const B_bronze_skill = ["代打專家", "鷹眼", "推打", "拉打", "左腕殺手", "右腕殺手", "守備將軍","打點機器", "直球殺手", "正面對決", "集中力", "初球攻略"];
// const type5 = ["","","","","","","","","","","","","","","",""]
// const type6 = ["","","","","","","","","","","","","","","",""]
// const type7 = ["","","","","","","","","","","","","","","",""]
// const type8 = ["","","","","","","","","","","","","","","",""]

// 將邏輯包成函式
function ChangeSkills_normal() {
  const new_skill = document.querySelector('.card2');
  const skillBoxes = new_skill.querySelectorAll('.skill-1, .skill-2, .skill-3');
  const usedSkills = new Set();

  const skillCategories = {
    legend: {
      list: B_legend_skill,
      image: 'url(pics/legend.png)',
      probability: 0.1
    },
    gold: {
      list: B_gold_skill,
      image: 'url(pics/gold.png)'
    },
    silver: {
      list: B_silver_skill,
      image: 'url(pics/silver.png)'
    },
    bronze: {
      list: B_bronze_skill,
      image: 'url(pics/bronze.png)'
    }
  };

  function getRandomSkillFrom(categoryList) {
    const available = categoryList.filter(skill => !usedSkills.has(skill));
    if (available.length === 0) return null;
    const skill = available[Math.floor(Math.random() * available.length)];
    usedSkills.add(skill);
    return skill;
  }

  skillBoxes.forEach(box => {
    let selectedText = "";
    let backgroundImage = "";

    if (box.classList.contains('skill-1')) {
      if (Math.random() < skillCategories.legend.probability) {
        const skill = getRandomSkillFrom(skillCategories.legend.list);
        if (skill) {
          selectedText = skill;
          backgroundImage = skillCategories.legend.image;
        }
      }

      if (!selectedText) { // fallback to gold/silver/bronze
        const keys = ['gold', 'silver', 'bronze'];
        while (keys.length > 0 && !selectedText) {
          const randKey = keys.splice(Math.floor(Math.random() * keys.length), 1)[0];
          const skill = getRandomSkillFrom(skillCategories[randKey].list);
          if (skill) {
            selectedText = skill;
            backgroundImage = skillCategories[randKey].image;
          }
        }
      }
    } else {
      const keys = ['gold', 'silver', 'bronze'];
      while (keys.length > 0 && !selectedText) {
        const randKey = keys.splice(Math.floor(Math.random() * keys.length), 1)[0];
        const skill = getRandomSkillFrom(skillCategories[randKey].list);
        if (skill) {
          selectedText = skill;
          backgroundImage = skillCategories[randKey].image;
        }
      }
    }

    // 加上 Lv.1 ~ Lv.3
    const level = Math.floor(Math.random() * 3) + 1;
    selectedText += `  Lv. ${level}`;

    // 設定文字與背景
    box.textContent = selectedText;
    box.style.backgroundImage = backgroundImage;
    box.style.backgroundSize = 'cover';
  });

  // 顯示 / 隱藏 UI 元件
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
  for (let i = 1; i <= 3; i++) {
    document.querySelector('.skill-box-original-' + i).textContent = document.querySelector('.skill-' + i).textContent;
    document.querySelector('.skill-box-original-' + i).style.backgroundImage = document.querySelector('.skill-' + i).style.backgroundImage;
  }
}
function toggleOverlay(element) {
  const masks = document.querySelectorAll('.skill-change .mask');
  // 先把所有 mask 關掉
  masks.forEach(mask => {
    mask.style.display = 'none';
  });

  // 把自己這個打開
  const mask = element.querySelector('.mask');
  if (mask) {
    mask.style.display = 'block';
  }

  // 切換 use-skill-changes 背景
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
      toggleMask(this);
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
  
}



ChangeSkills_normal()
