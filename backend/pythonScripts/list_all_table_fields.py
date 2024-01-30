import sys
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *

df = json_to_df('resources/paveSchema.json')
table_field_names = find_all_table_fields(df)

# print(dataToSendBack)
print(table_field_names)
sys.stdout.flush()