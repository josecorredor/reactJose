import express, { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/auth.controller";
import { Classifications } from "./controller/classification.controller";
import { CreateExpense, DeleteExpense, Expenses, GetExpense, UpdateExpense } from "./controller/c_expenses.controller";
import { C_weeks } from "./controller/c_week.controller";
import { Upload } from "./controller/image.controller";
import { Chart, ChartBank, ChartCurrentDebt, ChartDebts, ChartExpDet, ChartFiscalJose, ChartFiscalPaola, ChartIncomesJose, ChartIncomesPaola, ChartIncomesW, ChartInitialDebt, ChartJoseFiscal, ChartKindExp, ChartKindExp1, ChartLinePetCom1, ChartLinePetCom2, ChartOutcomesW, ChartPaolaFiscal, ChartSavings, ChartSavingsR, ChartStateDebt, ChartWeek, Export, Orders } from "./controller/order.controller";
import { Permissions } from "./controller/permission.controller";
import { CreateProduct, DeleteProduct, GetProduct, Products, UpdateProduct } from "./controller/product.controller";
import { CreateRole, DeleteRole, GetRole, Roles, UpdateRole } from "./controller/role.controller";
import { Tx_types } from "./controller/tx_type.controller";
import { CreateUser, DeleteUser, GetUser, UpdateUser, Users } from "./controller/c_person.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { PermissionMiddleware } from "./middleware/permission.middleware";


export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthMiddleware, AuthenticatedUser);
    router.post('/api/logout', AuthMiddleware, Logout);
    router.put('/api/users/info', AuthMiddleware, UpdateInfo);
    router.put('/api/users/password', AuthMiddleware, UpdatePassword);

    router.get('/api/users', AuthMiddleware, PermissionMiddleware('users'), Users);
    router.post('/api/users', AuthMiddleware, PermissionMiddleware('users'), CreateUser);
    router.get('/api/users/:id_person', AuthMiddleware, PermissionMiddleware('users'), GetUser);
    router.put('/api/users/:id_person', AuthMiddleware, PermissionMiddleware('users'), UpdateUser);
    router.delete('/api/users/:id_person', AuthMiddleware, PermissionMiddleware('users'), DeleteUser);

    router.get('/api/permissions', AuthMiddleware, Permissions);
    router.get('/api/classifications', AuthMiddleware, Classifications);
    router.get('/api/tx_types', AuthMiddleware, Tx_types);
    router.get('/api/c_weeks', AuthMiddleware, C_weeks);

    router.get('/api/roles', AuthMiddleware, Roles);
    router.post('/api/roles', AuthMiddleware, CreateRole);
    router.get('/api/roles/:id_role', AuthMiddleware, GetRole);
    router.put('/api/roles/:id_role', AuthMiddleware, UpdateRole);
    router.delete('/api/roles/:id_role', AuthMiddleware, DeleteRole);

    router.get('/api/products', AuthMiddleware, PermissionMiddleware('products'), Products);
    router.post('/api/products', AuthMiddleware, PermissionMiddleware('products'), CreateProduct);
    router.get('/api/products/:id_product', AuthMiddleware, PermissionMiddleware('products'), GetProduct);
    router.put('/api/products/:id_product', AuthMiddleware, PermissionMiddleware('products'), UpdateProduct);
    router.delete('/api/products/:id_product', AuthMiddleware, PermissionMiddleware('products'), DeleteProduct);

    router.get('/api/expenses', AuthMiddleware, PermissionMiddleware('expenses'), Expenses);
    router.post('/api/expenses', AuthMiddleware, PermissionMiddleware('expenses'), CreateExpense);
    router.get('/api/expenses/:id_expenses', AuthMiddleware, PermissionMiddleware('expenses'), GetExpense);
    router.put('/api/expenses/:id_expenses', AuthMiddleware, PermissionMiddleware('expenses'), UpdateExpense);
    router.delete('/api/expenses/:id_expenses', AuthMiddleware, PermissionMiddleware('expenses'), DeleteExpense);

    router.post('/api/upload', AuthMiddleware, Upload);
    router.use('/api/uploads', express.static('./uploads'));

    router.get('/api/orders', AuthMiddleware, Orders);
    router.post('/api/export', AuthMiddleware, Export);
    router.get('/api/chart', AuthMiddleware, Chart);
    router.get('/api/chartSaving', AuthMiddleware, ChartSavings);
    router.get('/api/chartSavingR', AuthMiddleware, ChartSavingsR);
    router.get('/api/chartCurrentDebt', AuthMiddleware, ChartCurrentDebt);
    router.get('/api/chartInitialDebt', AuthMiddleware, ChartInitialDebt);
    router.get('/api/chartIncomesW', AuthMiddleware, ChartIncomesW);
    router.get('/api/chartOutcomesW', AuthMiddleware, ChartOutcomesW);
    router.get('/api/chartBank', AuthMiddleware, ChartBank);
    router.get('/api/chartDebts', AuthMiddleware, ChartDebts);
    router.get('/api/chartExpDet', AuthMiddleware, ChartExpDet);
    router.get('/api/chartKindExp', AuthMiddleware, ChartKindExp);
    router.get('/api/chartKindExp1', AuthMiddleware, ChartKindExp1);
    router.get('/api/chartStateDebt', AuthMiddleware, ChartStateDebt);
    router.get('/api/chartIncomesJ', AuthMiddleware, ChartIncomesJose);
    router.get('/api/chartSIncomesP', AuthMiddleware, ChartIncomesPaola);
    router.get('/api/chartWeek', AuthMiddleware, ChartWeek);
    router.get('/api/chartPetrol', AuthMiddleware, ChartLinePetCom2);
    router.get('/api/chartFood', AuthMiddleware, ChartLinePetCom1);
    router.get('/api/chartFiscalJ', AuthMiddleware, ChartJoseFiscal);
    router.get('/api/chartFiscalP', AuthMiddleware, ChartPaolaFiscal);
    router.get('/api/chartFiscalSJ', AuthMiddleware, ChartFiscalJose);
    router.get('/api/chartFiscalSP', AuthMiddleware, ChartFiscalPaola);
}