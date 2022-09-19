import ejs from "ejs";
import mssql, { RequestError } from "mssql";
import { sqlConfig } from "../config/config";
import sendMail from "../helpers/emailHelpers";
import dotenv from "dotenv";
import Connection from "../databaseHelpers/dbhelpers";
const db= new Connection

dotenv.config();

interface client {
  clientID: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: number;
  location: string;
  lat: number;
  lng: number;
  password: string;
}

const welcomeClient = async () => {
  const clients: client[] = (await (
    db.exec("WelcomeEmail")
  )).recordset;

  console.log(clients);

  for (let client of clients) {
    ejs.renderFile('templates/welcomeUser.ejs',{name: client.fullName},
      async (error, data) => {
        let mailOptions = {
          from: process.env.EMAIL as string,
          to: client.email,
          subject: "Welcome Onboard",
          html: data,
          attachment: [
            {
              filename: "task.txt",
              content: `Ask and we will deliver, sendIT your concerned delivery partner`,
            },
          ],
        };
        try {
          await sendMail(mailOptions);
          db.exec("WelcomeEmailSent");
          console.log("welcome email sent to client");
        } catch (error) {
          if (error instanceof RequestError) {
            console.log(error);
          }
        }
      }
    );
  }
};

export default welcomeClient;
