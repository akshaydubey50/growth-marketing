export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";
import { ProjectModel } from "@/models/airtable.model";

export async function GET() {
    await connectDB();
    const headers = {
        Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
    };

    try {
        let airtableProductList: ProjectModel[] = [];

        let offset = null;
        do {
            const response: any = await axios.get(
                `${AirtableConf.BASE_URL}/${AirtableConf.PROJECTS_BASE_ID}/${AirtableConf.PROJECTS_TABLE_ID}`,
                {
                    headers,
                    params: {
                        offset,
                    },
                }
            );

            if (response.status === 200) {
                const records: ProjectModel[] = (await response.data[
                    "records"
                ]) as ProjectModel[];
                airtableProductList.push(...records);
                offset = response.data.offset;
            }
        } while (offset);
        const statusRecord = airtableProductList?.filter(
            (item: ProjectModel) => item.fields?.Status?.toLowerCase() === "done"
        );

        return NextResponse.json(
            {
                success: true,
                data: statusRecord,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log("ProjectModel api failure ::: ", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500, }
        );
    }
}
