// import puppeteer from 'puppeteer';
import PDFMerger from 'pdf-merger-js';
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
export class PdfService {
    private name:string = "";
    private courseId:string = "";
    private htmlPageList:Uint8Array[] = [];
    private baseUrl = "";
    private chromiumPack = "https://chromium-pack-b.s3.eu-north-1.amazonaws.com/chromium-v130.0.0-pack.tar";

    
    constructor(name:string, courseId:string) {
        this.name = name;
        this.courseId = courseId;
        this.baseUrl = process.env.BASE_URL+"/course/" 
    }
  
    /**
     * Generates pdf file after compiling all the pages
     * @returns pdf file - Binary array
     */
    async getPdfFile() {
        const browser = await puppeteer.launch({headless : false,
            args: chromium.args,
            // args:  ['--no-sandbox', "--disabled-setupid-sandbox"],
            // See https://www.npmjs.com/package/@sparticuz/chromium#running-locally--headlessheadful-mode for local executable path 
            executablePath: await chromium.executablePath("https://chromium-pack-b.s3.eu-north-1.amazonaws.com/chromium-v130.0.0-pack.tar"),

        });
        var merger = new PDFMerger();

        const page = await browser.newPage();
        page.goto(this.baseUrl + this.courseId + "/start");
        await page.setViewport({width: 1024, height: 780});
        await page.addStyleTag(
            {'content': '@page {size: A4 portrait;margin-left:-290px}'}
        )
        await page.waitForSelector(".cursor-pointer", {"timeout": 100_00})
        let pdf_data =await page.pdf();

        this.htmlPageList.push(pdf_data) //added new page to the array
        let elementList = await page.$$(".cursor-pointer")

        console.log("Element list size : "+elementList.length)
        for (const element of elementList) {
            try {
                await element.click();
                await page.waitForSelector(".cursor-pointer", {"timeout": 100_00})
                pdf_data = await page.pdf();

                this.htmlPageList.push(pdf_data)
            } catch(e) {
                
            }
            
        }

        for (let pdfItem of this.htmlPageList) {
            await merger.add(pdfItem);
        }

        let buffer = await merger.saveAsBuffer()
        

        this.htmlPageList.pop();
        console.log("Size of html page list : "+this.htmlPageList.length)
        page.close();
        browser.close(); 

        return new Uint8Array(buffer);
    }
}