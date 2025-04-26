// export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import connectDB from "@/db/dbConnect";
import { PropmtResourceModel } from "@/models/airtable.model";

export async function GET() {
  await connectDB();
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
  };

  try {
    let airtableProductList: PropmtResourceModel[] = [];

    let offset = null;
    do {
      const response: any = await axios.get(
        `${AirtableConf.BASE_URL}/${AirtableConf.PROMPT_BASE_ID}/${AirtableConf.PROMPT_TABLE_ID}`,
        {
          headers,
          params: {
            offset,
          },
        }
      );

      if (response.status === 200) {
        const records: PropmtResourceModel[] = (await response.data[
          "records"
        ]) as PropmtResourceModel[];
        airtableProductList.push(...records);
        offset = response.data.offset;
      }
    } while (offset);
    const statusRecord = airtableProductList?.filter(
      (item: PropmtResourceModel) => item.fields?.Status?.toLowerCase() === "done"
    );

    return NextResponse.json(
      {
        success: true,
        data: statusRecord,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("PropmtResourceModel api failure ::: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
