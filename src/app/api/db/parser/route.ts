import { OsuCollectionDB, OsuDB } from "@/lib/types/external";

const OsuDBParser = require("osu-db-parser");

interface RequestType {
  dbType: string;
  buffer: number[];
}

interface ResponseType {
  success: boolean;
  data: OsuCollectionDB | OsuDB | null;
}

export async function POST(req: Request) {
  try {
    const data: RequestType = await req.json();
    const osuDBBuffer = new Uint8Array(data.buffer).buffer;

    if (data.dbType == "collection.db") {
      const parser = new OsuDBParser(null, osuDBBuffer);
      const osuCollectionData: OsuCollectionDB = parser.getCollectionData();
      return Response.json({
        success: true,
        data: osuCollectionData,
      });
    } else if (data.dbType == "osu") {
      const parser = new OsuDBParser(osuDBBuffer);
      const osuData: OsuDB = parser.getOsuData();
      return Response.json({
        success: true,
        data: osuData,
      });
    }
  } catch (e) {
    return Response.json({
      success: false,
      data: null,
    });
  }
}
