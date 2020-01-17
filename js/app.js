//Rick and Morty API - Analize!!! Count... Filter...
console.log("rick and morty");
axios
    .get('https://rickandmortyapi.com/api/character/')
    .then(res => {
        const { pages } = res.data.info
        Promise.all([...new Array(pages)].map((el, i) => axios.get(`https://rickandmortyapi.com/api/character/?page=${i + 1}`)))
            .then(res => {
                
                let result = [];
                for (let k = 0; k < res.length; k++) {
                    for (let j = 0; j < res[k].data.results.length; j++) {
                        result.push(res[k].data.results[j]);
                    }
                }

                const columns = {
                    id: 'ID',
                    name: 'Full Name',
                    status: 'Status',
                    species: 'Species',
                    gender: 'Gender',
                };

                let tr = document.createElement('tr');

                for (key in columns) {
                    let th = document.createElement('th');
                    th.innerHTML = columns[key];
                    tr.appendChild(th);
                }

                let thead = document.createElement('thead');
                thead.appendChild(tr);
                let table = document.createElement('table');
                table.appendChild(thead);

                let tbody = document.createElement('tbody');

                for (let i = 0; i < result.length; i++) {
                    let tr2 = document.createElement('tr');
                    for (key in columns) {
                        if (Object.keys(result[i])[key] === Object.keys(columns)[key]) {
                            let td = document.createElement('td');
                            td.innerHTML = result[i][key];
                            tr2.appendChild(td);
                        }
                    }
                    tbody.appendChild(tr2);
                }

                table.appendChild(tbody);

                let col = document.createElement('div');
                col.setAttribute('class', 'col-12');
                let row = document.createElement('div');
                row.setAttribute('class', 'row');
                let container = document.createElement('div');
                container.setAttribute('class', 'container');

                col.appendChild(table);
                row.appendChild(col);
                container.appendChild(row);

                document.getElementById('app').appendChild(container);
            })
    })