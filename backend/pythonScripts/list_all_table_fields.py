import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *
import os
from google.cloud import storage

df = pd.read_pickle("./df_from_json.pkl")
table_field_names = find_all_table_fields(df)
print(table_field_names)
sys.stdout.flush()