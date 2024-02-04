import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *
import os

df = json_to_df(os.environ['RESOURCE_FILE_PATH'] + '/paveSchema.json')
table_field_names = find_all_table_fields(df)

# print(dataToSendBack)
print(table_field_names)
sys.stdout.flush()