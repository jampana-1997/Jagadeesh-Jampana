<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Training & Placement Dashboard</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
}
body{
    background:#f4f6f9;
    padding:20px;
}
h1{
    text-align:center;
    color:#003366;
    margin-bottom:20px;
}
.dashboard{
    display:flex;
    gap:20px;
    flex-wrap:wrap;
    margin-bottom:20px;
}
.card{
    flex:1;
    min-width:250px;
    background:#fff;
    padding:20px;
    border-radius:10px;
    text-align:center;
    box-shadow:0 2px 8px rgba(0,0,0,0.1);
}
.card h2{
    color:#003366;
}
.card p{
    font-size:32px;
    font-weight:bold;
    color:#0077cc;
    margin-top:10px;
}
.controls{
    display:flex;
    gap:10px;
    margin-bottom:15px;
    flex-wrap:wrap;
}
input,select{
    padding:10px;
    border:1px solid #ccc;
    border-radius:5px;
}
table{
    width:100%;
    border-collapse:collapse;
    background:#fff;
}
th,td{
    border:1px solid #ddd;
    padding:10px;
    text-align:left;
}
th{
    background:#003366;
    color:#fff;
}
tr:nth-child(even){
    background:#f9f9f9;
}
</style>
</head>
<body>

<h1>TRAINING & PLACEMENT DASHBOARD</h1>

<div class="dashboard">
    <div class="card">
        <h2>Total Students</h2>
        <p id="studentCount">0</p>
    </div>

    <div class="card">
        <h2>Total Offer Letters</h2>
        <p id="offerCount">0</p>
    </div>

    <div class="card">
        <h2>Placement %</h2>
        <p id="placementPercent">0%</p>
    </div>
</div>

<div class="controls">
    <input type="text" id="searchInput" placeholder="Search Student..." onkeyup="filterTable()">

    <select id="offerFilter" onchange="filterTable()">
        <option value="">All Offers</option>
        <option value="Yes">Offer Letter Received</option>
        <option value="No">No Offer Letter</option>
    </select>
</div>

<table id="studentTable">
    <thead>
        <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Branch</th>
            <th>Company</th>
            <th>Offer Letter</th>
        </tr>
    </thead>
    <tbody id="tableBody">
    </tbody>
</table>

<script>

// Google Sheet CSV URL
const sheetURL =
"https://docs.google.com/spreadsheets/d/1wB72mFM70AToOAfPmAJepm9IR8HH0lV4M2sVsap3ZnM/gviz/tq?tqx=out:csv";

fetch(sheetURL)
.then(response => response.text())
.then(csv => {

    const rows = csv.split("\n").map(row => row.split(","));

    const tbody = document.getElementById("tableBody");

    let totalStudents = 0;
    let totalOffers = 0;

    for(let i=1;i<rows.length;i++){

        if(rows[i].length < 5) continue;

        totalStudents++;

        let offerStatus = rows[i][4].replace(/"/g,'');

        if(
            offerStatus.toLowerCase().includes("yes") ||
            offerStatus.toLowerCase().includes("received")
        ){
            totalOffers++;
        }

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${rows[i][0].replace(/"/g,'')}</td>
            <td>${rows[i][1].replace(/"/g,'')}</td>
            <td>${rows[i][2].replace(/"/g,'')}</td>
            <td>${rows[i][3].replace(/"/g,'')}</td>
            <td>${offerStatus}</td>
        `;

        tbody.appendChild(tr);
    }

    document.getElementById("studentCount").innerText = totalStudents;
    document.getElementById("offerCount").innerText = totalOffers;

    let percentage = totalStudents > 0
        ? ((totalOffers/totalStudents)*100).toFixed(2)
        : 0;

    document.getElementById("placementPercent").innerText =
        percentage + "%";

})
.catch(error=>{
    console.log(error);
});

function filterTable(){

    let search =
        document.getElementById("searchInput")
        .value.toUpperCase();

    let offer =
        document.getElementById("offerFilter")
        .value.toUpperCase();

    let table =
        document.getElementById("studentTable");

    let tr =
        table.getElementsByTagName("tr");

    for(let i=1;i<tr.length;i++){

        let txt =
            tr[i].innerText.toUpperCase();

        let offerCell =
            tr[i].cells[4].innerText.toUpperCase();

        let show =
            txt.includes(search);

        if(offer !== ""){
            show =
            show &&
            offerCell.includes(offer);
        }

        tr[i].style.display =
            show ? "" : "none";
    }
}

</script>

</body>
</html>
