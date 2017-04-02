const right_tr = 1;
const acute_tr = 2;
const obtuse_tr = 3;

function Triangle(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    this.print = function(){
        document.write(this.a,this.b,this.c);
    }
    this.middlelane = function(){
//        document.write("Middlelane between a&b: " + c/2);
//        document.write("Middlelane between c&b: " + a/2);
//        document.write("Middlelane between a&c: " + b/2);
//    
    md = document.getElementById('middleLane').setAttribute('dispay','block');
        md.appendChild(document.createTextNode(c/2));
    }
    this.type_of_triangle = function(){
        var tr = [];
        tr[0] = a;
        tr[1] = b;
        tr[2] = c;
        tr.sort(sortNumber);
        var max = tr[0];
        var ave = tr[1];
        var min = tr[2];
        if(max*max > min*min+ ave*ave)
        return acute_tr;
    else if(max*max < min*min+ ave*ave)
        return obtuse_tr;
    else return right_tr;
        }
}

function sortNumber(a,b) {
    return b - a ;
}

function View(a,b,c){
    Triangle.call(this,a,b,c);
    this.CreateView = function(index){
        
        var view = document.createDocumentFragment();
        var b_delete = document.createElement("img");
        b_delete.src = "img/del.png";
        b_delete.width = "25";
        
        b_delete.addEventListener("click",function(){
            data.deleteT(index);
        });
        view.appendChild(b_delete);
        return view;
    }
    
    this.CreateFun = function(index) {
        var f_view = document.createDocumentFragment();
        var middle_button = document.createElement("img");
        middle_button.width = "25";
        middle_button.src = "img/ml.png";
        middle_button.addEventListener("click", this.middlelane);
        f_view.appendChild(middle_button);
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
    
    triangles : [],
        
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
        deleteT : function(index) {
            this.triangles.splice(index,1);
            this.refreshTable();
        }
}