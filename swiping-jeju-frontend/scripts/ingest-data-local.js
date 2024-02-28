import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "@langchain/openai";
import { getSplittedDocs } from "../utils/getSplittedDocs.js";

const DATA_STORE_PATH = "data/keywords.txt";
const VECTOR_STORE_PATH = "store/keyword_vector_store";

export const run = async () => {
  try {
    const docs = await getSplittedDocs({
      filePath: DATA_STORE_PATH,
      chunkSize: 1000,
      chunkOverlap: 500,
    });
    console.log("🔨 벡터스토어 생성중입니다.\n");

    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new OpenAIEmbeddings()
    );
    await vectorStore.save(VECTOR_STORE_PATH);
  } catch (error) {
    console.log("❌ Error", error);
    throw new Error("Failed to ingest your data");
  }
};

(async () => {
  await run();
  console.log("✅ Ingestion complete\n");
})();
