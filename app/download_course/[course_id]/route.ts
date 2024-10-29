import { PdfService } from "@/services/PdfService";
import fs from 'fs';
import { NextResponse } from "next/server";
const { Readable } = require('stream');


// {params} : {params : Promise<{course_id: string}>}
export async function GET(req:Request, {params} : {params : Promise<{course_id: string}>}) {
    let course_id = (await params).course_id;
    // let pdfServer = new PdfService("pdf","08d54947-b98f-43c0-955b-c93dcc1fc510");
    let pdfServer = new PdfService("pdf",course_id);
    let buffer =(await pdfServer.getPdfFile()).buffer;
    let resBody = new Response(buffer);

    resBody.headers.set("Content-Type", "application/pdf");

    return resBody;
}