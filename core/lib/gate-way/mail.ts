require("dotenv").config();
import { IUser } from "@/core/db/types";
import mailgen from "mailgen";
import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';
import generateEmailTemplate from "./generateEmail";
import { exec } from "child_process";
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    // user: process.env.EMAIL_USER, // Environment variable for email user
    // pass: process.env.EMAIL_PASS, // Environment variable for email password
    user: 'loguardservice01@gmail.com',
    pass: 'rbputgsuyinzwxyq'
  },
});

const registerUser = async (name: string, userEmail: string, token: string) => {
  console.log({name,userEmail,token})
  try {
    const confirmEmailTemplate=await generateEmailTemplate({
      serviceLink: `${process.env.SITE_DOMAIN}`,
      confirmationLink: `${process.env.SITE_DOMAIN}account/verification/?t=${token}`,
    })





    if (confirmEmailTemplate) {
      exec(`google-chrome ${confirmEmailTemplate}`, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error opening file in Chrome: ${err.message}`);
          return;
        }
      });
    }



    const message = {
      from: process.env.EMAIL_USER, // Ensure this is set to the correct sender address
      to: userEmail,
      subject: "Account Verification",
       html: confirmEmailTemplate,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return ;
  }
};

export default registerUser;

const ResetPass = async (email_user: string, token: string) => {
  try {
    let mailG = new mailgen({
      theme: "default",
      product: {
        name: "Cybertec Inc",
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    });

    const email = {
      body: {
        name: email_user,
        intro: "we  are sorry for the stress",
        action: {
          instructions: "Please click below to reset your password",
          button: {
            color: "#1a73e8",
            text: "password reset link",
            link: `${process.env.SITE_DOMAIN}account/passwordreset?t=${token}`,
          },
        },
        outra: "you need any help?",
      },
    };
    let emailbody = mailG.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: email_user,
      subject: "Password Reset",
      html: emailbody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {
    console.log(error);
  }
};
/////////////////////////////////////////////
const Contactmail = async (emails: string, msg: string) => {
  try {
    let mailG = new mailgen({
      theme: "default",
      product: {
        name: "luxurytransport",
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    });

    const email = {
      body: {
        intro: ["someone went a msg", `Email:${emails}`],
        outro: [`${msg}`],
      },
    };
    let emailbody = mailG.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: `${emails}`,
      subject: "Contact message",
      html: emailbody,
    };
    await transporter.sendMail(message);
    return true;
  } catch (error) {
    if (error) {
    }
  }
};

/////////send email
const sendmail = async (user: IUser, msg: string) => {
  try {
    let mailG = new mailgen({
      theme: "default",
      product: {
        name: "luxurytransport",
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    });

    const email = {
      body: {
        intro: [
          `Email:${user.email}`,
          `firstname:${user.firstname}`,
          `lastname:${user.lastname}`,
        ],
        outro: [`${msg}`],
      },
    };
    let emailbody = mailG.generate(email);
    let message = {
      from: `${process.env.EMAIL}`,
      to: `${user.email}`,
      subject: "Contact message",
      html: emailbody,
    };
    await transporter.sendMail(message);
    return true;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

export const GateWAY = {
  registerUser,
  ResetPass,
  Contactmail
};
