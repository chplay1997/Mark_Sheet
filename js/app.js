
var listScore =[];
var danhSachDiem = [{
    name:"Hoàng Nguyệt Mỵ Ly",
    math:10,
    physical: 10,
    chemistry: 10,
},{
    name:"Đồng Thế Mác",
    math:9.9,
    physical: 9.8,
    chemistry: 9.7,
},
{
    name:"Nguyễn Thị Phúc Anh",
    math:6.5,
    physical: 7.7,
    chemistry: 4.6,
},
{
    name:"Cúc Tịnh Y",
    math:9,
    physical: 9.1,
    chemistry: 8.7,
},
{
    name:"Diệp Tâm Hạ",
    math:8.8,
    physical: 8.8,
    chemistry: 5.6,
},
{
    name:"Lê Văn Khoa",
    math:6.4,
    physical: 8.4,
    chemistry: 7.4,
},
{
    name:"Nguyễn Lê Hoàng Phi",
    math:7.4,
    physical: 6.4,
    chemistry: 9.4,
},
{
    name:"Mục Ninh Tuyết",
    math:8.3,
    physical: 8.9,
    chemistry: 7.1,
},
{
    name:"Lê Hoàng Ánh",
    math:8.0,
    physical: 9.8,
    chemistry: 7.6,
},
{
    name:"Hoàng Sở Kiều",
    math:8.6,
    physical: 5.2,
    chemistry: 7.7,
},]

//khai báo biến chung
var table = document.getElementById("myTable");
var tr = document.getElementsByTagName("tr");
var formGroup = document.getElementsByClassName("form-group");
var formControl = document.getElementsByClassName("form-control");

//kiểm tra giá trị ô input
for(var i=0 ;i <formControl.length;i++) {
    formControl[i].addEventListener('blur', isInvalid);
    formControl[i].addEventListener('input', notInvalid);
}

//cảnh báo chưa nhập ô input
function isInvalid(event){
    if(event.path[0].value ==''){
        event.path[0].parentElement.parentElement.classList.add('invalid');
        event.path[0].parentElement.parentElement.getElementsByClassName("form-message")[0].innerHTML = "Bạn chưa nhập trường này !";
    }
    //Kiểm tra tính hợp lệ của điểm
    else if(event.path[0].value >10 || event.path[0].value<0){
        event.path[0].parentElement.parentElement.classList.add('invalid');
        event.path[0].parentElement.parentElement.getElementsByClassName("form-message")[0].innerHTML = "Trường này chưa hợp lệ !";
    }
}

//xóa cảnh báo ô input
function notInvalid(event) {
    event.path[0].parentElement.parentElement.classList.remove('invalid');
    event.path[0].parentElement.parentElement.getElementsByClassName("form-message")[0].innerHTML = "";
}

//nhập bảng
function addTable(list,dtb) {
    var row = table.insertRow(tr.length);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    // Add some text to the new cells:
    cell1.innerHTML = tr.length-1;
    cell2.innerHTML = list.name;
    cell3.innerHTML = list.math;
    cell4.innerHTML = list.physical;
    cell5.innerHTML = list.chemistry;
    if(listScore[dtb]!=undefined) {
        cell6.innerHTML = list[dtb];
    }
    else {
        cell6.innerHTML = "?"; 
    }
}

//Nhập điểm
function addStudents () {
    var testScore = { 
        name: "",
        math: 0,
        physical: 0,
        chemistry: 0
    };

    //Kiem tra da nhap input chua
    var check=true;

    for(var i=0 ;i <formControl.length;i++){
        if(formControl[i].value =='' || formGroup[i].classList[1])
            check= false;
    }

    if(check){
        testScore.name = document.getElementById('name').value.trim();
        testScore.math = Number(document.getElementById('math').value).toFixed(1);
        testScore.physical = Number(document.getElementById('physical').value).toFixed(1);
        testScore.chemistry = Number(document.getElementById('chemistry').value).toFixed(1);
        listScore.push(testScore);
 
        addTable(testScore);

        //Xóa ô nhập
        document.getElementById("name").value="";
        document.getElementById("math").value='';
        document.getElementById("physical").value='';
        document.getElementById("chemistry").value='';
    }
    else {
        for(var i=0 ;i <formControl.length;i++) {
            if(formControl[i].value ==''){
                formControl[i].parentElement.parentElement.classList.add('invalid');
                formControl[i].parentElement.parentElement.getElementsByClassName("form-message")[0].innerHTML = "Bạn chưa nhập trường này !";
            }
        }
    }
    
}

//Nhập điểm nhanh
function fastAdd () {
    for(var i =0 ;i<danhSachDiem.length;i++){
        addTable(danhSachDiem[i]);
        listScore.push(danhSachDiem[i]);
    }
}

//tính điểm trung bình
function mediumScore() {
    for(var i = 1,row;row = table.rows[i];i++){
        var sum =0;
        for(var j = 2,col;col = row.cells[j];j++){
            if(j<5){
                var score = Number(col.innerHTML);
                sum+=score;
                }
            else{
                col.innerHTML = (sum/3).toFixed(1);
                listScore[i-1].DTB = Number((sum/3).toFixed(1));
                }
        }
    }
}

//bôi đỏ học sinh giỏi
function goodStudents() {
    for(var i = 1,row;row = table.rows[i];i++){
        var score = Number(row.cells[5].innerHTML);
        if(score >=8.0)
            row.style.color= "red"; 
    }
}

//delete table
function onlyDeleteTable() {
    var i=listScore.length;
    while(i) {
        table.deleteRow(i);
        i--;
    }
}
//Sắp xếp
function sort(typeSort) {
    if(listScore.length>0){

        if(listScore[0][typeSort] != undefined){
            var length = listScore.length;
            if(length!=0){
                var isMediumScore= table.rows[1].cells[5].innerHTML != '?';
            }
            var isRed= false;
            for(var i=0;i<length;i++){
                if(table.rows[i].getAttribute("style") == "color: red;")
                {
                    isRed =true;
                    break;
                }
            }
            onlyDeleteTable();
            
            if(typeSort == 'name') {
                for(var i =0;i<length-1;i++){
                    for(var j=i+1;j<length;j++){
                        var ex=listScore[i];
                        var name1 = listScore[i][typeSort].split(" ");
                        var name2 = listScore[j][typeSort].split(" ");
                        name1=name1[name1.length-1];
                        name2=name2[name2.length-1];
    
                        if(name1[0].localeCompare(name2[0])==1){
                            listScore[i]=listScore[j];
                            listScore[j]=ex;
                        }
                    }
                }
            }
            else {
                for(var i =0;i<length-1;i++){
                    for(var j=i+1;j<length;j++){
                        var ex=listScore[i];
                        if(listScore[i][typeSort]>listScore[j][typeSort]){
                            listScore[i]=listScore[j];
                            listScore[j]=ex;
                        }
                    }
                }
            }
            for(var i =0 ;i<length;i++){
                addTable(listScore[i],"DTB");
            }
            if(isMediumScore){
                mediumScore();
            }
            if(isRed){
                goodStudents();
            }
        }
    }
}

//tìm kiếm
function search() {
    var index=event.srcElement.parentElement.getElementsByClassName('more-input')[0].value;
    if(index<=0 || index>listScore.length)
        event.srcElement.parentElement.getElementsByClassName('more-message')[0].innerHTML = "Không tìm thấy STT "+index;
    else {
        table.rows[index].style = "background-color: #18e418;";
    }
}

//chỉnh sửa
function change() {
    var index=event.srcElement.parentElement.getElementsByClassName('more-input')[0].value;
    if(index<=0 || index>listScore.length)
        event.srcElement.parentElement.getElementsByClassName('more-message')[0].innerHTML = "Không tìm thấy STT "+index;
    else {
        event.target.parentElement.classList.add('complete');
        event.target.parentElement.innerHTML = 
       `
       <input type='button' id="mobile-view" value='STT' style="width: 10%;">
        <input type='button' value='Họ tên' style="width: 25%">
        <input type='button' value='Toán' style="width: 15%;">
        <input type='button' value='Lý' style="width: 15%;">
        <input type='button' value='Hóa' style="width: 15%;">
        <input type='button' value='TB' style="width: 15%;"> 
        <br>
        <input class='more-change' id="mobile-view" type='button' value='${(index)}' style="width: 10%;">

        <input class='more-change' value='${listScore[index -1].name}' style="width: 25%">

        <input class='more-change' type='number' placeholder= "1~10" value='${listScore[index -1].math}' style="width: 15%;">

        <input class='more-change' type='number' placeholder= "1~10" value='${listScore[index -1].physical}' style="width: 15%;">

        <input class='more-change' type='number' placeholder= "1~10" value='${listScore[index -1].chemistry}' style="width: 15%;">

        <input type='button' value='${listScore[index -1].DTB?listScore[index -1].DTB:"?"}' style="width: 15%;">
        <br>
        <span class='change-message' style="width: 10%; display:inline-block;"></span>

        <span class='change-message'  style="width: 25%;display:inline-block;"></span>

        <span class='change-message'  style="width: 15%;display:inline-block;"></span>

        <span class='change-message'  style="width: 15%;display:inline-block;"></span>

        <span class='change-message'  style="width: 15%;display:inline-block;"></span>

        <span style="width: 15%;display:inline-block;"></span>
        <br>
        <button type="button" id="change" onclick="moreChange()" class="btn btn-success">Hoàn thành</button> <br> <hr>`   
    }
    var data = document.getElementsByClassName('more-change');
    var mes = document.getElementsByClassName('change-message');
    for(var i=1;i<data.length;i++){
        data[i].name = i;
        data[i].addEventListener('blur', function (event){
            if(event.target.value ==''){
                event.target.classList.add('invalid');
                mes[event.target.name].innerHTML = "Bạn chưa nhập trường này !";
            }
            //Kiểm tra tính hợp lệ của điểm
            else if(event.target.value >10 || event.target.value<0){
                event.target.classList.add('invalid');
                mes[event.target.name].innerHTML = "Trường này chưa hợp lệ !";
            }
        });
        data[i].addEventListener('input', function (event){
            event.target.classList.remove('invalid');
            mes[event.target.name].innerHTML = "";
        });
    }

}

function moreChange(){
    var data = document.getElementsByClassName('more-change');
    var check=true;
    for(var i=0 ;i <data.length;i++){
        if(data[i].value =='' || data[i].classList[1])
            check= false;
    }
    if(check){
        var index = data[0].value -1;
        listScore[index].name= (data[1].value).replace(/\s+/g, ' ').trim();
        listScore[index].math= Number(data[2].value).toFixed(1);
        listScore[index].physical= Number(data[3].value).toFixed(1);
        listScore[index].chemistry= Number(data[4].value).toFixed(1);
            var length = listScore.length;
            if(length!=0){
                var isMediumScore= table.rows[1].cells[5].innerHTML != '?';
            }
            var isRed= false;
            for(var i=0;i<length;i++){
                if(table.rows[i].getAttribute("style") == "color: red;")
                {
                    isRed =true;
                    break;
                }
            }
            onlyDeleteTable();
            for(var i =0 ;i<length;i++){
                addTable(listScore[i],"DTB");
            }
            if(isMediumScore){
                mediumScore();
            }
            if(isRed){
                goodStudents();
            }
        
            event.srcElement.parentElement.innerHTML = `
            <input class="more-input" type="number" placeholder="Hãy nhập STT" >
              <button type="button" id="change" onclick="change()" class="btn btn-outline-info">Chỉnh sửa</button>
              <span class="more-message"></span>
              <hr>
            `
            table.rows[index+1].style = "background-color: rgba(163, 163, 42, 0.397);";
    }
}

//Xoa bang
function deleteTable() {
    var index=event.srcElement.parentElement.getElementsByClassName('more-input')[0].value;
    if(index<=0 || index>listScore.length)
        event.srcElement.parentElement.getElementsByClassName('more-message')[0].innerHTML = "Không tìm thấy STT "+index;
    else {
        var length = listScore.length;
        if(length!=0){
            var isMediumScore= table.rows[1].cells[5].innerHTML != '?';
        }
        var isRed= false;
        for(var i=0;i<length;i++){
            if(table.rows[i].getAttribute("style") == "color: red;")
            {
                isRed =true;
                break;
            }
        }
        onlyDeleteTable();
        listScore.splice(index-1,1);
        console.log(listScore);
        var length= listScore.length;
        for(var i =0 ;i<length;i++){
            addTable(listScore[i],"DTB");
        }
        if(isMediumScore){
            mediumScore();
        }
        if(isRed){
            goodStudents();
        }
    }
}

//Xóa tất cả
function deleteAll(){
    onlyDeleteTable();
    var length = listScore.length;
    listScore.splice(0,length);
}


