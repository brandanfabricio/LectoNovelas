const Novela = require('../../models/novelas');
const Capitulos = require('../../models/capitulos');


class Novelas {

    async HolaMundo(req, res) {
        return res.render('index', { ms: 'putoo' })
    }

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
        const ListaNovelas = await Novela.find().lean();
        return res.render('index', { ListaNovelas })
    }

    async formAgregar(req, res) {
        return res.render('agregarNovela')
    }



    async MostraNovela(req, res) {
        const { id } = req.params
        const desde = Number(req.params.desde) || 1;


        let limite = 10;
        let actual = 0;

        const [VerNovela, ListaCapitulos, total] = await Promise.all([
            Novela.findById(id).lean(),
            Capitulos.find({ novela: id })
                .populate('novela', 'novela')
                .skip((desde * limite) - limite)
                .limit(limite).lean(),
            Capitulos.countDocuments({ novela: id }).lean()
        ])


        let listadoDeCap = []



        let totalPagina = Math.ceil(total / limite);

        // console.log("total" ,totalPagina)
        for (let i = 1; i <= totalPagina; i++) {

            let Capitu = {
                cap: id,
                num: i
            }

            listadoDeCap.push(Capitu)
        }



        // ListaCapitulos   
        ListaCapitulos.map(e=>{
            e.actual = desde
        })



        return res.render('VerNovela', {
            VerNovela,
            ListaCapitulos,

            page: {
                actual: desde,
                pagina: desde + 1,
                limite,
                totalPagina,
                listadoDeCap
            }
        })

        /**
                let limite = 10;
                let actual = 0;
                const [capitulos, total] = await Promise.all([
                    Capitulos.find({}).skip((desde * limite) - limite).limit(limite).lean()
                    ,
                    Capitulos.countDocuments().lean()
                ])
        
                return res.render('LeerCapitulos', {
                    capitulos,
                   
                })
         */

    }



}

module.exports = new Novelas;
