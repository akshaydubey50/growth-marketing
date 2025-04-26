export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";
import { JobModel } from "@/models/airtable.model";

export async function GET() {
  await connectDB();
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
  };

  try {
    let jobList: JobModel[] = [];
    let offset = null;
    do {
      const response: any = await axios.get(
        `${AirtableConf.BASE_URL}/${AirtableConf.BASE_ID}/${AirtableConf.JOB_TABLE_ID}`,
        {
          headers,
          params: {
            offset,
            filterByFormula: "({Status} = 'Done')",
          },
        }
      );

      if (response.status === 200) {
        console.log('response',response)
        const records: JobModel[] = (await response.data[
          "records"
        ]) as JobModel[];
        jobList.push(...records);
        offset = response.data.offset;
      }
    } while (offset);

    return NextResponse.json(
      {
        success: true,
        data: jobList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("jobs api failure ::: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
