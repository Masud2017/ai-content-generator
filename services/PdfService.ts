import puppeteer from 'puppeteer';
import PDFMerger from 'pdf-merger-js';

export class PdfService {
    private name:string = "";
    private courseId:string = "";
    private htmlPageList:Uint8Array[] = [];
    private baseUrl = "";
    
    constructor(name:string, courseId:string) {
        this.name = name;
        this.courseId = courseId;
        this.baseUrl = "http://localhost:3000/course/"
    }

    async getFullPageCoursePdfFileArray() {
        const browser = await puppeteer.launch({headless : false});
        var merger = new PDFMerger();

        const page = await browser.newPage();
        page.goto(this.baseUrl + this.courseId + "/start");
        // await page.goto("https://b9b8-80-112-164-97.ngrok-free.app/course/08d54947-b98f-43c0-955b-c93dcc1fc510/start")
        // page.goto("https://google.com")
        await page.setViewport({width: 1024, height: 780});
        await page.addStyleTag(
            {'content': '@page {size: A4 portrait;margin-left:-290px}'}
        )
        await page.waitForSelector(".cursor-pointer", {"timeout": 100_00})
        let pdf_data =await page.pdf();

        this.htmlPageList.push(pdf_data) //added new page to the array
        let elementList = await page.$$(".cursor-pointer")

        // await page.locator("div.cursor-pointer").click();
        console.log("Element list size : "+elementList.length)
        for (const element of elementList) {
            try {
                await element.click();
                await page.waitForSelector(".cursor-pointer", {"timeout": 100_00})
                pdf_data = await page.pdf();
                // await page.waitForSelector(".cursor-pointer", {"timeout": 100_00})

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
        // page.close();
        // browser.close(); 

        console.log("Buffer byte lengthj"+buffer.buffer.byteLength);
        return new Uint8Array(buffer);
        // return this.htmlPageList[2]
    }

    /**
     * Generates pdf file after compiling all the pages
     * @returns pdf file - Binary array
     */
    async getPdfFile() {
        return await this.getFullPageCoursePdfFileArray();
        // const browser = await puppeteer.launch({headless : true});
        // const page = await browser.newPage();
        // page.goto(this.baseUrl + this.courseId + "/start");
        // // await page.goto("https://b9b8-80-112-164-97.ngrok-free.app/course/08d54947-b98f-43c0-955b-c93dcc1fc510/start")
        // // page.goto("https://google.com")
        // await page.setViewport({width: 1024, height: 780});
        // await page.addStyleTag(
        //     {'content': '@page {size: A4 portrait;margin-left:-290px}'}
        // )
        // await page.waitForSelector(".cursor-pointer", {"timeout": 100_00})
        // let pdf_data =await page.pdf();
        // page.close();
        // browser.close(); 
        // return pdf_data;
        // return [];
    }
}