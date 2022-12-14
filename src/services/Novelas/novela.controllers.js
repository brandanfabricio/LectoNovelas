const Novela = require('../../models/novelas');
const Capitulos = require('../../models/capitulos');
const Pagina = require('../../models/pagina');


class Novelas {



    async AgregarNovela(req, res) {

        try {
            const { body } = req;
            if (body.titulo == '') {
                return res.render('error', { errorMessage: 'No se permiten valores vacio' })
            }

            const AgregarNovela = new Novela(body);
            AgregarNovela.save();



            return res.redirect('/')
        } catch (error) {
            return res.render('error', { errorMessage: error })
        }


    }

    async TodasLasNovela(req, res) {
        const ListaNovelas = await Novela.findAll({
            attributes: ["id", "titulo", "imagen"],
        }) //find().lean();

        return res.render('index', { ListaNovelas })
    }

    async formAgregar(req, res) {
        return res.render('agregarNovela')
    }

    async MostraNovela(req, res) {
        const { id } = req.params
        const desde = Number(req.params.desde) || 1;
        console.log('Desde ', desde)

        let limite = 50;
        let actual = 0;

        const [VerNovela, { count, rows }, pagina] = await Promise.all([


            Novela.findByPk(id),
            //  Capitulos.findAll({ where: { NovelaId: id } }),
            // .populate('novela', 'novela')
            //  .skip((desde * limite) - limite)
            // .limit(limite),//.lean(),
            // Capitulos.count({ where: { NovelaId: id } })

            Capitulos.findAndCountAll({
                where: { NovelaId: id },
                offset: (desde * limite) - limite,
                limit: limite

            }),
            Pagina.findAll({ where: { novelaId: id } }),
            

        ])
        const total = count;
        let totalPagina = Math.ceil(total / limite);

        const ListaCapitulos = rows
        let listadoDeCap = []

        for (let i = 1; i <= totalPagina; i++) {

            let Capitu = {
                cap: id,
                num: i
            }

            listadoDeCap.push(Capitu)
        }





      let recordatorio = pagina.length > 0 ?  pagina[0].dataValues.pagina : 1;

      console.log(recordatorio)

        VerNovela.dataValues.recordatorio = recordatorio


        ListaCapitulos.map((e, i) => {
            e.dataValues.actual = desde
            e.dataValues.pagina = i + 1 + (desde * limite) - limite
        })

        //  console.log(ListaCapitulos)

        console.log()
        return res.render('VerNovela', {
            VerNovela,
            ListaCapitulos,


            page: {
                actual: desde,
                pagina: desde + 1,
                limite,
                totalPagina,
                listadoDeCap,
                totalCapitulos: total
            }
        })

    }



}

module.exports = new Novelas;
