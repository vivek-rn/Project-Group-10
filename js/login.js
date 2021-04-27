
let data = [];
let token = 0, colValue = 0;
$(document).ready(function () {
  $(".loader").css("visibility", "hidden");
  $("p").css("visibility", "hidden");
  data = sessionStorage.getItem('usedata');
  if (data == null) {
    $('.main').css("display", "block");
    $('.mainimg1').css("display", "block");
    $('.mainimg2').css("display", "block");
    $('.container').css("display", "none");
  }
  else {
    $('.main').css("display", "none");
    $('.mainimg1').css("display", "none");
    $('.mainimg2').css("display", "none");
    $('.container').css("display", "block");
    userdata(data);
    getdatas(data);
  }
});


tokenvalue = -1;
users = [];

var script_url = "https://script.google.com/macros/s/AKfycbwRSBl0FrPA4GyDcit9ZxPTfiqhMxUc-wSpxxg2JLrzRFyvadfWWiE1Y1uGozpkG1G8/exec";

function log() {

  $(".loader").css("visibility", "visible");


  var id1 = $("#login-uname").val();
  var name = $("#login-pass").val();

  if (id1 != "" && name != "") {
    var url = script_url + "?callback=ctrll&name=" + name + "&id=" + id1 + "&action=insert";
  }
  else {
    $("p").html('*login fields empty');
    $("p").css("visibility", "visible");
    $(".loader").css("visibility", "hidden");
  }
  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp"
  });

};

function ctrll(e) {

  $("#relo").val(e.result);
  var val = $("#relo").val();
  parseInt(val);
  $("#relo").css("visibility", "hidden");
  checkLoginl(val);
  tokenvalue = val;
  console.log(tokenvalue);
};


function checkLoginl(a) {
  if (a > 0) {
    // alert("Login Sucessfull");
    $(".loader").css("visibility", "visible");
    $("p").css("visibility", "hidden");
    $("input").css("border", "1px solid black");
    $("#log").css("border", "none");
    pageRedirect(a);
  }
  else {
    // alert("Login Un-Sucessfull");
    $("p").html('*Incorrect username or password');
    $(".loader").css("visibility", "hidden");
    $("input").css("border", "2px solid red");
    $("#log").css("border", "none");
    $("p").css("visibility", "visible");

  }
};

function fetchvalues() {
  console.log(fv.fileId);
}

function pageRedirect(b) {
  var url = script_url + "?tokenval=" + b + "&action=read";
  $('.main').css("display", "none");
  $('.mainimg1').css("display", "none");
  $('.mainimg2').css("display", "none");
  $('.container').css("display", "block");
  $.getJSON(url, function (json) {
    for (var i = 0; i < json.records.length; i++) {

      users[i] = json.records[i];
    }
    if (users.length <= 0) {
      $(".loader").css("visibility", "visible");
    }
    else {
      $(".loader").css("visibility", "visible");
      console.log(data);
      window.location.reload();
    }
    tempdata(users);
    window.sessionStorage.setItem("usedata", JSON.stringify(users));
  });

};



function userdata(datas) {
  data = datas.split(',');
  var udata = [];

  for (i = 0; i < data.length; i++) {
    udata[i] = data[i].replace(/['"]+/g, '');
  }


  strsrc = "https://drive.google.com/uc?export=view&id=" + udata[2];
  $("#profile_pic").attr("src", strsrc);
  $("#profile_name").html(udata[1]);
  for (j = 3; j < udata.length; j++) {
    var li = document.createElement('li');
    var patient = document.createElement("div");
    patient.setAttribute('class', 'patient-box');
    $(".patients_list").append(li);
    $(li).append(patient);
  }
  display_boxes();
}


function logout() {
  sessionStorage.removeItem('usedata');
  window.location.reload();
}

function getdatas() {
  var udata = [];
  for (i = 0; i < data.length; i++) {
    udata[i] = data[i].replace(/['"]+/g, '');
  }
  udata[0] = udata[0].replace("[", '');
  return udata;
}


function tempdata(datas) {
  dataarr = datas;
  return dataarr;
}

// function hello(){
//   c=getdatas();
//   for(var i=3; i<c.length;i++)
//   {
//     c[i]=c[i].split("*#$");
//   }
//   console.log(c[4][0]);
// }

function closebox(){
  document.getElementById('modal-input').style.display="none";
  document.getElementById('modal-output').style.display="none";
  console.log('hello');
}

function oinput(){
  if (document.getElementById('modal-input').style.display=="none"){
  document.getElementById('modal-input').style.display="block";
  }
}

function refresh() {
  $(".modal").css("visibility", "hidden");
  t = getdatas()
  console.log(t[0]);
  checkLoginl(t[0]);
}

function display_boxes() {
  c = getdatas();


  for (var i = 3; i < c.length; i++) {
    c[i] = c[i].split("*#$");
  }
  for (var j = 3; j < c.length; j++) {
    var pimg = document.createElement('img'), pname = document.createElement('h4'),
      lblname= document.createElement('label'),lblage= document.createElement('label'),
      page = document.createElement('h4'), paddress = document.createElement('h4'),
      pbgroup = document.createElement('h4'), pguardian = document.createElement('h4'),
      pphone = document.createElement('h4'), btndelete = document.createElement('input');

    pimg.setAttribute('class', 'pimg boxvalues');
    pname.setAttribute('class', 'paname boxvalues');
    page.setAttribute('class', 'paage boxvalues');
    paddress.setAttribute('class', 'paaddress boxvalues');
    pbgroup.setAttribute('class', 'pabgroup boxvalues');
    pguardian.setAttribute('class', 'paguardian boxvalues');
    pphone.setAttribute('class', 'paphone boxvalues');
    lblname.setAttribute('class', 'lblname');
    lblage.setAttribute('class', 'lblage');

    btndelete.setAttribute('type', 'button'); btndelete.setAttribute('value', 'Delete Patient'); btndelete.setAttribute('class', 'btndelete');

    lblname.innerHTML="Name";
    lblage.innerHTML="Age";
    pimg.src = "https://drive.google.com/uc?export=view&id=" + c[j][0];
    pname.innerHTML = c[j][1];
    page.innerHTML = c[j][2];
    paddress.innerHTML = c[j][3];
    pbgroup.innerHTML = c[j][4];
    pguardian.innerHTML = c[j][5];
    pphone.innerHTML = c[j][6];

    lblname.style.marginTop="2vw";lblname.style.color="#0037ff";
    lblage.style.marginTop="1.5vw";lblage.style.color="#0037ff";
    pname.style.fontWeight = "bold"; pname.style.fontSize = "2vw";pname.style.margin = "0";
    page.style.fontSize = "2vw"; page.style.margin = "0 0 1vw 0";
    paddress.style.display = "none"; paddress.style.margin = "0"; paddress.style.fontSize = "2vw";
    pbgroup.style.display = "none"; pbgroup.style.margin = "0"; pbgroup.style.fontSize = "2vw";
    pguardian.style.display = "none"; pguardian.style.margin = "0"; pguardian.style.fontSize = "2vw";
    pphone.style.display = "none"; pphone.style.margin = "0"; pphone.style.fontSize = "2vw";
    btndelete.style.backgroundColor = 'red'; btndelete.style.color = 'white';

    document.getElementsByClassName('patient-box')[j - 3].style.display="flex";

    document.getElementsByClassName('patient-box')[j - 3].setAttribute("data-myattribute", (j - 3));

    
    
    document.getElementsByClassName('patient-box')[j - 3].appendChild(pimg);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(lblname);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(pname);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(lblage);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(page);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(paddress);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(pbgroup);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(pguardian);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(pphone);
    document.getElementsByClassName('patient-box')[j - 3].appendChild(btndelete);
    document.getElementsByClassName('btndelete')[j - 3].setAttribute("data-attribute", (j - 3));

    document.getElementsByClassName('patient-box')[j - 3].setAttribute('onclick', 'boxclick(event)');
    document.getElementsByClassName('btndelete')[j - 3].setAttribute('onclick', 'deleteclick(event)');

  }
}

function boxclick(event) {
  var b = event.target.childNodes.length;
  document.getElementById('modal-output').style.display="block";
  document.getElementsByClassName('showdata')[0].src = event.target.childNodes[0].src;
  for (var i = 1; i < event.target.childNodes.length; i++) {
    document.getElementsByClassName('showdata')[i].value = event.target.childNodes[i].innerHTML;
  }
}

function deleteclick(event) {
  var del = event.target.getAttribute("data-attribute");
  var ci = parseInt(del) + 6;
  var t = getdatas();
  var ri = parseInt(t[0]) + 1;
  console.log(ci + " and  " + ri);

  $(".loader").css("visibility", "visible");
  $("#modal-output").css("visibility", "hidden");

  var url = script_url + "?callback=ctrlq&rval=" + ri + "&cval=" + ci + "&action=delete";


  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp"
  });

}

function ctrlq(e) {

  var val1 = 0;
  $("#relq").val(e.result);
  val1 = $("#relq").val();
  if (val1 != 0) {
    alert(val1);
    refresh();
    $(".loader").css("visibility", "hidden");
  }
  else{
    $(".loader").css("visibility", "visible");
  }
};

function closing() {
  document.getElementById('modal-output').removeChild(document.querySelectorAll('boxvalues'));
}

/*Modal*/
function psubmit() {
  var pimgfile = fv.fileId;
  var name = $('#pname').val();
  var age = $('#page').val();
  var address = $('#paddress').val();
  var bgroup = $('#pbgroup').val();
  var guardian = $('#pguardian').val();
  var phone = $('#pphone').val();

  c = getdatas();
  console.log(c[0]);
  var ptoken;
  ptoken = c[0];
  console.log('checking : ' + ptoken);
  var url = script_url + "?callback=ctrladd&ptoken=" + ptoken + "&pfile=" + pimgfile + "&pname=" + name + "&page=" + age + "&paddress=" + address + "&pbgroup=" + bgroup + "&pguardian=" + guardian + "&pphone=" + phone + "&action=add";


  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp"
  });

  $(".loader").css("visibility", "visible");

}

function ctrladd(e) {

  var val2=0
  $("#relo").val(e.result);
  val2 = $("#relo").val();

  if (val2 != 0) {
    alert(val2);
    refresh();
    $(".modal").css("visibility", "hidden");
    $(".loader").css("visibility", "hidden");
  }

}


/*Modal*/


/* file upload */


/* file upload */