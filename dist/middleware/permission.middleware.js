"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionMiddleware = void 0;
const PermissionMiddleware = (access) => {
    return (req, res, next) => {
        const user = req['user'];
        console.log(user);
        const permissions = user.role.permissions;
        console.log(permissions);
        if (req.method === 'GET') {
            if (!permissions.some(p => (p.name === `view_${access}`) || (p.name === `edit_${access}`))) {
                return res.status(401).send({
                    message: 'unauthorized'
                });
            }
        }
        else {
            if (!permissions.some(p => (p.name === `edit_${access}`))) {
                return res.status(401).send({
                    message: 'unauthorized'
                });
            }
        }
        next();
    };
};
exports.PermissionMiddleware = PermissionMiddleware;
