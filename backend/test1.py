import sys
import pandas as pd
import json
from pandas import json_normalize

def json_to_df(file_name):
    with open(file_name) as f:
        list_raw = json.load(f)
    length = len(list_raw)
    df_raw = json_normalize(list_raw)
    return df_raw
print("python script is running now...")
d = {'col1': [1, 2], 'col2': [3, 4]}
df = json_to_df('resources/paveSchema.json')
#df = pd.DataFrame(data=d)

# dataToSendBack = "This is from Python"
# print(dataToSendBack)
print(df)
sys.stdout.flush()