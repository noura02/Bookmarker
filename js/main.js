var inputName = document.getElementById('name');
var url = document.getElementById('url');
var submitBtn = document.getElementById('submitBtn');
var links = document.getElementById('links');
var inputs = document.getElementsByClassName('form-control');
var allData = [];
var nameAlert = document.getElementById('alert-1');
var urlAlert = document.getElementById('alert-2');
var scrollBtn = document.getElementById('scrollBtn');

//to display saved in the table
if (JSON.parse(localStorage.getItem('bookmarks')) != null) {
    allData = JSON.parse(localStorage.getItem('bookmarks'));
    displayData();
}
inputName.classList.remove('is-valid');
url.classList.remove('is-valid');


submitBtn.onclick = function check() {
    if (url.value == '' && inputName.value == '') {
        urlAlert.classList.remove('d-none');
        nameAlert.classList.remove('d-none');
        submitBtn.disabled = 'true';
        scrollBtn.style.display='none'

    }
    else if (url.value == '') {
        urlAlert.classList.remove('d-none');
        submitBtn.disabled = 'true';
        scrollBtn.style.display = 'none'


    }
    else if (inputName.value == '') {
        nameAlert.classList.remove('d-none');
        submitBtn.disabled = 'true';
        scrollBtn.style.display = 'none'


    }
 
    else {
        nameAlert.classList.add('d-none');
        urlAlert.classList.add('d-none');
        submitBtn.removeAttribute('disabled');
        scrollBtn.style.display = 'block'

        addData();
        displayData();
        reset()

    }
}
function addData(){
    var data = {
        name: inputName.value,
        address: url.value,
    }
    allData.push(data);
    localStorage.setItem('bookmarks', JSON.stringify(allData));

}

function displayData() {
    var cartona = '';
    for (var i = 0; i < allData.length; i++) {
        cartona += `<div class="data d-flex justify-content-between p-2 m-1">
                    <h3>${allData[i].name}</h3>
                   <div>
                   <a href="${allData[i].address}" target="_blank"><i class="fas fa-sign-in-alt p-2"></i></a>
                   <i class="fas fa-trash-alt p-2" onclick='deleteLinks(${i})' ></i></div></div>`;
    }
    links.innerHTML = cartona;
}

function reset() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function deleteLinks(index) {
    allData.splice(index,1);
    displayData();
    localStorage.setItem('bookmarks', JSON.stringify(allData));

}

inputName.onkeyup = function () {
    var nameRejex = /^[A-Za-z]{3,9}$/;
    if (!nameRejex.test(inputName.value)){
        submitBtn.disabled = 'true';
        inputName.classList.add('is-invalid');
        inputName.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
       

    }
    else {
        submitBtn.removeAttribute('disabled')
        inputName.classList.remove('is-invalid');
        inputName.classList.add('is-valid');
        nameAlert.classList.add('d-none');
   
    }
}

url.onkeyup = function () {
    var urlRejex = /^^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (!urlRejex.test(url.value)) {
        submitBtn.disabled = 'true';
        url.classList.add('is-invalid');
        url.classList.remove('is-valid');
        urlAlert.classList.remove('d-none');
    }
    else {
        submitBtn.removeAttribute('disabled')
        url.classList.remove('is-invalid');
        url.classList.add('is-valid');
        urlAlert.classList.add('d-none');

    }
}











