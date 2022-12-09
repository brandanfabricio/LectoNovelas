const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path');


async function ExtrarCitulo(linkNovela, novela) {

    try {



        let dato = await BuscarLinkDeNovela(linkNovela, novela)
        return await dato







    } catch (error) {
        console.log(error)
    }


}

async function BuscarLinkDeNovela(url, id) {


    try {
        let arr = [];
        let linksCapitulos;
        let data = await fetch(url)

        let text = await data.text()
        let pr = await cheerio.load(text)
        let capitulos = await pr('.lcp_catlist').html()
        let res = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm

        linksCapitulos = capitulos.match(res);

        let clases = await ClasesDeNovela();

        for (let i = linksCapitulos.length - 1; i >= 0; i--) {
            console.log("En proceseso: ", linksCapitulos[i])
            let datos = await fetch(linksCapitulos[i])

            let texto = await datos.text()
            let prs = await cheerio.load(texto)

            let [titulo, cap] = await Promise.all([
                prs('title').text(),
                prs('title').text().replaceAll('-', '')
                    .replaceAll(' ', '-').replaceAll('.', '')
                    .replaceAll('--', '-').replaceAll('---', '-')
            ])
            // let titulo = await prs('title').text().replaceAll('-','').replaceAll(' ','-').replaceAll('.','').replaceAll('--','-')

            let contenido;
            let obj;

            for (let c = 0; c <= clases.length - 1; c++) {



                if (await prs(`.${clases[c].trim()}`).hasClass(clases[c].trim())) {

                    contenido = '';
                    contenido = await prs(`.${clases[c].trim()}`).text().replaceAll('Leer en tunovelaligera.com', '.')
                    obj = {
                        cap,
                        titulo,
                        contenido: contenido.split('.').join('.<br><br>'),
                        novela: id
                    };
                    arr.push(obj)
                    break;

                } else {

                    if (c == clases.length - 1) {
                        console.log("***EL CAPITULO ", linksCapitulos[i], " NO CONTIENE UNA CLASE REGISTRADA***|")
                        break;
                    }
                }


            }

        }

        if (arr.length !== linksCapitulos.length) {
            return 'faltan capitulos y clses';
        } else {
            return arr
        }
        // await fs.writeFileSync('./datos/capitulos.json', JSON.stringify(arr), 'utf-8')

    } catch (error) {
        console.log(error)
    }

    // let clases = await ClasesDeNovela();

    // for (let c = 0; c <= clases.length -1; c++) {

    //    console.log(clases[c])
    // }
    // console.log(clases.length)

}



async function ClasesDeNovela() {

    let arr = [];
    let MisClases = await fs.readFileSync(path.join(__dirname, 'clases.txt'), 'utf-8');


    arr = MisClases.split('\n')

    return arr;
}

module.exports = ExtrarCitulo;


