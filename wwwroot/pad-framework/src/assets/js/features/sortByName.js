document.addEventListener("DOMContentLoaded", async function () {

    const sortBtn = document.querySelector(".sort-btn");

    //change this selector to the class/id of the table
    let compList = document.querySelector("#scoreboard");

    let nameRow = 1;

    console.log("script is loaded in");

    sortBtn.addEventListener("click", () => {
        //Chane the col selector to the column that the names are in
        sort_table(compList, 0, nameRow); nameRow *= -1;
    })

    function sort_table(tbody, col, asc){
        let rows = tbody.rows
        let rlen = rows.length
        let arr = new Array()

        // fill the array with values from the table
        for(let i = 0; i < rlen; i++){
            let cells = rows[i].cells;
            let clen = cells.length;
            arr[i] = new Array();
            for(let j = 0; j < clen; j++){
                arr[i][j] = cells[j].innerHTML;
            }
        }
        // sort the array by the specified column number (col) and order (asc)
        arr.sort(function(a, b){
            return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1*asc);
        });
        // replace existing rows with new rows created from the sorted array
        for(let i = 0; i < rlen; i++){
            arr[i] = "<td>"+arr[i].join("</td><td>")+"</td>";
        }
        tbody.innerHTML = "<tr>"+arr.join("</tr><tr>")+"</tr>";
    }
});