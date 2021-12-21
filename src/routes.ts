import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { Permissions } from "./controller/permission.controller";
import { CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct } from "./controller/product.controller";
import { CreateRole, DeleteRole, GetRole, Roles, UpdateRole } from "./controller/role.controller";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/user.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";


export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthMiddleware, AuthenticatedUser);
    router.post('/api/logout', AuthMiddleware, Logout);
    router.put('/api/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/users/password', AuthMiddleware, UpdatePassword);

    router.get('/api/users', AuthMiddleware, Users);
    router.post('/api/users', AuthMiddleware, CreateUser);
    router.get('/api/users/:id_person', AuthMiddleware, GetUser);
    router.put('/api/users/:id_person', AuthMiddleware, UpdateUser);
    router.delete('/api/users/:id_person', AuthMiddleware, DeleteUser);

    router.get('/api/permissions', AuthMiddleware, Permissions);

    router.get('/api/roles', AuthMiddleware, Roles);
    router.post('/api/roles', AuthMiddleware, CreateRole);
    router.get('/api/roles/:id_role', AuthMiddleware, GetRole);
    router.put('/api/roles/:id_role', AuthMiddleware, UpdateRole);
    router.delete('/api/roles/:id_role', AuthMiddleware, DeleteRole);

    router.get('/api/products', AuthMiddleware, Products);
    router.post('/api/products', AuthMiddleware, CreateProduct);
    router.get('/api/products/:id_product', AuthMiddleware, GetProduct);
    router.put('/api/products/:id_product', AuthMiddleware, UpdateProduct);
    router.delete('/api/products/:id_product', AuthMiddleware, DeleteProduct);
}