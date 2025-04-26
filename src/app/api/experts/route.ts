export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { ExpertModel } from "@/models/airtable.model";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";

export async function GET() {
  await connectDB();
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
  };

  try {
    let expertList: ExpertModel[] = [];
    let offset = null;
    do {
      const response: any = await axios.get(
        `${AirtableConf.BASE_URL}/${AirtableConf.EXPERT_BASE_ID}/${AirtableConf.EXPERT_TABLE_ID}`,
        {
          headers,
          params: {
            offset,
          },
        }
      );

      if (response.status === 200) {
        const records: ExpertModel[] = (await response.data[
          "records"
        ]) as ExpertModel[];
        expertList.push(...records);
        offset = response.data.offset;
      }
    } while (offset);
    
    const statusRecord = expertList?.filter(
      (item: ExpertModel) => item.fields?.Status?.toLowerCase() == "done"
    );

    return NextResponse.json(
      {
        success: true,
        data: statusRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("expert api failure ::: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
