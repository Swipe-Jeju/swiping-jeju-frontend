import { PromptTemplate } from "@langchain/core/prompts";

import { answerTemplate, standaloneQuestionTemplate } from "@/templates";
import { combineDocuments } from "@/utils/combineDocument";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

import { getLocalRetriever } from "@/utils/localRetriever";

export default async function handler(req, res) {
  // * 바디에서 인풋 가져옵니다.
  const { question } = req.body;

  // * 오픈AI API 키를 가져옵니다.
  const openAIApiKey = process.env.OPENAI_API_KEY;

  // * 오픈AI 인스턴스를 생성합니다.
  const llm = new ChatOpenAI({
    openAIApiKey,
    modelName: "gpt-4-turbo-preview",
    maxTokens: 200,
  });

  // * 로컬 리트리버를 가져옵니다.
  let retriever;

  // * 로컬 리트리버를 가져옵니다.
  retriever = await getLocalRetriever();

  // * 독립적 질문 생성
  const standaloneQuestionChain = createStandaloneQuestionChain(llm);

  // * 리트리버 체인 생성
  const retrieverChain = createRetrieverChain(retriever);

  // * 답변 체인 생성
  const answerChain = createAnswerChain(llm);

  // * 체인 시퀀스 실행
  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneQuestionChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.question,
    },
    answerChain,
  ]);

  console.log("🚀 Invoking the runnable sequence chain...");

  // * 체이닝 실행
  const response = await chain.invoke({
    question,
  });
  console.log("✅ Runnable sequence chain invoked successfully!");

  res.status(200).json({ response });
}

// * 독립적 질문 생성 함수
function createStandaloneQuestionChain(llm) {
  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    standaloneQuestionTemplate
  );
  return standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser());
}

// * 리트리버 체인 생성 함수
function createRetrieverChain(retriever) {
  return RunnableSequence.from([
    (prevResult) => prevResult.standalone_question,
    retriever,
    combineDocuments,
  ]);
}

// * 답변 체인 생성 함수
function createAnswerChain(llm) {
  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
  return answerPrompt.pipe(llm).pipe(new StringOutputParser());
}
