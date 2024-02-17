import os
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *
from google.cloud import storage
from preview_df import df_cache

is_exploded_df = sys.argv[3]
key = 'df'

if is_exploded_df == "true":
  key = 'df_exploded'

if key in df_cache:
    df = df_cache[key]
    df_query_str = sys.argv[2]
    df_result = eval(df_query_str)
    print(df_result.to_html())
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

    #d = {'col1': [1, 2], 'col2': [3, 4]}
    #df = pd.DataFrame(data=d)

    df = json_str_to_df(data)

    #df = json_to_df(os.environ['RESOURCE_FILE_PATH'] + '/paveSchemaEquity.json')
    df_query_str = sys.argv[2]
    #id_field_list = [x.strip() for x in sys.argv[2].split(',')]
    df_result = eval(df_query_str)

    #print(df_result[id_field_list].to_html())
    #TODO: pagination
    print(df_result.to_html())
    sys.stdout.flush()

# df[df['vestingEvents'].str[-1].str['totalVested'] != df['shares']]

# df[df['email']=='dhills@pave500-pave-internal.com']