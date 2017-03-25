function f_print(Str) {
    var div1 = document.getElementById("div1");
    div1.innerHTML += Str + "<br>";
}

function read_sides() {
    var a = document.getElementById('first').value;
    var b = document.getElementById('second').value;
    var c = document.getElementById('third').value;
    var html = 'a = <b>' + a  + '</b> b = <b>' + b + '</b> c = ' + c ; 
    document.getElementById('result').innerHTML = html;
}

