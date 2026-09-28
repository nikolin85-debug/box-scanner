let boxes = {};
let found = new Set();

function saveState() {
    localStorage.setItem(
        "boxes",
        JSON.stringify(boxes)
    );

    localStorage.setItem(
        "found",
        JSON.stringify([...found])
    );
}

function loadState() {

    const b =
        localStorage.getItem("boxes");

    if (b) {
        boxes = JSON.parse(b);
    }

    const f =
        localStorage.getItem("found");

    if (f) {
        found = new Set(
            JSON.parse(f)
        );
    }

    updateStats();
}

function updateStats() {

    let men = 0;
    let women = 0;
    let kids = 0;

    for (const code in boxes) {

        if (found.has(code))
            continue;

        if (boxes[code] === "MEN")
            men++;

        if (boxes[code] === "WOMEN")
            women++;

        if (boxes[code] === "KIDS")
            kids++;
    }

    const menEl =
        document.getElementById("menCount");

    const womenEl =
        document.getElementById("womenCount");

    const kidsEl =
        document.getElementById("kidsCount");

    if (menEl)
        menEl.innerText = men;

    if (womenEl)
        womenEl.innerText = women;

    if (kidsEl)
        kidsEl.innerText = kids;
}

function processCode(code) {

    let result =
        document.getElementById(
            "result"
        );

    if (!result)
        return;

    if (found.has(code)) {

        result.innerHTML =
            "⚠ Уже найден<br>" + code;

        return;
    }

    if (!boxes[code]) {

        result.innerHTML =
            "❌ Нет в списке<br>" + code;

        return;
    }

    found.add(code);

    saveState();

    updateStats();

    result.innerHTML =
        "✅ " +
        boxes[code] +
        "<br>" +
        code;
}

function loadExcel(event) {

    const file =
        event.target.files[0];

    if (!file)
        return;

    const reader =
        new FileReader();

    reader.onload = function (e) {

        const data =
            new Uint8Array(
                e.target.result
            );

        const workbook =
            XLSX.read(
                data,
                {
                    type: "array"
                }
            );

        const sheet =
            workbook.Sheets[
                workbook.SheetNames[0]
            ];

        const rows =
            XLSX.utils.sheet_to_json(
                sheet,
                {
                    header: 1
                }
            );

        boxes = {};

        for (
            let i = 1;
            i < rows.length;
            i++
        ) {

            const row = rows[i];

            if (row[0]) {
                boxes[
                    row[0]
                        .toString()
                        .trim()
                ] = "MEN";
            }

            if (row[1]) {
                boxes[
                    row[1]
                        .toString()
                        .trim()
                ] = "WOMEN";
            }

            if (row[2]) {
                boxes[
                    row[2]
                        .toString()
                        .trim()
                ] = "KIDS";
            }
        }

        found = new Set();

        saveState();

        updateStats();

        alert(
            "Загружено коробов: " +
            Object.keys(boxes)
                .length
        );
    };

    reader.readAsArrayBuffer(file);
}

function testExcel() {

    alert(
        "Всего коробов: " +
        Object.keys(boxes)
            .length
    );
}

window.onload = function () 
