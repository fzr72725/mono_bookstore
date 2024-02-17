import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *
import os
from google.cloud import storage

## This script downloads the specified json file and provide a tablr preview of one record

# Initialise a client off the current GCP project
storage_client = storage.Client()
bucket = storage_client.get_bucket('zeestache')

json_file_path = sys.argv[1]
# Create a blob object from the filepath
blob = bucket.blob(json_file_path)
# download the blob as json string
data = blob.download_as_string(client=None)

#d = {'col1': [1, 2], 'col2': [3, 4]}
#df = pd.DataFrame(data=d)

df = json_str_to_df(data)
global df_cache
df_cache = dict(df=df)

print(df.head(1).to_html())
sys.stdout.flush()
os.system('cls' if os.name == 'nt' else 'clear')
