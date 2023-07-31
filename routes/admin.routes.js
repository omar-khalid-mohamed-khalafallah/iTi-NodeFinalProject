const router = require("express").Router();
const productController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller");

router.get(
  "/admin/getAllproducts",
  userController.authenticateToken,
  productController.getAllproducts
);
router.post(
  "/admin/addProduct",
  userController.authenticateToken,
  productController.addProduct
);
router.put(
  "/admin/updateProduct/:id",
  userController.authenticateToken,
  productController.updateProduct
);
router.delete(
  "/admin/deleteProduct/:id",
  userController.authenticateToken,
  productController.deleteProduct
);

router.get(
  "/admin/getAllusers",
  userController.authenticateToken,
  productController.getAllusers
);
router.delete(
  "/admin/deleteUser/:id",
  userController.authenticateToken,
  productController.deleteUser
);

module.exports = router;
