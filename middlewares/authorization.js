
const authorization = async (req,res,next) => {
    try { //nambahin authorisasi untuk delete dan update cek role dan author ID dari req.userid
        const {role} = req.user
        if ( role !== 'Admin' ) {
            throw{name: 'Unauthorized'}
        }
        next()
    } catch (err) {
        next(err)
    }
}
module.exports = authorization