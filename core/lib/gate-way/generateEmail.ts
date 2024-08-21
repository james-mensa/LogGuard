import fs from "fs";
import path from "path";

export default async function generateEmailTemplate({
  serviceLink,
  confirmationLink,
}: {
  serviceLink: string;
  confirmationLink: string;
}) {
  try {
    // Define the path to the HTML template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "templates",
      "email-confirmation.html"
    );

    // Read the HTML template
    let template = fs.readFileSync(templatePath, "utf-8");
    return (template = template
      .replace(/{{SERVICE_LINK}}/g, serviceLink)
      .replace(/{{CONFIRMATION_LINK}}/g, confirmationLink));
  } catch (error) {
    console.log({ errorLoading: error });
  }
}
