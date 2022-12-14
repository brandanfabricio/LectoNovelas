const Capitulos = require('../../models/capitulos');
const Pagina = require('../../models/pagina');
const Novela = require('../../models/novelas');
const ExtrarCitulo = require('../../lib/ExtraeCapitulos')

class Novelas {



    async VerFormulario(req, res) {
        const { id } = req.params;
        const novela = await Novela.findAll({
            where: {
                id: id
            }
        })
        return res.render('agregarCap', { id, novela })

    }




    async AgregarCapitulo(req, res) {
        const { id } = req.params;
        const { body } = req;


        const url = new URL(body.url)
        let cantidadPagina = url.searchParams.get('lcp_page0')

        for (let i = cantidadPagina; i >= 1; i--) {

            url.searchParams.set('lcp_page0', i)
            console.log("################### Capitulos de la Pagina", url.href, " ##########################")

            let dato = await ExtrarCitulo(url.href, id);

            if (dato == String) {

                return await res.send(`<h1>${dato}</h1> <br> <a href="/novela/${id}/1"> Volver </a>  `)
            } else {


                await Capitulos.bulkCreate(dato)

            }
        }


        return await res.redirect(`/novela/${id}/1?`)





    }


    async LeerTodoLosCapitulo(req, res) {

        const { id } = req.params
        const desde = Number(req.params.desde) || 1;
        let limite = 1;
        let actual = 0;



        const { count, rows } = await Capitulos.findAndCountAll({
            where: { NovelaId: id },
            offset: (desde * limite) - limite,
            limit: limite

        })


        const total = count;


        const capitulos = rows


        return res.render('LeerCapitulos', {
            capitulos, id,
            page: {
                actual: desde,
                pagina: desde + 1,
                limite,
                total: Math.ceil(total / limite)
            }
        })

    }



    async UltimaPagina(req, res) {
        const { id, desde } = req.params

        const guardarPagina = {
            pagina: desde -1 ,
            novelaId: id
        }

        const dato = await Pagina.findAll({
            where: {
                novelaId: id
            }
        })

        const Guardar = async (pagina) => {
            const ultimaPagina = new Pagina(pagina);
            await ultimaPagina.save();
        }


        if (dato.length <= 0) {
            console.log("####### Guardando ultimo capitulo visto #####")

            await Guardar(guardarPagina);

            return await res.redirect(`/novela/${id}/1`)


        }

        console.log("#### actualizar ultimo capitulo ### ")


        await Promise.all([
            Pagina.destroy({
                where: {
                    novelaId: id
                }
            }),
            await Guardar(guardarPagina)
        ])


        return await res.redirect(`/novela/${id}/1`)
        // return await res.redirect(`/capitulo/leer/${id}/${desde}`)



    }


}

module.exports = new Novelas;
