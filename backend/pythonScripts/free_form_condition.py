import os
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
import json
from pandas import json_normalize
from methods import *
from google.cloud import storage

is_exploded_df = sys.argv[3]
if is_exploded_df == "true":
    df = pd.read_pickle("./df_exploded.pkl")
    df_query_str = sys.argv[2]
    #id_field_list = [x.strip() for x in sys.argv[2].split(',')]
    df_result = eval(df_query_str)

    #print(df_result[id_field_list].to_html())
    #TODO: pagination
    print(df_result.to_html())
    sys.stdout.flush()
else:
  # read from pickle if exists
  df = pd.read_pickle("./df_from_json.pkl")
  df_query_str = sys.argv[2]
  df_result = eval(df_query_str)
  print(df_result.to_html())
  sys.stdout.flush()
    


# df[df['vestingEvents'].str[-1].str['totalVested'] != df['shares']]

# df[df['email']=='dhills@pave500-pave-internal.com']
# df[df['grantId'] == '46529']