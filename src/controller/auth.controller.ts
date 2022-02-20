import { Request, Response } from "express";
import { getManager } from "typeorm";
import { c_person } from "../entity/c_person.entity";
import { RegisterValidation } from "../validation/register.validation";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {

   const body = req.body;
   
   const {error} = RegisterValidation.validate(body);

   if (error){
      return res.status(400).send(error.details);
   }

   if (body.password !== body.password_confirm){
      return res.status(400).send({
         message: "Password's do not match"
      });
   }

   const repository = getManager().getRepository(c_person);

   const {password, ...c_person1} = await repository.save ({

      name: body.name,
      last_name: body.last_name,
      email: body.email,
      celuphone: body.celuphone,
      address: body.address,
      password: await bcryptjs.hash(body.password, 10),
      person_type: body.person_type,
      goal: body.goal,
      active: body.active,

   });

   res.send(c_person1);
}
export const Login = async (req: Request, res: Response) => {

   const repository = getManager().getRepository(c_person);
   
   const C_person = await repository.findOne({email: req.body.email});

   
   if(!C_person) {
      return res.status(404).send({
         message: 'User no found'
      })
   }

   if(!await bcryptjs.compare(req.body.password, C_person.password)){
      return res.status(400).send({
         message: 'Invalid credentials'
      })
   }


   const token = sign({id: C_person.id_person}, process.env.SECRET_KEY);

   res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60* 60 * 1000 //1 day
   })

   //const {password, ...data}= C_person;

   res.send({
      message: 'success'
   });
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
   const {password, ...user} = req["user"];
   res.send(user);
  
}

export const Logout = async (req: Request, res: Response) => {

   res.cookie('jwt','', {maxAge:0});

   res.send({
      message: 'success'
   })
}

export const UpdateInfo = async (req: Request, res: Response) => {
   const user = req["user"];

   const repository = getManager().getRepository(c_person);

   await repository.update(user.id_person, req.body);

   const {password, ...data} = await repository.findOne(user.id_person);

   res.send(data);
}

export const UpdatePassword = async (req: Request, res: Response) => {
   const user = req["user"];

   if (req.body.password !== req.body.password_confirm){
      return res.status(400).send({
         message: "Password's do not match"
      });
   }
   const repository = getManager().getRepository(c_person);

   await repository.update(user.id_person,{
      password: await bcryptjs.hash(req.body.password, 10)
   });

   const {password, ...data} = user;

   res.send(data);
}