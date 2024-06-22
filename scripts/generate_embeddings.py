import json
from sentence_transformers import SentenceTransformer
import pinecone

def generate_embeddings(data_file_path):
    with open(data_file_path, 'r') as f:
        data = json.load(f)

    texts = [item['text'] for item in data]
    
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(texts, show_progress_bar=True)
    
    pinecone.init(api_key='your-pinecone-api-key')
    index_name = 'bill-embeddings'
    if index_name not in pinecone.list_indexes():
        pinecone.create_index(index_name, dimension=embeddings.shape[1])
    index = pinecone.Index(index_name)

    to_upsert = [
        {
            'id': item['bill_number'],
            'values': embedding.tolist(),
            'metadata': {'congress_number': item['congress_number']}
        }
        for item, embedding in zip(data, embeddings)
    ]
    
    index.upsert(vectors=to_upsert)

if __name__ == "__main__":
    generate_embeddings('path_to_cleaned_data.json')





