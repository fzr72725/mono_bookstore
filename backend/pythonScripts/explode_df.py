import os
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *

df = json_to_df(os.environ['RESOURCE_FILE_PATH'] + '/paveSchema.json')
table_field_name = sys.argv[1]
id_field_list = [x.strip() for x in sys.argv[2].split(',')]

df_flatten, missed = df_explode(df, table_field_name, id_field_list)

print(df_flatten.head(5).to_html())
sys.stdout.flush()