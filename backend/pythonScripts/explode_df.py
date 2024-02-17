import os
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *
from google.cloud import storage
from preview_df import df_cache

## This script downloads the specified json file and provide a tablr preview of one record

if 'df' in df_cache:
    df = df_cache['df']
    table_field_name = sys.argv[2]
    id_field_list = [x.strip() for x in sys.argv[3].split(',')]
    df_flatten, missed = df_explode(df, table_field_name, id_field_list)
    df_cache['df_exploded'] = df_flatten
    print(df_flatten.head(5).to_html())
    sys.stdout.flush()
else:
    # Initialise a client off the current GCP project
    storage_client = storage.Client()
    bucket = storage_client.get_bucket('zeestache')

    json_file_path = sys.argv[1]
    # Create a blob object from the filepath
    blob = bucket.blob(json_file_path)
    # download the blob as json string
    data = blob.download_as_string(client=None)
    df = json_str_to_df(data)

    table_field_name = sys.argv[2]
    id_field_list = [x.strip() for x in sys.argv[3].split(',')]

    df_flatten, missed = df_explode(df, table_field_name, id_field_list)
    print(df_flatten.head(5).to_html())
    sys.stdout.flush()
