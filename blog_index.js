let table = new pgdbs(dbs_76465b5008f6fa49e5ea90c51ad57d3925dbe1bc16859e58baeffec2c6dc0221);
const ul = document.querySelector('.a .list ul');
const wenzhang_title = document.querySelector('.wenzhang .title');
const wenzhang = document.querySelector('.wenzhang');
const dang = document.querySelector('.dang');
const chacha = document.querySelector('.chacha');
const riqi = document.getElementById('date')
let data = [];
// const wenzhang_text = document.querySelector('')

(function () {
    //原本的滑动,但是不用了
    // const img = document.querySelector('.list')
    // // console.log(img);
    // window.addEventListener('scroll', function () {
    //     let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    //     img.style.transform = `translateY(-${scrollPosition}px)`
    //     console.log(`translateY(${scrollPosition}px);`);
    // });
    const E = window.wangEditor

    // 切换语言
    const LANG = location.href.indexOf('lang=en') > 0 ? 'en' : 'zh-CN'
    E.i18nChangeLanguage(LANG)

    const editorConfig = {
        placeholder: 'Type here...',
        scroll: false, // 禁止编辑器滚动
        MENU_CONF: {
            uploadImage: {
                fieldName: 'your-fileName',
                // base64LimitSize: 10 * 1024 * 1024 // 10M 以下插入 base64
                async customUpload(file, insertFn) {
                    let myHeaders = new Headers();
                    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
                    console.log(file);
                    let formdata = new FormData();
                    formdata.append("file", file);
                    formdata.append("path", "bcx");

                    let requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: formdata,
                        redirect: 'follow'
                    };

                    fetch("https://api.pgaot.com/user/up_cat_file", requestOptions)
                        .then(response => {
                            return response.json()
                        }
                        )
                        .then(result => {
                            insertFn(result['url'], result['name'], result['url'])
                        }
                        )
                        .catch(error =>
                            console.log(error)
                        );
                }
            }
        },
        onChange(editor) {
            console.log(editor.getText())
        }
    }

    // 先创建 editor
    const editor = E.createEditor({
        selector: '#editor-text-area',
        content: [],
        // html: '',
        config: editorConfig
    })

    // 创建 toolbar
    // const toolbar = E.createToolbar({
    //     editor,
    //     selector: '#editor-toolbar',
    //     config: {
    //         excludeKeys: 'fullScreen',
    //     }
    // })

    // 点击空白处 focus 编辑器
    document.getElementById('editor-text-area').addEventListener('click', e => {
        if (e.target.id === 'editor-text-area') {
            editor.blur()
            editor.focus(true) // focus 到末尾
        }
    })


    editor.disable()



    table.onGetData((json, id, url) => {
        if (id === 'getTableData') {
            for (let i = 0; i < json['fields'].length; i++) {
                console.log(json);
                data = json['fields']
                const newli = ul.children[0].cloneNode(true)
                newli.style.display = 'flex'
                newli.children[0].src = json['fields'][i]['src']
                newli.children[1].children[0].innerText = json['fields'][i]['title']
                newli.children[1].children[1].innerText = json['fields'][i]['text']
                newli.dataset.id = json['fields'][i]['id']
                newli.children[0].dataset.id = json['fields'][i]['id']
                newli.children[1].children[0].dataset.id = json['fields'][i]['id']
                newli.children[1].children[1].dataset.id = json['fields'][i]['id']
                // newli.children[2].dataset.id = json['fields'][i]['id']
                // newli.children[3].dataset.id = json['fields'][i]['id']
                ul.appendChild(newli)

            }
            ScrollReveal().reveal('.s', {
                distance: '10px',
                delay: 0,
                duration: 800,
                interval: 60,
                container: document.documentElement,
                // reset: true
            })
            ScrollReveal().reveal('.s1', {
                distance: '10px',
                delay: 0,
                duration: 800,
                interval: 60,
                container: document.documentElement,
                reset: true
            })
        }
        else if (id === 'getjutidata') {
            if (json['code'] === 200) {
                // console.log(wenzhang_title.parentElement);
                wenzhang.style.display = 'block'
                wenzhang_title.innerText = json['fields'][0]['title']
                editor.setHtml(json['fields'][0]['data'])
            }

        }
    })

    ul.addEventListener('click', e => {
        console.log(e.target.dataset.id);


        const f = sethtml(e.target.dataset.id)
        wenzhang.style.display = 'block'
        wenzhang.style.top = '100%'
        anime({
            targets: wenzhang,
            // translateX: 250,
            top: '10%',
            duration: 1500,
            autoplay: true,
            // easing: 'easeInOutSine'
            // easing: 'easeInOutQuart'
            easing: 'spring(1, 50, 100, 10)'
        });
        wenzhang_title.innerText = f['title']
        editor.setHtml(f['data'])
        riqi.innerText = f['time']
        const gitalk = new Gitalk({
            clientID: 'Ov23lizalL5WkM83XigS',
            clientSecret: '3b8fe1746808cc800bfc1f84582b579678d65bc3',
            repo: 'talk',
            owner: 'zxlwl',
            admin: ['zxlwl'],
            id: f['id'],
            labels: 'talk',      // Ensure uniqueness and length less than 50
            distractionFreeMode: false  // Facebook-like distraction free mode
        })

        gitalk.render('gitalk-container')
    })


    dang.addEventListener('click', () => {

        anime({
            targets: wenzhang,
            // translateX: 250,
            top: '100%',
            duration: 1500,
            autoplay: true,
            // easing: 'easeInOutSine'
            // easing: 'easeInOutQuart'
            easing: 'spring(1, 50, 100, 10)'
        });
        // wenzhang.style.display = 'none'

    })
    chacha.addEventListener('click', () => {
        anime({
            targets: wenzhang,
            // translateX: 250,
            top: '100%',
            duration: 1500,
            autoplay: true,
            // easing: 'easeInOutSine'
            // easing: 'easeInOutQuart'
            easing: 'spring(1, 50, 100, 10)'
        });
        // wenzhang.style.display = 'none'
    })
    shuxin()

})()


function shuxin() {
    ul.innerHTML = '<li class="s" style="display: none;"><img src="./200341-17175890212ada.jpg" alt="" class="s"><div class="wenzhi s"><div class="title s">123</div><div class="dis s">1564687987</div></div></li>'
    table.getTableData({ page: 1, limit: 500, id: 'getTableData' });
}


function sethtml(id) {
    // table.getTableData(
    //     {
    //         page: 1,
    //         limit: 10,
    //         filter: `id=${id}`,
    //         id: 'getjutidata'

    //     }
    // );
    for (let i = 0; i < data.length; i++) {
        if (data[i]['id'] == id) {
            return data[i]
        }
    }
}