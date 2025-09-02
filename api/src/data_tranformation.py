import pandas as pd

def csv_to_json():
    file_path = (r"./data/data.csv")
    json_file_path = (r"./data/cve_data.json")

    df = pd.read_csv(file_path)
    json_data = df.to_json(orient='records', lines=False, indent=4)

    with open(json_output_path, 'w') as json_file:
        json_file.write(json_data)