const Category = require('../models/categoria');
const Usuario = require('../models/usuario');

const saveCategoria = (req, res) => {
    const data = req.body;
    data.usuario = req.usuario._id;
    data.status = true;
    const newCategory = new Category(data);
    const savedCategory = newCategory.save();

    savedCategory.then(category => res.status(200).json({ok : true, category}))
                .catch(err => res.status(500).json({ok : false , err}));
}

const deleteCategory = (req, res) => {
    const id = req.params.id;
    const data = {status : false}
    const options = {
        new : true,
        runValidators : true,
        context: 'query'
    };
    const deletedCategory = Category.findByIdAndUpdate(id, data, options);
    deletedCategory.then(deletedCategory => {
        if(deletedCategory)res.status(200).json({ok:true, deletedCategory});
        else res.status(400).json({ok : false, err : {name : 'Not Category', message : 'Category not found'}})
    }).catch(err => res.status(500).json({ok : false , err}))
}

const getCategory = (req, res) => {
    const id = req.params.id;
    const category = Category.findOne({$and : [{_id : id}, {status : true}]}).populate({path : 'usuario', select : 'nombre img'});

    category.then(category => {
        if(category) res.status(200).json({ok:true, category});
        else res.status(404).json({ok:false, message : 'Category not found'});
    })
    .catch(err => res.status(400).json({ok:false, err}));
}

const getCategories = (req, res) => {
    const limit = req.params.limit || 5;
    const skip = req.params.skip || 0;
    const categories = Category.find({status : true })
                                .sort('name')
                                .limit(limit*1)
                                .skip(limit*skip*1)
                                .populate({
                                    path : 'usuario',
                                    select : 'nombre img'
                                });

    categories.then(categories => {
                if(categories) res.status(200).json({ok :true, categories});
                else res.status(404).json({ok:false, message : 'No se econtraron categorias'});
                })
                .catch(err => res.status(500).json({ok:false, err : 'Error al hacer la consulta'}));
}

const updateCategory = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const options = {
        new : true,
        runValidators : true,
        context : 'query'
    }
    const updatedCategory = Category.findByIdAndUpdate(id, data, options);

    updatedCategory.then( updatedCategory => {
                        if(updatedCategory) res.status(200).json({ok : true, updatedCategory});
                        else res.status(404).json({ok : false, message : 'Categoria no encontrada'});
                    })
                    .catch(err => res.status(500).json({ok:false, err}));
}

module.exports = {
    saveCategoria,
    deleteCategory,
    getCategory,
    getCategories,
    updateCategory
}

