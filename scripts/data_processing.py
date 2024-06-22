import json
import pandas as pd

def clean_and_transform_data(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)

    df = pd.DataFrame(data)
    df['text'] = df['bill_title'] + " " + df['bill_summary']
    df['text'] = df['text'].str.replace('\s+', ' ', regex=True)
    
    return df

if __name__ == "__main__":
    transformed_data = clean_and_transform_data('path_to_your_file.json')
    transformed_data.to_json('path_to_cleaned_data.json', orient='records')
