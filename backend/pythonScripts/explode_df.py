import os
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *
from google.cloud import storage

# get orig dataframe
df = pd.read_pickle("./df_from_json.pkl")
table_field_name = sys.argv[2]
id_field_list = [x.strip() for x in sys.argv[3].split(',')]
df_flatten, missed = df_explode(df, table_field_name, id_field_list)
# cache df_flatten to a pickle file
df_flatten.to_pickle("./df_exploded.pkl")
print(df_flatten.head(5).to_html())
sys.stdout.flush()