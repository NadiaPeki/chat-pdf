import { ChatOpenAI } from '@langchain/openai';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { ChatPromptTemplate } from '@langchain/core/prompts';

import { createRetrievalChain } from 'langchain/chains/retrieval';
const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-4o',
});
