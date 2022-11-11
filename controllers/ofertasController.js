const path =require('path')
const fs = require('fs')
const json_data = fs.readFileSync('./db/ofertas.json','utf-8');
let db = JSON.parse(json_data); 

const controller = {
    list:function(req, res, next) {
        res.render('ofertas',{title:"Ofertas",data:db});
      },
    add:(req,res)=>{
        res.render('addOfertas')
    },
    addPost:(req,res)=>{
       form.parse(req,(err,fields,files)=>{
        if(err){
            next(err);
            return;
        }
        if(fields && files.archivo.size !=0){
            let ext = path.extname(files.archivo.originalFilename);
            console.log(files.archivo.filepath);
            fs.renameSync(files.archivo.filepath,
            path.join(__dirname,`../public/images/${fields.title}-${files.archivo.newFilename}${ext.toLowerCase()}`));
            let servicios =[]
            if(fields.cancha){servicios=[...servicios,fields.cancha]}
            if(fields.playa){servicios=[...servicios,fields.playa]}
            if(fields.pileta){servicios=[...servicios,fields.pileta]}
            if(fields.wifi){servicios=[...servicios,fields.wifi]}
            if(fields.spa){servicios=[...servicios,fields.spa]}
            let src=`${fields.title}-${files.archivo.newFilename}${ext.toLowerCase()}`;
            
            let datos ={
                nombre:fields.nombre,
                email:fields.email,
                ubicacion:fields.ubicacion,
                info:fields.info,
                servicios:servicios,
                title:fields.title,
                id:Date.now().toString(),
                src:src,
            }
            db = [...db,datos];
            let newData = JSON.stringify(db);
            fs.writeFileSync('./db/ofertas.json',newData,'utf-8')
            res.redirect('/ofertas')
        }else{
            res.redirect('/ofertas')
        }
       })
    },
    edit:(req,res)=>{
        let id = req.params.id;
        let ofertas = modeloDatos.getOne(db,id);
        res.render('editOfertas',{ofertas:ofertas})
    },
    editPost:(req,res)=>{
        
        let datos =req.body;
        let servicios=[];
        if(datos.cancha){servicios=[...servicios,datos.cancha]}
        if(datos.playa){servicios=[...servicios,datos.playa]}
        if(datos.pileta){servicios=[...servicios,datos.pileta]}
        if(datos.wifi){servicios=[...servicios,datos.wifi]}
        if(datos.spa){servicios=[...servicios,datos.spa]}

        let misDatos={
            nombre:datos.nombre,
            email:datos.email,
            ubicacion:datos.ubicacion,
            info:datos.info,
            servicios:servicios,
            title:datos.title,
            src:datos.src,
            id:datos.id,
        }
        
        db = modeloDatos.update(db,req.body.id,misDatos)
        let newData = JSON.stringify(db);
            fs.writeFileSync('./db/ofertas.json',newData,'utf-8')
        res.redirect('/ofertas')
    },
    delete:(req,res)=>{
        let id = req.body.id;
        let imgDelete = modeloDatos.getOne(db,id);
        let archivo = imgDelete.src;
        if(fs.existsSync('public/images/'+archivo)){
            fs.unlinkSync('public/images/'+archivo)
        }
        let info = modeloDatos.delete(db,id);
        let newData = JSON.stringify(info);
        fs.writeFileSync('./db/ofertas.json',newData,'utf-8')
        res.redirect('/ofertas/delete')
    },
    deleteDirect:(req,res)=>{
        res.render('aviso')
    },
    all:(req,res)=>{
        res.status(200).json(db);
    }
}
module.exports= controller