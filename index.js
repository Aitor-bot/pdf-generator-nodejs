import puppeteer from "puppeteer";
import path from "path";

const filePath = path.join(process.cwd(), "pdf-template", `pdf-template.html`);

async function pdfGenerator() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file:${filePath}`, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen"); //	Changes the CSS media type of the page.
    await page.pdf({
      path: "Example.pdf",
      format: "a4",
      printBackground: true,
    });

    console.log("Pdf generated");
    await browser.close();
    process.exit();
  } catch (e) {
    console.log("Error", e);
  }
}

pdfGenerator();
