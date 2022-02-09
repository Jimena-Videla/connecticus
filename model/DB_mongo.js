import mongoose from 'mongoose'
import config from '../config.js'


class Mongo_DB {
    static conexionOk = false
    static pk = '_id'

    static genIdKey(obj) {
        if(Array.isArray(obj)){
        
            for(let i = 0; i < obj.length; i++ ) {
                obj[i].id = obj[i][Mongo_DB.pk]
            }
        }
        else {
            obj.id = obj[Mongo_DB.pk]
        }

        return obj
    }

    static async conectarDB() {
        try {
            if(!Mongo_DB.conexionOk) {
                await mongoose.connect(config.STR_CNX, {
                    useNewUrlParser : true,
                    useUnifiedTopology: true
                })
                console.log('Base de datos conectada!')
                Mongo_DB.conexionOk = true
            }
        }
        catch(error) {
            console.log(`MongoDB error en conectar: ${error.message}`)
        }
    }
}

export default Mongo_DB