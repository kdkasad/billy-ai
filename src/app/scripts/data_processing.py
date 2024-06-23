from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
import os
import json

pinecone_api_key = "***REMOVED***"
os.environ["PINECONE_API_KEY"] = pinecone_api_key
embeddings = OpenAIEmbeddings(model="text-embedding-3-large", api_key="***REMOVED***")
index_name = "billy"


with open('./docs/processed.json', 'r') as file:
    data = json.load(file)

count = 0
for element in data:
    try: 
        title, congress_num, bill_num, summary = element.get('title'), element.get('congress'), element.get('number'), element.get('summary')
        text_splitter = CharacterTextSplitter(chunk_size=2000, chunk_overlap=200)
        docs = text_splitter.split_text(summary)
        meta = [{"bill-title": title, "congress-number": congress_num, "bill-number": bill_num}]
        print(f"{count}/{len(data)} embedded")
        PineconeVectorStore.from_texts(docs, embeddings, namespace=f"senate", metadatas=meta, index_name=index_name)
    except:
        print(f"Skipped {count}")
    count += 1
print("done!")