export const idValidation = (req, res, next) => {
    if (req.body.id && req.body.id !== req.params.productId) {
        res.status(404).json({ msg: 'Error en validacion de ID del producto' });
    } else {
        next();
    }
}