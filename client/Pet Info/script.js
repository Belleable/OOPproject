function filterTable() {
    const dropdown = document.querySelector("#status");
    let selectValue = dropdown.value;
    const table = document.querySelector("#vaccine-table");
    let rows = table.getElementsByTagName("tr");

    for(var i=0; i<rows.length; i++) 
    {
        let row = rows[i];
        let status = row.cells[0].className;

        if (selectValue ==="all" || status === selectValue)
        {
            row.style.display="";
        }
        else{
            row.style.display="none";
        }
    }
}

