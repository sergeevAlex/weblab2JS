function Triangle(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    this.print = function(){
        document.write(this.a,this.b,this.c);
    }
    this.middlelane = function(){
     return a/2;
    }
    
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
    
    this.CreateRow = function(index){
        var tr = document.createElement('tr');
        tr.id = "row_" + index;
        
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(this.a + " "));
        td.appendChild(document.createTextNode(this.b + " "));
        td.appendChild(document.createTextNode(this.c));
        tr.appendChild(td);
        
        var td1 = document.createElement('td');
//        td1.appendChild(document.createTextNode(this.middlelane()));
        tr.appendChild(td1);
        
        var td2 = document.createElement('td');
        td2.appendChild(this.CreateView(index));
        tr.appendChild(td2);
        return tr;
    }   
}
var data = {
    
    triangles : [
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
        deleteT : function(index) {
            this.triangles.splice(index,1);
            this.refreshTable();
        }
}