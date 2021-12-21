import { createConnection, getManager } from "typeorm"
import { Product } from "../entity/product.entity"


createConnection().then(async connection => {
    const repository = getManager().getRepository(Product);

    for(let i = 0; i<30; i++){

    }
    process.exit(0);    
})