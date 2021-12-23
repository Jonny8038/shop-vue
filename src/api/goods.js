import server from '@/http/index'


export function addgoods(form) { //登录
    console.log(form);
    return server({
        url: '/addgoods',
        method: 'post',
        data: {
            goodsname: form.goodsname,
            price: form.price,
            categorys: form.categorys,
            imageArr: form.imageArr,
            desc: form.desc
        }
    })
}