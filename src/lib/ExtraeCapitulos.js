const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path');
const { Filtro } = require('../helper');

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
            let exp = /[0-9]{1,5}/

            let Np= cap.match(exp);
            
            let contenido;
            let obj;
            
            for (let c = 0; c <= clases.length - 1; c++) {


                

                if (await prs(`.${clases[c].trim()}`).hasClass(clases[c].trim())) {
                    contenido = '';
                    contenido = await prs(`.${clases[c].trim()}`).text()
                        .replaceAll('Leer en tunovelaligera.com', '.')
                        .replaceAll(`Guardar CapituloReportar CapituloPlease complete the required fields.`, '')
                        .replaceAll(`Ayuda a Tunovelaligera a reportar los capitulos mal.`, '')
                        .replaceAll(`Your NameEmailReason (required)Reportar Capitulo en InglesReportar`, '')
                        .replaceAll(`Capitulo de otra novelaReportar Capitulo vacioReportar Capitulo incompletoReportar`, '')
                        .replaceAll(`Capituilo RepetidoDescriptionEnviarVisitar`, '')
                        .replaceAll(`com Si no te muestra siguiente pagina, tienes que volver activar javascript.`, '')
                        .replaceAll(`tunovelaligera.`, '')
                        .replaceAll(`Si no te muestra siguiente pagina,`, '')
                        .replaceAll(`tienes que volver activar javascript.`, '')


                    obj = {
                        cap,
                        titulo,
                        contenido: contenido.split('.').join('.<br><br>'),
                        novelaId: id
                    };
                    arr.push(obj)
                    break;

                } else {

                    if (c == clases.length - 1) {
                        let claseEntry = /entry-content_wrap_s_*\d{4,8}/igm
                        let BuscarClase = await prs('div').html();

                        let claseEncontrada = BuscarClase.match(claseEntry);

                        contenido = '';
                        contenido = await prs(`.${claseEncontrada[0].trim()}`)
                            .text()
                            .replaceAll('Leer en tunovelaligera.com', '.')
                            .replaceAll(`Guardar CapituloReportar CapituloPlease complete the required fields.`, '')
                            .replaceAll(`Ayuda a Tunovelaligera a reportar los capitulos mal.`, '')
                            .replaceAll(`Your NameEmailReason (required)Reportar Capitulo en InglesReportar`, '')
                            .replaceAll(`Capitulo de otra novelaReportar Capitulo vacioReportar Capitulo incompletoReportar`, '')
                            .replaceAll(`Capituilo RepetidoDescriptionEnviarVisitar`, '')
                            .replaceAll(`com Si no te muestra siguiente pagina, tienes que volver activar javascript.`, '')
                            .replaceAll(`tunovelaligera.`, '')
                            .replaceAll(`Si no te muestra siguiente pagina,`, '')
                            .replaceAll(`tienes que volver activar javascript.`, '')


                        obj = {
                            cap,
                            titulo,
                            contenido: contenido.split('.').join('.<br><br>'),
                            Ncap:Np[0],
                            novelaId: id

                        };
                        arr.push(obj)
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


