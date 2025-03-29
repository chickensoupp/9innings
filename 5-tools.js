function calculate() {
    let grade_array = max_grade()
    let max_level = grade_array[5]
    let free_point = grade_array[6]
    let dev = grade_array.slice(0,5)
    let stats = ['contact', 'power', 'selection', 'speed', 'defense']

    if (document.getElementById("player_type").value == "type"){
        alert("請選擇球員類型");
    }
    else if (document.getElementById("training1").value == "0" || document.getElementById("training2").value == "0" || document.getElementById("training3").value == "0"){
        alert("請選擇特訓");
    }
    else{
        stats.forEach((stat, index) => {
            let span = document.getElementById(`dev_${stat}`);
            if (span) {
                span.textContent = dev[index]; // 更新 span 內容
            }
        });
        
        level = document.getElementById('result');
        point = document.getElementById('freepoint');
        level.textContent = max_level;
        point.textContent = free_point;
    }
    
    // console.log(max_level)
    // console.log(free_point)
}
function max_grade(){
    
    const grade = [83,85,88,90,93,95,98,100,103,105,108,110]
    let res = [0,0,0,0,0,0,0]
    for (let i = 0;i < grade.length;i++){
        let cur_res = level_validation(grade[i])
        if (cur_res == false){
            break
        }
        else{
            res = cur_res
        }
    }
    return res
}
function level_validation(level) {
    console.log(level)
    let GI_values = getGIValues();
    let Base_values = getBaseValues();
    let free_point = type_of_player()


    let dev = [0,0,0,0,0]
    for (let i = 0; i < 5; i++) {
        let dif = Math.max((level - (GI_values[i] + Base_values[i])),0)
        dev[i] = dif
        free_point -= dif
        if (free_point < 0){
            return false
        }//無法達成此級距
    }
    
    let training1 = document.getElementById('training1').value;//特訓1
    let training2 = document.getElementById('training2').value;//特訓2
    let training3 = document.getElementById('training3').value;//特訓3
    let training4 = -1
    let training5 = -1
    let stats = ['contact', 'power', 'selection', 'speed', 'defense'];
    for (let i = 0; i < 5;i++){
        switch (stats[i]){
            case training1:
                training1 = i;
                break
            case training2:
                training2 = i
                break
            case training3:
                training3 = i
                break
            default:
                if (training4 > training5){
                    training5 = i
                }
                else{
                    training4 = i
                }
                break
        }
    }
    let train_array = [training1,training2,training3]
    let max_dev_index = (dev[training4] > dev[training5]) ? training4 : training5;
    for (let i = 0;i < 3; i++){
        let dev_diff = Math.max(dev[max_dev_index]- dev[train_array[i]],0)
        dev[train_array[i]] +=  dev_diff
        free_point -= dev_diff
    }
    if (free_point < 0){
        return false//特訓無法達成前三高強化量
    }
    
    
    for (let i = 1;i >= 0; i--){//t2 -> t1
        let train_diff = dev[train_array[i+1]] > dev[train_array[i]] ? dev[train_array[i+1]] - dev[train_array[i]]:0
        dev[train_array[i]] += train_diff
        free_point -= train_diff

        if ((Base_values[train_array[i]] < Base_values[train_array[i+1]]) && dev[train_array[i+1]] == dev[train_array[i]]){
            dev[train_array[i]]++
            free_point--
        }
        if (free_point < 0){
            return false//特訓順序無法達成
        }
    }
    
    return dev.concat([level,free_point])
}

function type_of_player() {
    let dev; 
    switch (document.getElementById("player_type").value) {
        case "type":
            dev = 0;
            
            break;
        case "supreme":
            dev = 87;
            break;
        case "normal":
            dev = 57;
            break;
        default:
            dev = 0;
            break;
    }
    return dev
}

function getGIValues() {
    return ['contact', 'power', 'selection', 'speed', 'defense'].map(stat => {
        let GI = parseFloat(document.getElementById(`GI_${stat}`).value) || 0;
        return GI;
    });
}

function getBaseValues() {
    return ['contact', 'power', 'selection', 'speed', 'defense'].map(stat => {
        let base = parseFloat(document.getElementById(`base_${stat}`).value) || 0;
        return base;
    });
}

function updateTrainingOptions() {
    let allOptions = ['contact', 'power', 'selection', 'speed', 'defense'];
    let selected1 = document.getElementById('training1').value;

    let selected2 = document.getElementById('training2').value;
    
    let training2 = document.getElementById('training2');
    let training3 = document.getElementById('training3');
    
    let availableOptions2 = allOptions.filter(opt => opt !== selected1);
    let availableOptions3 = availableOptions2.filter(opt => opt !== selected2);
    
    training2.innerHTML = '<option value="0">屬性</option>' + availableOptions2.map(opt => `<option value="${opt}" ${opt === selected2 ? 'selected' : ''}>${translateOption(opt)}</option>`).join('');
    training3.innerHTML = '<option value="0">屬性</option>' + availableOptions3.map(opt => `<option value="${opt}">${translateOption(opt)}</option>`).join('');
}

function translateOption(option) {
    let translations = {
        'contact': '接觸',
        'power': '力量',
        'selection': '選球',
        'speed': '速度',
        'defense': '守備'
    };
    return translations[option] || option;
}
