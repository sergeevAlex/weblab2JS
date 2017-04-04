const right_tr = 1;
const acute_tr = 2;
const obtuse_tr = 3;
//Не работает с this(только если сделать addEventListener('',func(){call...})) + 
function Triangle(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    
    
    this.perimetr = function() {
        return this.a + this.b + this.c;    
    }
    
    
        this.middlelane = function() {
        var md = document.getElementById('middleLane');
        md.style.display = 'inline';
        md.appendChild(document.createElement("p"));
        md.appendChild(document.createTextNode("Middlelane between a&b: " + c/2));
        md.appendChild(document.createElement("p"));
        md.appendChild(document.createTextNode("Middlelane between b&c: " + a/2));
        md.appendChild(document.createElement("p"));
        md.appendChild(document.createTextNode("Middlelane between a&c: " + b/2));
    }
        
    this.type_of_triangle = function() {
        var tr = [];
        tr[0] = a;
        tr[1] = b;
        tr[2] = c;
        tr.sort(sortNumber);
        var max = tr[0];
        var ave = tr[1];
        var min = tr[2];
        var md1  = document.getElementById('middleLane');
        md1.style.display = 'inline';
        md1.appendChild(document.createElement("p"));
        if(max*max > min*min+ ave*ave)
        md1.appendChild(document.createTextNode("Triangle is: acute" ));
    else if(max*max < min*min+ ave*ave)
        md1.appendChild(document.createTextNode("Triangle is: obtuse" ));
    else md1.appendChild(document.createTextNode("Triangle is: right_tr" ));
}
    
    this.value_of_angles = function(){
        var md1  = document.getElementById('middleLane');
        md1.style.display = 'inline';
        if(((b+c-a) > 0) && ((a+c-b) > 0) && ((a+b-c) > 0))
        md1.appendChild(document.createElement("p"));

        var Alpha = Math.acos((a*a + b*b - c*c)/(2*a*b))*180.0/Math.PI;
        md1.appendChild(document.createTextNode("Alpha is: "  + Alpha ));
        
        var Betta = Math.acos((a*a + c*c - b*b)/(2*a*c))*180.0/Math.PI;
        md1.appendChild(document.createElement("p"));

        md1.appendChild(document.createTextNode("Betta is: "  + Betta ));
        var Gamma = 180-(Alpha+Betta);
        md1.appendChild(document.createElement("p"));
        md1.appendChild(document.createTextNode("Gamma is: "  + Gamma ));
    } 
}


function sortNumber(a,b) {
    return b - a ;
}

var current;

function View(a,b,c){
    Triangle.call(this,a,b,c);
    this.CreateView = function(index){
        var view = document.createDocumentFragment();
        var b_delete = document.createElement("img");
        b_delete.src = "img/del.png";
        b_delete.width = "25";
        b_delete.addEventListener("click", function(){
        data.deleteT(index);
        });
        view.appendChild(b_delete);
        return view;
    }
    
    this.CreateFun = function(index) {
        
        var f_view = document.createDocumentFragment();
        var edit_button = document.createElement("img");
        edit_button.width = "25";
        edit_button.src = "img/edit.svg";
        edit_button.addEventListener("click", function(){
        var md3 = document.getElementById('edit');
        md3.removeAttribute('style');
            current = index;
        });
        f_view.appendChild(edit_button);
        var middle_button = document.createElement("img");
        middle_button.width = "25";
        middle_button.src = "img/ml.png";
//        middle_button.addEventListener("mouseover", this.middlelane);
        middle_button.addEventListener("mouseover", this.middlelane);

    

        middle_button.addEventListener("mouseout", function() {
            var md = document.getElementById('middleLane');
            md.style.display = 'none';
            md.innerHTML = '';
            });
        f_view.appendChild(middle_button);
        
        var type_button = document.createElement("img");
        type_button.width = "25";
        type_button.src = "img/trtype.png";
        type_button.addEventListener("mouseover", this.type_of_triangle);
        type_button.addEventListener("mouseout", function() {
           var md4 = document.getElementById('middleLane');
            md4.style.display = 'none';
            md4.innerHTML = '';
            });
        f_view.appendChild(type_button);
        
        var angle_button = document.createElement("img");
        angle_button.width = "25";
        angle_button.src = "img/angle.png";
        angle_button.addEventListener("mouseover",this.value_of_angles);
        angle_button.addEventListener("mouseout", function(){
        var md5 = document.getElementById('middleLane');
        md5.style.display = 'none';
        md5.innerHTML = '';
            
        });
        f_view.appendChild(angle_button);
        return f_view;
    }


    this.CreateRow = function(index){
        var tr = document.createElement('tr');
        tr.id = "row_" + index;
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(this.a + " "));
        td.appendChild(document.createTextNode(this.b + " "));
        td.appendChild(document.createTextNode(this.c));
        tr.appendChild(td);
        var td1 = document.createElement('td');
        td1.appendChild(this.CreateFun(index));
        tr.appendChild(td1);
        
        var td2 = document.createElement('td');
        td2.appendChild(this.CreateView(index));
        tr.appendChild(td2);
        return tr;
    }   
}


var data = {
    triangles : [
        new View(3,4,5),
        new View(18,18,22),
        new View(30,40,50),
        new View(11,22,33)
    ],    
        refreshTable : function() {
            var tableBody = document.getElementById('triangles');
            tableBody.innerHTML= '';
            for(var i =0;i<this.triangles.length;i++){
                tableBody.appendChild(this.triangles[i].CreateRow(i))
            }
        },

        add : function(a,b,c) {
            this.triangles.push(new View(a,b,c));
            this.refreshTable();
        },
    
        addNew : function() {
            this.add(document.getElementById('side_a').value, document.getElementById('side_b').value, document.getElementById('side_c').value);
            this.refreshTable();
        },
    
        edit : function() {
//            this.triangles[current].a = document.getElementById('edit_a').value;
//            this.triangles[current].b = document.getElementById('edit_b').value;
//            this.triangles[current].c = document.getElementById('edit_c').value;
            var tr  = new View(document.getElementById('edit_a').value,document.getElementById('edit_b').value,document.getElementById('edit_c').value);
            this.triangles[current] = tr;
            
            this.refreshTable();
        },
        deleteT : function(index) {
            this.triangles.splice(index,1);
            this.refreshTable();
        }
}