const csvUrl =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRIwfuJU43o5Ee3hlt_3EmXzOu0rsTIzJKxkCEAuwDNmmhshgeBMZFoEp9YPZYnkTEzUoQ8BEBx93yq/pub?gid=1181255206&single=true&output=csv";

const tableBody =
document.getElementById("tableBody");

const searchBox =
document.getElementById("searchBox");

const batchFilter =
document.getElementById("batchFilter");

const branchFilter =
document.getElementById("branchFilter");

const companyFilter =
document.getElementById("companyFilter");

const placed =
document.getElementById("placed");

const offers =
document.getElementById("offers");

let allData=[];

Papa.parse(csvUrl,{
download:true,
header:true,

complete:function(results){

allData=
results.data.filter(
r=>r["Roll Number"]
);

loadTable(allData);

}

});

function loadTable(data){

let html="";

let students=
new Set();

data.forEach(row=>{

students.add(
row["Roll Number"]
);

html+=`
<tr>
<td>${row["Roll Number"]||""}</td>
<td>${row["Batch"]||""}</td>
<td>${row["Name"]||""}</td>
<td>${row["Branch"]||""}</td>
<td>${row["Company Placed"]||""}</td>
<td>${row["Salary package"]||""}</td>
</tr>
`;

});

tableBody.innerHTML=html;

placed.innerText=
students.size;

offers.innerText=
data.length;

}
