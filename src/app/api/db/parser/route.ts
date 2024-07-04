import { logger } from "@/lib/logger/logger";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
import { NextRequest, NextResponse } from "next/server";

const OsuDBParser = require("osu-db-parser");

interface RequestType {
  dbType: string;
  data: number[];
}

interface ResponseType {
  success: boolean;
  data: OsuCollectionDB | OsuDB | null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: RequestType = await req.json();
    console.log("data:", data);
    const osuDBBuffer = new Uint8Array(data.data).buffer;
    console.log("osuDBBuffer:", osuDBBuffer);

    if (data.dbType == "collection") {
      const parser = new OsuDBParser(null, osuDBBuffer);
      const osuCollectionData: OsuCollectionDB = parser.getCollectionData();
      logger.info("collection.dbの読み込みに成功");
      return NextResponse.json({
        success: true,
        data: osuCollectionData,
      });
    } else if (data.dbType == "osu") {
      const parser = new OsuDBParser(osuDBBuffer);
      const osuData: OsuDB = parser.getOsuDBData();
      logger.info("osu!.dbの読み込みに成功");
      return NextResponse.json({
        success: true,
        data: osuData,
      });
    } else throw new Error();
  } catch (e) {
    logger.error(`dbの読み込みに失敗 : ${e}`);
    return NextResponse.json({
      success: false,
      data: null,
    });
  }
}
