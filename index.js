(function () {
    // const a = document.querySelector('.abcd')
    const table = new pgdbs(dbs_be1373a5cbcf890f4658dc9f62196ad9d9679f9271a6607af8a02b0276754630)
    const ul = document.querySelector('body ul')
    ul.children[0].style.display = 'none'
    table.onGetData((json, id, url) => {
        if (id === 'getapp') {
            for (let i = 0; i < json['fields'].length; i++) {

                const a = ul.children[0].cloneNode(true)
                a.style.display = 'block'

                a.href = json['fields'][i]['gourl']
                a.children[0].children[0].src = json['fields'][i]['url']
                a.children[0].children[1].children[0].innerHTML = `<strong>${json['fields'][i]['app']}</strong>`
                a.children[0].children[1].children[2].innerText = json['fields'][i]['data']
                ul.appendChild(a)
            }
        }
    })
    table.getTableData({ page: 1, limit: 30, id: 'getapp' })


})()