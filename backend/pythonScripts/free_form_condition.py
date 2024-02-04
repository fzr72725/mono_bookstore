import os
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *

df = json_to_df(os.environ['RESOURCE_FILE_PATH'] + '/paveSchemaEquity.json')
df_query_str = sys.argv[1]
id_field_list = [x.strip() for x in sys.argv[2].split(',')]
df_result = eval(df_query_str)

print(df_result[id_field_list].to_html())
sys.stdout.flush()

# df[df['vestingEvents'].str[-1].str['totalVested'] != df['shares']]

# df[df['email']=='dhills@pave500-pave-internal.com']