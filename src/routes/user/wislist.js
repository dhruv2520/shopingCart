import { wishlistController} from '../../controller/user/wishlist.js'
import {auth} from '../../middleware/auth.js'
import  {Router}  from 'express';
const router = Router();    


router.post("/addwishlist",wishlistController.addWishlist);
router.get("/getwishlist",auth,wishlistController.getWishlist);
export default router;