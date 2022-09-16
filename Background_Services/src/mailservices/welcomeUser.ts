import ejs from "ejs";
import mssql, { RequestError } from "mssql";
import { sqlConfig } from "../config/config";
import sendMail from "../helpers/emailHelpers";
import dotenv from "dotenv";
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
  const pool = await mssql.connect(sqlConfig);
  const clients: client[] = await (
    await pool.request().execute("WelcomeEmail")
  ).recordset;

  console.log(clients);

  for (let client of clients) {
    ejs.renderFile('templates/welcomeUser.ejs',{name: client.fullName},
      async (error, data) => {
        let mailOptions = {
          from: process.env.EMAIL as string,
          to: client.email,
          subject: "Task Assigned",
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
          await pool.request().execute("WelcomeEmailSent");
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
